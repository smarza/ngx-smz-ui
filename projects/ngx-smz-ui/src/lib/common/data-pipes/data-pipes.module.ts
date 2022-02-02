import { ClonePipe } from './pipes/clone.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { UniqueFilterPipe } from './pipes/unique-filter.pipe';
import { DescribeSimpleNamedPipe } from './pipes/describe-simple-named.pipe';
import { DescribeArrayPipe } from './pipes/describe-array.pipe';
import { DescribeAnyPipe } from './pipes/describe-any.pipe';
import { CalendarPipe } from './pipes/calendar.pipe';
import { SmzGetDataPipe } from './pipes/get-data.pipe';
import { JoinPipe } from './pipes/join.pipe';

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
        DescribeAnyPipe,
        CalendarPipe,
        SmzGetDataPipe,
        JoinPipe
    ],
    exports: [
        ClonePipe,
        SafeHtmlPipe,
        SafeUrlPipe,
        UniqueFilterPipe,
        DescribeSimpleNamedPipe,
        DescribeArrayPipe,
        DescribeAnyPipe,
        CalendarPipe,
        SmzGetDataPipe,
        JoinPipe
    ],
})
export class NgxSmzDataPipesModule { }
