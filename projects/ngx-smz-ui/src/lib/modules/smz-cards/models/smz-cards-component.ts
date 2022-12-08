export interface SmzInjectable
{
    component: any;
    inputs: SmzInjectableInput[];
    outputs?: SmzInjectableOutput[];
}

export interface SmzInjectableInput
{
    input: string;
    dataPath: string;
}

export interface SmzInjectableOutput
{
    output: string;
    callback?: (data: any) => void;
}