import { ClonePipe } from './pipes/clone.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { UniqueFilterPipe } from './pipes/unique-filter.pipe';
import { DescribeSimpleNamedPipe } from './pipes/describe-simple-named.pipe';
import { DescribeArrayPipe } from './pipes/describe-array.pipe';
import { DescribeAnyPipe } from './pipes/describe-any.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ClonePipe,
        SafeHtmlPipe,
        SafeUrlPipe,
        UniqueFilterPipe,
        DescribeSimpleNamedPipe,
        DescribeArrayPipe,
        DescribeAnyPipe
    ],
    exports: [
        ClonePipe,
        SafeHtmlPipe,
        SafeUrlPipe,
        UniqueFilterPipe,
        DescribeSimpleNamedPipe,
        DescribeArrayPipe,
        DescribeAnyPipe
    ],
})
export class NgxSmzDataPipesModule { }
