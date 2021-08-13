export interface InjectableContentEntity
{
    input: string;
    data: any;
}


export interface InjectableOutput
{
    output: string;
    callback?: (data: any) => void;
}
