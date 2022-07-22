// import { SmzExcelTableSheet } from '../../modules/smz-excels/models/smz-excel-table';
// import { SmzExcelsStylesBuilder } from './excels-styles';
// import { SmzExcelsTablesBuilder } from './excels-tables';

// export class SmzExcelsTableHeadersBuilder {


//   constructor(private _builder: SmzExcelsTablesBuilder, private _state: SmzExcelTableSheet) {

//   }

//   public addHeader(name: string, sort?: boolean): SmzExcelsTableHeadersBuilder {
//     this._state.header.data.push(name);

//     if (sort) {
//       this._state.shouldSort = true;
//       this._state.shouldSort = true;
//       this._state.matchCase = false;
//       this._state.sortColumn = this._state.header.data.length;
//     }

//     return this;
//   }

//   public styles(): SmzExcelsStylesBuilder<SmzExcelsTableHeadersBuilder> {
//     return new SmzExcelsStylesBuilder<SmzExcelsTableHeadersBuilder>(this, this._state.header.style);
//   }

//   public get tables(): SmzExcelsTablesBuilder {
//     return this._builder;
//   }
// }
