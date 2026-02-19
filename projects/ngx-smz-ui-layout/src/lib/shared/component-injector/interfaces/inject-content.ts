export interface InjectableContentEntity
{
    key: string;
    data: unknown;
}

export interface InjectableOutput
{
    key: string;
    callback?: (data: never) => void;
}
