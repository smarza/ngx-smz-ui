import { BehaviorSubject } from 'rxjs';
import { InjectableContentEntity, InjectableOutput } from './inject-content';
import { ComponentRef, WritableSignal } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
export interface ComponentData
{
    component: ComponentDataBase | null;
    inputs: InjectableContentEntity[];
    outputs?: InjectableOutput[];
    ref?: { componentRef: ComponentRef<unknown> | null };
    visibilityDependsOn?: { propertyName: string, formId: string, reversed: boolean, condition?: unknown, conditions?: unknown[] };
    componentId?: string;
}

export interface ComponentDataBase {
    isValid: WritableSignal<boolean>;
    onValidationError$?: BehaviorSubject<boolean>;
    getData: () => unknown;
}

export interface InjectableComponent<TComponent>
{
    component: ComponentType<TComponent> | null;
    inputs: InjectableContentEntity[];
    outputs: InjectableOutput[];
    ref?: { componentRef: ComponentRef<unknown> | null };
    styleClass?: string;
    componentId?: string;
}