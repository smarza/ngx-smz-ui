import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SmzDialogsService } from '@ngx-smz/core';
import { DIALOG_USE_CASE_SECTIONS, DialogUseCaseSection } from './dialog-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [DemoCodeBlockComponent],
  templateUrl: './dialog-demo.component.html',
  styleUrl: './dialog-demo.component.scss',
})
export class DialogDemoComponent implements OnInit {
  readonly sections = DIALOG_USE_CASE_SECTIONS;

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogsService = inject(SmzDialogsService);

  ngOnInit(): void {
    const tableOfContentsItems = this.sections.flatMap((section) =>
      section.useCases.map((useCase) => ({
        id: useCase.id,
        label: useCase.title,
      }))
    );
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }

  openDialog(openFunction: (service: SmzDialogsService) => void): void {
    openFunction(this.dialogsService);
  }
}
