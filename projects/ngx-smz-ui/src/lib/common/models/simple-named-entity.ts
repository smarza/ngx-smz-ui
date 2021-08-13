// export type SimpleNamedEntity = SimpleEntity<string>
// {

// }

export interface SimpleNamedEntity extends SimpleEntity<string> { };

export interface SimpleEntity<T>
{
    id: T;
    name: string;
}

export interface SimpleParentEntity<T>
{
    parentId: T;
    data: SimpleEntity<T>[];

}


/*
    Map {property_name}.id properties to {property_name}Id in Javascript objects
*/
export function flattenObject<T>(data: any): T
{
    const result = {};
    for (const key of Object.keys(data))
    {
        if (data[key] != null && data[key].id !== undefined)
        {
            result[key + 'Id'] = data[key].id;
        }
        else
        {
            result[key] = data[key];
        }
    }

    for (const key of Object.keys(result))
    {
        if (Object.keys(result).find(x => x === key + 'Id') != null)
        {
            result[key] = undefined;
        }
    }

    return result as T;
}