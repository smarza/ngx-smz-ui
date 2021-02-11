import { ApolloLayout } from '../../layouts/apollo/layout.config';
import { DiamondLayout } from '../../layouts/diamond/layout.config';
import { SmzLoader } from './loaders';

export type SmzLayout = DiamondLayout | ApolloLayout;

export interface LayoutState {
    wrapperClass: string;
    isOverlayVisible: boolean;
    topbarTitle: string;
    appName: string;
    footerText: string;
    contentTone: ThemeToneType;
    layoutTone: ThemeToneType;
}

export interface LoaderData {
    type: SmzLoader;
    title: string;
    message: string;
}

export type ThemeToneType = 'light' | 'dark';
