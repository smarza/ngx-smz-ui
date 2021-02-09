import { SidebarViewdata } from '../../features/assistance/sidebar-data';

export interface LogoResource
{
    horizontal: ThemeTone;
    vertical: ThemeTone;
    typo: ThemeTone;
    icon: ThemeTone;
}

export interface ThemeTone
{
    dark: string;
    light: string;

}