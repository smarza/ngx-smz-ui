import { AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Inject, Input, OnDestroy, Output, Renderer2 } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
    selector: "[transfervalue][formControlName], [transfervalue][formControl], [transfervalue][ngModel]",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TransferValueAccessor),
            multi: true
        }
    ],
    standalone: false
})
export class TransferValueAccessor
  implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() public ngModel;
  @Output() public ngModelChange = new EventEmitter();
  @Input() public variableId = "";
  @Input() public isDisabled = true;
  @Input() public quickActions: SmzQuickAction[] = [];

  private observer = new MutationObserver(() => {
    setTimeout(() => {
      this.onChange(
        TransferValueAccessor.mapValue(this.elementRef.nativeElement.innerHTML)
      );
    });
  });

  private onTouched = () => { };

  private onChange: (value: string) => void = () => { };

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef,
    @Inject(Renderer2) private readonly renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setDisabledState(this.isDisabled);
    }, 0);

    this.observer.observe(this.elementRef.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  @HostListener("input")
  onInput() {
    this.observer.disconnect();

    this.onChange(
      TransferValueAccessor.mapValue(this.elementRef.nativeElement.innerHTML)
    );
  }

  @HostListener("focus")
  onFocus() { }

  @HostListener("blur")
  onBlur() {
    this.onTouched();
  }

  @HostListener("keydown", ["$event"])
  onKeydown(e: KeyboardEvent) {
    // console.log("keydown", e.keyCode);

    if (hasVariableInsideSelection()) {

      // LIMPAR SELEÇÃO
      window.getSelection().empty();

      // IGNORAR TECLA
      e.preventDefault();
      return;
    }
  }

  @HostListener("keypress", ["$event"])
  onKeypress(e: KeyboardEvent) {
    // console.log("keypress", e.shiftKey, e.keyCode);

    // VERIFICA SE O CURSOR ESTÁ LOCALIZADO NA ÁREA DE VARIAVEIS
    if (isCursorInsideVariable()) {
      // SE USUÁRIO DIGITAR ATALHO PARA EDITAR VARIAVEL (SHIFT+SPACE)
      if (e.shiftKey && e.keyCode === 32) {
        console.log("show dialog");
      }

      // DESCARTAR TECLA
      e.preventDefault();
      return;
    }

    const quickActionIndex = this.quickActions.findIndex(
      x => x.keycode === e.keyCode
    );

    if (quickActionIndex > -1) {
      this.quickActions[quickActionIndex].callback();
    }
  }

  writeValue(value: string | null) {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      "innerHTML",
      TransferValueAccessor.mapValue(value)
    );
  }

  registerOnChange(onChange: (value: string) => void) {
    // console.log('registerOnChange', onChange);
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    // console.log('registerOnTouched', onTouched);
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    // console.log('setDisabledState', disabled);

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      "contenteditable",
      String(!disabled)
    );

    if (disabled) {
      this.renderer.addClass(this.elementRef.nativeElement, 'smz-input-content-mask-disabled');
    }
    else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'smz-input-content-mask-disabled');
    }
  }

  private static mapValue(value: string | null): string {
    // console.log('mapValue', value);
    const processed = value || "";
    return processed.trim() === "<br>" ? "" : processed;
  }
}


export interface SmzQuickAction {
  keycode: number;
  callback: () => void;
}

export function hasVariableInsideSelection(): boolean {
  // console.log('hasVariableInsideSelection');

  // PEGA A SELEÇÃO DO USUÁRIO
  const sel = window.getSelection();

  const variableNodes = Array.from(document.getElementsByClassName('smz-input-content-mask-variable'));

  for (const variable of variableNodes) {
    const isInside = sel.containsNode(variable, true);

    // SE A VARIÁVEL ESTIVER DENTRO DA SELEÇÃO, MESMO QUE PARCIALMENTE, RETORNA TRUE
    if (isInside) return true;
  }

  // NENHUMA VARIÁVEL ENCONTRADA NA SELEÇÃO
  return false;
}

export function isCursorInsideVariable(): boolean {
  // console.log('isCursorInsideVariable');
  // AINDA NÃO ESTÁ FUNCIONANDO.... TODO

  // PEGA A SELEÇÃO DO USUÁRIO
  const sel = window.getSelection();

  // SE NÃO EXISTIR SELEÇÃO OU NÓ NA SELEÇÃO RETURNA FALSO
  if (sel == null || sel.focusNode == null) return false;

  // NÓ PRINCIPAL NA SELEÇÃO
  const selectedNode = sel.focusNode.parentElement;

  // SE HOUVER NÓ E ELE CONTER ALGUMA VARIÁVEL RETORNA TRUE
  if (selectedNode != null) {
    const attribute = selectedNode.attributes.getNamedItem("id");
    if (attribute?.value === "input__variable") {
      // console.log("attribute", attribute.value);
      return true;
    }
  }

  // CURSOR NÃO SE ENCONTRA EM NENHUMA VARIÁVEL
  return false;
}