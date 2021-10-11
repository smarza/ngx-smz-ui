import { Selector } from '@ngxs/store';
import { LayoutUiState, UiStateModel } from './layout.state';
import { LoaderData, ThemeToneType } from '../../../modules/smz-layouts/core/models/layout';
import { Assistance } from '../../../modules/smz-layouts/core/models/assistance';
import { SmzAppLogo } from '../../../modules/smz-layouts/core/models/logo';
import { SmzToastData } from '../../../modules/smz-layouts/core/models/toasts';
import { BreadcrumbsData } from '../../../modules/smz-layouts/core/models/breadcrumbs';
export class LayoutUiSelectors
{

    @Selector([LayoutUiState])
    public static topbarTitle(state: UiStateModel): string
    {
        return state.state.topbarTitle;
    }

    @Selector([LayoutUiState])
    public static appName(state: UiStateModel): string
    {
        return state.state.appName;
    }

    @Selector([LayoutUiState])
    public static loader(state: UiStateModel): LoaderData
    {
        return state.loader;
    }

    @Selector([LayoutUiState])
    public static contentTheme(state: UiStateModel): string
    {
        return `assets/scss/contents/${state.themes.content}`;
    }

    @Selector([LayoutUiState])
    public static contentClass(state: UiStateModel): string
    {
        return state.state.contentClass;
    }

    @Selector([LayoutUiState])
    public static assistance(state: UiStateModel): Assistance
    {
        return state.assistance;
    }

    @Selector([LayoutUiState])
    public static appContentLogo(state: UiStateModel): SmzAppLogo
    {
        return {
            horizontal: state.appLogo.horizontal[state.state.contentTone],
            vertical: state.appLogo.vertical[state.state.contentTone],
            icon: state.appLogo.icon[state.state.contentTone],
            typo: state.appLogo.typo[state.state.contentTone]
        };
    }

    @Selector([LayoutUiState])
    public static appLayoutLogo(state: UiStateModel): SmzAppLogo
    {
        return {
            horizontal: state.appLogo.horizontal[state.state.schemaTone],
            vertical: state.appLogo.vertical[state.state.schemaTone],
            icon: state.appLogo.icon[state.state.schemaTone],
            typo: state.appLogo.typo[state.state.schemaTone]
        };
    }

    @Selector([LayoutUiState])
    public static appThemeTone(state: UiStateModel): ThemeToneType
    {
        return state.state.contentTone;
    }

    @Selector([LayoutUiState])
    public static toast(state: UiStateModel): SmzToastData
    {
        return state.toast;
    }

    @Selector([LayoutUiState])
    public static isMouseInApp(state: UiStateModel): boolean
    {
        return state.lastUserMouseEvent === 'mouseenter';
    }

    @Selector([LayoutUiState])
    public static breadcrumbs(state: UiStateModel): BreadcrumbsData
    {
        return state.breadcrumbs;
    }
}