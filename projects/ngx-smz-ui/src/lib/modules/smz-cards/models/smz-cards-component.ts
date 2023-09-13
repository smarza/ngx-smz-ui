export interface SmzAdvancedInjectable
{
    component: any;
    inputs: SmzAdvancedInjectableInput[];
    outputs?: SmzAdvancedInjectableOutput[];
}

export interface SmzAdvancedInjectableInput
{
    input: string;
    dataPath: string;
    value: any;
    injectData: boolean;
    injectState: boolean;
}

export interface SmzAdvancedInjectableOutput
{
    output: string;
    callback?: (data: any) => void;
}