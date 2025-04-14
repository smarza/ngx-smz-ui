import { SimpleEntity } from '../../../../common/models/simple-named-entity';
import { LeftPositionType, RightPositionType, SidePositionType } from './positions';

export interface Assistance {
    isEnabled: boolean;
    isVisible?: boolean;
    sidebarData?: SidebarViewdata;
    buttonPosition?: LeftPositionType | RightPositionType;
}

export const SmzAssistancePositions: SimpleEntity<SidePositionType>[] = [
    { id: 'left', name: 'Left' },
    { id: 'right', name: 'Right' },
];

export const SmzAssistanceButtonPositions: SimpleEntity<LeftPositionType | RightPositionType>[] = [
    { id: 'left-bottom', name: 'Left Bottom' },
    { id: 'left-center', name: 'Left Center' },
    { id: 'left-top', name: 'Left Top' },
    { id: 'right-bottom', name: 'Right Bottom' },
    { id: 'right-center', name: 'Right Center' },
    { id: 'right-top', name: 'Right Top' },
];

export interface SidebarViewdata {
    position: SidePositionType;
}