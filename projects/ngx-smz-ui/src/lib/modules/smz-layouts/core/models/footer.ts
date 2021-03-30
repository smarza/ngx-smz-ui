import { SimpleEntity } from 'ngx-smz-dialogs';
import { LeftPositionType, RightPositionType, SidePositionType } from './positions';

export interface SmzFooter {

    leftSideText?: string;
    rightSideText?: string;
    rightSideImages?: string[];
    showLogo?: boolean;
    showAppName?: boolean;
}