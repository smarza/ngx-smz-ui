import { Component, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { SmzFileControl } from '../../models/control-types';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { Message } from 'primeng/api';
import { Store } from '@ngxs/store';
import { ToastActions } from '../../../../state/global/application/application.actions.toast';
import { base64ToFile } from '../../../../common/utils/utils';
import { isEmpty } from '../../../../builders/common/utils';
import { ApplicationActions } from '../../../../../lib/state/global/application/application.actions';

@Component({
    selector: 'smz-file-upload',
    templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
    @Input() public input: SmzFileControl;
    @Input() public form: UntypedFormGroup;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    @Output() public selectChange: EventEmitter<File[]> = new EventEmitter<File[]>();
    public errors: Message[] = [];
    public files: File[] = [];
    public isZoomActive = false;

    constructor(public cdf: ChangeDetectorRef, private store: Store) { }

    public ngOnInit(): void {
        this.input._clearMethod = () => { this.clear(false); };
        this.input._cdf = this.cdf;
        this.input._setFile = (event: File[], cdf: ChangeDetectorRef) => { this.onFilesDropped(event, false,true, cdf); };

        if (!isEmpty(this.input.defaultValue)) {
            base64ToFile(this.input.defaultValue, this.input.defaultValueFilename, this.input.defaultValueMimetype).then((file) => {
                this.input._setFile([file], this.cdf);
            })
        }

    }

    public log(): void {
        console.log(this.form);
    }

    public applyZoom(): void {
        this.isZoomActive = true;
    }

    public restoreZoom(): void {
        this.isZoomActive = false;
    }

    public notAllowed(): void {
        this.store.dispatch(new ToastActions.Warning('Upload desabilitado'));
    }

    public onInputFiles(event: any): void {
        const files: File[] = event.srcElement.files;
        this.onFilesDropped(files, true, true, this.cdf);
    }

    public onFilesDropped(event: File[], markAsTouched: boolean, emitEvent: boolean, cdf: ChangeDetectorRef): void {
        this.files = [];
        const errors: Message[] = [];

        for (const file of event) {
            if (this.validate(file, errors)) {
                this.files.push(file);
            }
        };

        this.errors = errors;

        if (errors.length === 0) {
            this.onFileChange(this.files, emitEvent, cdf);
        }

        if (markAsTouched) {
            this.input._inputFormControl.markAsTouched();
        }

        this.cdf.markForCheck();

    }

    public clear(emitEvent: boolean): void {

        if (this.input.useGlobalLoader) {
            this.store.dispatch(new ApplicationActions.StartGlobalLoading);
        }

        this.files = [];
        this.errors = [];
        this.input._file = null;
        this.input._fileName = null;
        this.input.base64 = null;
        this.selectChange.emit([]);
        this.form.controls[this.input.propertyName].setValue(null, { emitEvent });

        this.cdf.markForCheck();

        if (this.input.useGlobalLoader) {
            this.store.dispatch(new ApplicationActions.StopGlobalLoading);
        }
    }

    public onFileChange(event: File[], emitEvent: boolean, cdf: ChangeDetectorRef): void {

        if (event.length > 0) {
            const file = event[0];

            switch (this.input.outputFormat) {
                case 'base64':
                    this.handleFileToBase64(file, emitEvent, cdf);
                    break;

                case 'file':
                    this.handleFile(file);
                    this.form.controls[this.input.propertyName].setValue(file, { emitEvent });
                    cdf.markForCheck();
                    break;
            }
        }
        else {
            this.input['hasFile'] = null;
            this.input._file = null;
            this.input._fileName = null;
            this.input.base64 = null;
            this.input._fileType = null;
            this.input._fileExtension = null;
            this.form.controls[this.input.propertyName].setValue(null, { emitEvent });
        }
    }

    private handleFile(file: File) {
        this.input._file = file;
        this.input._fileName = file.name;
        this.input['hasFile'] = file.name;
        this.input._fileType = this.getTypeClass(file.type);
        this.input._fileExtension = this.getFileExtension(file);
    }

    private handleFileToBase64(file: File, emitEvent: boolean, cdf: ChangeDetectorRef) {
        const reader = new FileReader();

            this.input.base64 = null;

            cdf.markForCheck();

            if (this.input.useGlobalLoader) {
                this.store.dispatch(new ApplicationActions.StartGlobalLoading);
            }

            reader.onload = (event: ProgressEvent<FileReader>): void => {
                this.input.base64 = event.target.result as string;

                this.handleFile(file);

                this.form.controls[this.input.propertyName].setValue(file, { emitEvent });
                cdf.markForCheck();

                if (this.input.useGlobalLoader) {
                    this.store.dispatch(new ApplicationActions.StopGlobalLoading);
                }

            };

            reader.readAsDataURL(file);
    }

    public formatBytes(bytes, decimals = 2): string {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    public validate(file: File, errors: Message[]): boolean {
        if (this.input.fileAccept && !this.isFileTypeValid(file)) {
            errors.push({
                severity: 'error',
                summary: '',
                detail: this.input.invalidFileTypeMessageDetail.replace('{0}', this.input.fileAccept)
            });

            return false;
        }

        if (this.input.maxFileSize && file.size > this.input.maxFileSize) {
            errors.push({
                severity: 'error',
                summary: '',
                detail: this.input.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.input.maxFileSize))
            });

            return false;
        }

        return true;
    }

    private isFileTypeValid(file: File): boolean {
        let acceptableTypes = this.input.fileAccept.split(',').map(type => type.trim());
        for (let type of acceptableTypes) {
            let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
                : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();

            if (acceptable) {
                return true;
            }
        }

        return false;
    }

    formatSize(bytes) {
        if (bytes == 0) {
            return '0 B';
        }
        let k = 1024,
            dm = 3,
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    isWildcard(fileType: string): boolean {
        return fileType.indexOf('*') !== -1;
    }

    getTypeClass(fileType: string): string {
        return fileType.substring(0, fileType.indexOf('/'));
    }

    getFileExtension(file: File): string {
        return '.' + file.name.split('.').pop();
    }

}
