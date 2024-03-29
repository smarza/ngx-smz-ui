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
import { StateBuilderPipe } from './pipes/state-builder.pipe';
import { ServerPathPipe } from './pipes/server-path.pipe';
import { SimpleCalendarPipe } from './pipes/simple-calendar.pipe';
import { AsPipe } from './pipes/as.pipe';
import { PrettyJsonPipe } from './pipes/pretty-json.pipe';
import { SmzInitialPipe } from './pipes/initial.pipe';
import { SmzTailPipe } from './pipes/tail.pipe';
import { SelectorPipe } from './pipes/selector.pipe';
import { FirstOrDefaultPipe } from './pipes/first-or-default.pipe';

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
        JoinPipe,
        StateBuilderPipe,
        ServerPathPipe,
        SimpleCalendarPipe,
        AsPipe,
        PrettyJsonPipe,
        SmzInitialPipe,
        SmzTailPipe,
        SelectorPipe,
        FirstOrDefaultPipe
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
        JoinPipe,
        StateBuilderPipe,
        ServerPathPipe,
        SimpleCalendarPipe,
        AsPipe,
        PrettyJsonPipe,
        SmzInitialPipe,
        SmzTailPipe,
        SelectorPipe,
        FirstOrDefaultPipe
    ],
})
export class NgxSmzDataPipesModule { }
