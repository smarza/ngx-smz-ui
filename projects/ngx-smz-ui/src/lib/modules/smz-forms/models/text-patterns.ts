import { capitalizeFirstLetter } from '../../../common/utils/utils';

export enum SmzTextPattern
{
    CAPITALIZE_FIRST_LETTERS_FOR_WORDS_WITH_MORE_THAN_3_CHARS = 1,
    LOWERCASE = 2,
}

export function executeTextPattern(value: string, pattern: SmzTextPattern): string
{
    switch (pattern)
    {
        case SmzTextPattern.CAPITALIZE_FIRST_LETTERS_FOR_WORDS_WITH_MORE_THAN_3_CHARS:
            return capitalizeFirstLetter(value, 2);

        case SmzTextPattern.LOWERCASE:
            return value?.toLowerCase();

        default:
            return value;
    }

}