import { AthenaLayout } from '../../layouts/athena/layout.config';
import { HephaestusLayout } from '../../layouts/hephaestus/layout.config';
import { SmzLoader } from './loaders';

export type SmzLayout = HephaestusLayout | AthenaLayout;

export interface LayoutState {
    wrapperClass: string;
    contentClass: string;
    isOverlayVisible: boolean;
    topbarTitle: string;
    appName: string;
    footerText: string;
    contentTone: ThemeToneType;
    layoutTone: ThemeToneType;
    schemaTone: ThemeToneType;
    isDimmed: boolean;
}

export interface LoaderData {
    type: SmzLoader;
    title: string;
    message: string;
    globalLoaderPendingTimeout?: number;
}

export type ThemeToneType = 'light' | 'dark';
