import * as moment from 'moment';

export class NeutralDatePoint
{
    public date: Date;
    public value: number;
    public serieId: string;
    public data: any[];
    public constructor(serieId: string, date: Date, value: number, data: any[]);
    public constructor(serieId: string, date: Date, value: number, timezoneOffsetHours: number, data: any[]);

    public constructor(...params: any[]) {

        switch (params.length) {
            case 4:
                this.entry1({ ...params as any });
                break;

            case 5:
                this.entry2({ ...params as any });
                break;

            default:
                break;
        }
    }

    private entry1(args: { serieId: string, date: Date, value: number, data: any[] }): void {
        this.date = args.date;
        this.value = args.value;
        this.serieId = args.serieId;

        this.data = args.data == null ? [] : args.data;
    }

    private entry2(args: { serieId: string, date: Date, value: number, timezoneOffsetHours: number, data: any[] }): void {
        this.date = moment(args.date).add(args.timezoneOffsetHours, 'hours').toDate();
        this.value = args.value;
        this.serieId = args.serieId;

        this.data = args.data == null ? [] : args.data;
    }

}