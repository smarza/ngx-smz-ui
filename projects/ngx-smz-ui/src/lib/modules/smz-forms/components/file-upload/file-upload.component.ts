import { Component, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { SmzFileControl } from '../../models/control-types';
import { AbstractControl, FormGroup } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { Message } from 'primeng/api';
import { Store } from '@ngxs/store';
import { ToastActions } from '../../../../state/global/application/application.actions.toast';

@Component({
    selector: 'smz-file-upload',
    templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
    @Input() public input: SmzFileControl;
    @Input() public form: FormGroup;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    @Output() public selectChange: EventEmitter<File[]> = new EventEmitter<File[]>();
    public errors: Message[] = [];
    public files: File[] = [];
    public isZoomActive = false;

    constructor(private cdf: ChangeDetectorRef, private store: Store) { }

    public ngOnInit(): void {
        this.input._clearMethod = () => { this.clear(); };

        // this.input._inputFormControl.markAsTouched();
    }

    public log(event: any): void {
        console.log(event);
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
        this.onFilesDropped(files);
    }

    public onFilesDropped(event: File[]): void {

        this.files = [];
        const errors: Message[] = [];

        for (const file of event) {
            if (this.validate(file, errors)) {
                this.files.push(file);
            }
        };

        this.errors = errors;

        if (errors.length === 0) {
            this.onFileChange(this.files);

            this.cdf.markForCheck();
        }

        this.input._inputFormControl.markAsTouched();

    }

    public clear(): void {
        this.files = [];
        this.errors = [];
        this.input._file = null;
        this.input._fileName = null;
        this.input._base64 = null;
        this.selectChange.emit([]);
        this.form.controls[this.input.propertyName].setValue(null);

        this.cdf.markForCheck();
    }

    public onFileChange(event: File[]): void {

        if (event.length > 0) {
            const file = event[0];

            const reader = new FileReader();

            this.input._base64 = null;

            reader.onload = (event: ProgressEvent<FileReader>): void => {
                this.input._base64 = event.target.result as string
            };

            this.input._fileExtension = this.getFileExtension(file);

            reader.readAsDataURL(file);

            this.input._file = file;
            this.input._fileName = file.name;
            this.input['hasFile'] = file.name;

            this.input._fileType = this.getTypeClass(file.type);
            this.input._fileExtension = this.getFileExtension(file);

            this.form.controls[this.input.propertyName].setValue(file);
        }
        else {
            this.input['hasFile'] = null;
            this.input._file = null;
            this.input._fileName = null;
            this.input._base64 = null;
            this.input._fileType = null;
            this.input._fileExtension = null;
            this.form.controls[this.input.propertyName].setValue(null);
        }
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
