import { SmzDocumentState } from '../models/smz-document';

export const SmzJsPdfUtils = {
  addPageNumbers: (pdf: any, state: SmzDocumentState) => {

    var totalPages = pdf.internal.getNumberOfPages();

    for (var i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);

      const x = pdf.internal.pageSize.width - state.export.margin.right;
      const y = pdf.internal.pageSize.height - state.export.margin.bottom;
      const text = `${state.locale.pageNumbers.page} ${i} ${state.locale.pageNumbers.of} ${totalPages}`;
      const options = { align: 'right' };

      pdf.text(x, y, text, options);
    };

  }
};