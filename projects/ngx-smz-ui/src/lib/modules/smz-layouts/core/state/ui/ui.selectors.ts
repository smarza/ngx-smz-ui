import { Selector } from '@ngxs/store';
import { UiState, UiStateModel } from './ui.state';
import { LoaderData, ThemeToneType } from '../../models/layout';
import { Assistance } from '../../models/assistance';
import { SmzAppLogo } from '../../models/logo';
import { SmzToastData } from '../../models/toasts';
import { BreadcrumbsData } from '../../models/breadcrumbs';
export class UiSelectors
{

    @Selector([UiState])
    public static topbarTitle(state: UiStateModel): string
    {
        return state.state.topbarTitle;
    }

    @Selector([UiState])
    public static appName(state: UiStateModel): string
    {
        return state.state.appName;
    }

    @Selector([UiState])
    public static loader(state: UiStateModel): LoaderData
    {
        return state.loader;
    }

    @Selector([UiState])
    public static contentTheme(state: UiStateModel): string
    {
        return `assets/scss/contents/${state.themes.content}`;
    }

    @Selector([UiState])
    public static contentClass(state: UiStateModel): string
    {
        return state.state.contentClass;
    }

    @Selector([UiState])
    public static assistance(state: UiStateModel): Assistance
    {
        return state.assistance;
    }

    @Selector([UiState])
    public static appContentLogo(state: UiStateModel): SmzAppLogo
    {
        return {
            horizontal: state.appLogo.horizontal[state.state.contentTone],
            vertical: state.appLogo.vertical[state.state.contentTone],
            icon: state.appLogo.icon[state.state.contentTone],
            typo: state.appLogo.typo[state.state.contentTone]
        };
    }

    @Selector([UiState])
    public static appLayoutLogo(state: UiStateModel): SmzAppLogo
    {
        return {
            horizontal: state.appLogo.horizontal[state.state.schemaTone],
            vertical: state.appLogo.vertical[state.state.schemaTone],
            icon: state.appLogo.icon[state.state.schemaTone],
            typo: state.appLogo.typo[state.state.schemaTone]
        };
    }

    @Selector([UiState])
    public static appThemeTone(state: UiStateModel): ThemeToneType
    {
        return state.state.contentTone;
    }

    @Selector([UiState])
    public static toast(state: UiStateModel): SmzToastData
    {
        return state.toast;
    }

    @Selector([UiState])
    public static isMouseInApp(state: UiStateModel): boolean
    {
        return state.lastUserMouseEvent === 'mouseenter';
    }

    @Selector([UiState])
    public static breadcrumbs(state: UiStateModel): BreadcrumbsData
    {
        return state.breadcrumbs;
    }
}