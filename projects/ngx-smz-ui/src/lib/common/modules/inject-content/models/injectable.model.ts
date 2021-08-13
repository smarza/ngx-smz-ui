import { BehaviorSubject } from 'rxjs';
import { InjectableContentEntity, InjectableOutput } from './inject-content.model';

export interface ComponentData
{
    component: ComponentDataBase | any;
    inputs: InjectableContentEntity[];
    outputs?: InjectableOutput[];
    ref?: { componentRef: any };
    visibilityDependsOn?: { propertyName: string, formId: string, reversed: boolean, condition?: any, conditions?: any[] };
    componentId?: string;
}

export interface ComponentDataBase {
    isValid: boolean;

    onValidationError$?: BehaviorSubject<boolean>;
}