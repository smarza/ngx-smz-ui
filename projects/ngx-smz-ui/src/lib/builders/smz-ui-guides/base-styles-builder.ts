export class SmzUiGuideBaseStylesBuilder<TSelf, TBuilder> {
  protected that: TSelf;
  constructor(private _builder: TBuilder, private _styles: { styleClass: string }) {
  }

  public override(styleClass: string): TSelf {
    this._styles.styleClass = styleClass;
    return this.that;
  }

  public darker(): TSelf {
    this._styles.styleClass += ' bg-black/60';
    return this.that;
  }

  public blurry(): TSelf {
    this._styles.styleClass += ' backdrop-blur-sm';
    return this.that;
  }

  public lighter(): TSelf {
    this._styles.styleClass += ' backdrop-brightness-110';
    return this.that;
  }

  public grayscale(): TSelf {
    this._styles.styleClass += ' bg-white mix-blend-saturation';
    return this.that;
  }

}
