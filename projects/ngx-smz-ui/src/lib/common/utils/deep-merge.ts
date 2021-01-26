/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item)
{
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources)
{
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source))
    {
        for (const key in source)
        {
            if (isObject(source[key]))
            {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else
            {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

export function mergeClone(target, ...sources)
{
    return mergeDeep(JSON.parse(JSON.stringify(target)), ...JSON.parse(JSON.stringify(sources)));
}

export function clone(target)
{
    return JSON.parse(JSON.stringify(target));
}