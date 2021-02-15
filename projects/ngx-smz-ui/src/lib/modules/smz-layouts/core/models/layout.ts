import { AthenaLayout } from '../../layouts/athena/layout.config';
import { HephaestusLayout } from '../../layouts/hephaestus/layout.config';
import { SmzLoader } from './loaders';

export type SmzLayout = HephaestusLayout | AthenaLayout;

export interface LayoutState {
    wrapperClass: string;
    isOverlayVisible: boolean;
    topbarTitle: string;
    appName: string;
    footerText: string;
    contentTone: ThemeToneType;
    layoutTone: ThemeToneType;
    schemaTone: ThemeToneType;
}

export interface LoaderData {
    type: SmzLoader;
    title: string;
    message: string;
}

export type ThemeToneType = 'light' | 'dark';
