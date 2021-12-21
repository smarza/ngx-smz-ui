export interface SmzTemplate
{
    extraSmall?: SmzResponsive;
    small?: SmzResponsive;
    medium?: SmzResponsive;
    large?: SmzResponsive;
    extraLarge?: SmzResponsive;

}

export interface SmzResponsive
{
    row?: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12' | 'col' | 'col-auto';
    verticalAlignment?: 'items-start' | 'items-center' | 'items-end';
    horizontalAlignment?: 'justify-start' | 'justify-center' | 'justify-end' | 'justify-around' | 'justify-between';

}

export namespace SmzBreakpoints
{
    export const Breakpoint =
    {
        EXTRA_SMALL: 'extraSmall',
        SMALL: 'small',
        MEDIUM: 'medium',
        LARGE: 'large',
        EXTRA_LARGE: 'extraLarge',
    }

    export const Tags =
    {
        [Breakpoint.EXTRA_SMALL]: '',
        [Breakpoint.SMALL]: 'sm:',
        [Breakpoint.MEDIUM]: 'md:',
        [Breakpoint.LARGE]: 'lg:',
        [Breakpoint.EXTRA_LARGE]: 'xl:',
    }

    export const ReplacePositions =
    {
        row: 4,
        verticalAlignment: 12,
        horizontalAlignment: 16,
    }

    export const ResponsiveGeneralTag =
    {
        row: {
            ['col-1']: '1',
            ['col-2']: '2',
            ['col-3']: '3',
            ['col-4']: '4',
            ['col-5']: '5',
            ['col-6']: '6',
            ['col-7']: '7',
            ['col-8']: '8',
            ['col-9']: '9',
            ['col-10']: '10',
            ['col-11']: '11',
            ['col-12']: '12',
        },
        verticalAlignment: {
            ['items-start']: 'start',
            ['items-center']: 'center',
            ['items-end']: 'end',
        },
        horizontalAlignment: {
            ['justify-start']: 'start',
            ['justify-center']: 'center',
            ['justify-end']: 'end',
            ['justify-around']: 'around',
            ['justify-between']: 'between',
        }
    }

    export const ResponsivePrimeTag =
    {
        row: { withTag: '',  emptyTag: 'col-' },
        verticalAlignment:  { withTag: 'items-',  emptyTag: 'items-' },
        horizontalAlignment: { withTag: 'justify-',  emptyTag: 'justify-' }
    }
}