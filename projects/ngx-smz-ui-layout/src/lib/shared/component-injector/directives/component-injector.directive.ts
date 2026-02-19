import { Directive, ViewContainerRef, Input, AfterContentInit, OnDestroy, Type, Output, EventEmitter, ComponentRef } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { InjectableComponent } from '../interfaces/injectable';
import { DynamicComponent, InjectComponentService } from '../services/inject-component.service';
import { ComponentDataBase } from '../interfaces/injectable';
import { InjectableContentEntity, InjectableOutput } from '../interfaces/inject-content';
import { Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';

@Directive({
  selector: 'ng-template[componentInjector]',
  standalone: true,
})
export class ComponentInjectorDirective implements AfterContentInit, OnDestroy {
    @Input() public componentInjector!: InjectableComponent<unknown>;
    @Input() public context!: unknown;
    @Output() public componentCreated = new EventEmitter<ComponentRef<ComponentType<unknown>>>();
    public isActive = true;

    constructor(public viewContainerRef: ViewContainerRef, private service: InjectComponentService) {

    }

    public ngAfterContentInit(): void {

      if (this.componentInjector != null && this.componentInjector.component != null) {
        setTimeout(() => {
          this.addComp();
        }, 0);
      }
    }

    public addComp(): void {

      const componentRef = this.viewContainerRef.createComponent(this.componentInjector.component as unknown as Type<ComponentDataBase>, {});

      if (this.componentInjector.styleClass != null) {
        componentRef.location.nativeElement.classList.add(...this.componentInjector.styleClass.split(' '));
      }

      this.componentInjector.inputs.forEach((i: InjectableContentEntity) => {
        Reflect.set(componentRef.instance, i.key, i.data);
      });

      if (this.componentInjector.outputs != null) {

        this.componentInjector.outputs.forEach((output: InjectableOutput) => {
          const instance = componentRef.instance as ComponentDataBase;
          const instanceOutput = Reflect.get(instance, output.key) as Observable<never>;

          if (instanceOutput != null) {
            instanceOutput
              .pipe(takeWhile(x => this.isActive))
              .subscribe((event: never) => {
                if (output.callback != null) output.callback(event);
              });
          }
        });
      }

      this.componentInjector.ref = { componentRef: componentRef };
      this.service.setComponent(this.componentInjector.componentId ?? '', componentRef as unknown as ComponentRef<DynamicComponent>);

      componentRef.hostView.detectChanges();

      this.componentCreated.emit(componentRef as unknown as ComponentRef<ComponentType<unknown>>);
    }

    public removeComp(): void {
      this.isActive = false;
      this.viewContainerRef.remove();
    }

    public ngOnDestroy(): void {
      this.removeComp();
    }

}
