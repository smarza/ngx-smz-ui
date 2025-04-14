import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeManagerService {
  public _document?: Document;
  public contentLink: { isLoaded: boolean, path: string, link: HTMLLinkElement }[] = [];
  constructor(@Inject(DOCUMENT) private readonly document: any) {
    this._document = document as Document;
  }

  public createCss(...paths: string[]): void {

    paths.forEach(path => {
      const link = this._document.createElement("link");

      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", path);

      this.contentLink.push({
        isLoaded: false,
        path,
        link,
      });
    })

  }

  public propagate(): void {
    this.contentLink
      .filter((x) => !x.isLoaded)
      .forEach((x) => {
        this._document.head.appendChild(x.link);
        x.isLoaded = true;
      });
  }
}
