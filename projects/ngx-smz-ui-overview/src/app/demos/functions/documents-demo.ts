import { DemoKeys } from '@demos/demo-keys';
import { SmzDocumentBuilder } from 'ngx-smz-ui';

export const DocumentsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.DOCUMENTS_DEMO]: () => {
    return new SmzDocumentBuilder()
      .debugMode()
      .content()

        .row()
          .cell()
            .title('Month').cell.row
          .cell()
            .title('Savings').cell.row
          .cell()
            .title('Savings for holiday!').cell.row
        .content

        .row()
          .cell()
            .title('January')
            .cell
          .row
          .cell()
            .title('$100')
            .cell
          .row
          .cell()
            .setRowspan(2)
            .title('$50')
            .cell
          .row
        .content

        .row()
          .cell()
            .title('February')
            .cell
          .row
          .cell()
            .title('$80')
            .cell
          .row
        .content

        .document
      .build()
  },
}

