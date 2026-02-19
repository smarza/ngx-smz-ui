export class NeutralCategoryPoint
{
    public category: string;
    public value: number;
    public serieId: string;
    public data: any[];
    public constructor(serieId: string, category: string, value: number, data: any[]);
    public constructor(category: string, value: number, data: any[]);

    public constructor(...params: any[]) {

        switch (params.length) {
            case 3:
                this.entry1({ ...params as any });
                break;

            case 4:
                this.entry2({ ...params as any });
                break;

            default:
                break;
        }
    }

    private entry1(args: { category: string, value: number, data: any[] }): void {
        this.category = args.category;
        this.value = args.value;

        this.data = args.data == null ? [] : args.data;
    }

    private entry2(args: { serieId: string, category: string, value: number, data: any[] }): void {
        this.category = args.category;
        this.value = args.value;
        this.serieId = args.serieId;

        this.data = args.data == null ? [] : args.data;
    }

}