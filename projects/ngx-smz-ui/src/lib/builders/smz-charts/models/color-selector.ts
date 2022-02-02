import { ColorPallete } from './color-pallete';

export class ChartColorSelector
{
    private static readonly Bright1 = [ '#01A5E4', '#8DD7BF', '#FF96C5', '#FF5768', '#FFBF65' ];
    private static readonly Bright2 = [ '#FC6328', '#FFD872', '#F2D4CC', '#E77577', '#6C88C4' ];
    private static readonly Bright3 = [ '#C05780', '#FF828B', '#E7C582', '#00B0BA', '#0065A2' ];
    private static readonly Bright4 = [ '#00CDAC', '#FF6F68', '#FFDACC', '#FF60A8', '#CFF800' ];
    private static readonly Bright5 = [ '#FF5C77', '#4DD091', '#FFEC59', '#FFA23A', '#74737A' ];

    private static readonly Spring1 = [ '#AFDDD5', '#FFA700', '#FFCCDD', '#F56093', '#64864A' ];
    private static readonly Spring2 = [ '#DFE6E6', '#EFDEC0', '#FF7E5A', '#FFBD00', '#7DB954' ];
    private static readonly Spring3 = [ '#FEDDCB', '#FFC700', '#CEE8E5', '#C6C598', '#FEE100' ];
    private static readonly Spring4 = [ '#FAC4C4', '#E9E7AD', '#FDBB9F', '#FFFFFF', '#EADCC3' ];
    private static readonly Spring5 = [ '#EEF3B4', '#FFB27B', '#FF284B', '#7ABAA1', '#CFEAE4' ];

    private static readonly Summer1 = [ '#53CFDA', '#EFF2E6', '#FF7994', '#FFC900', '#FFED00' ];
    private static readonly Summer2 = [ '#FF8860', '#F7D635', '#D6E8D9', '#F1C9C2', '#1F3D51' ];
    private static readonly Summer3 = [ '#FF3747', '#FF8B0F', '#FFD600', '#EAE45F', '#DDF5C2' ];
    private static readonly Summer4 = [ '#FF458F', '#FF8352', '#DEE500', '#00E1DF', '#00C3AF' ];
    private static readonly Summer5 = [ '#EDF7DD', '#4FCBBB', '#2494CC', '#EF39A7', '#FFAE90' ];

    private static readonly Pastel1 = [ '#ABDEE6', '#CBAACB', '#FFFFB5', '#FFCCB6', '#F3B0C3' ];
    private static readonly Pastel2 = [ '#FF968A', '#FFAEA5', '#FFC5BF', '#F6EAC2', '#ECD5E3' ];
    private static readonly Pastel3 = [ '#FF968A', '#FFAEA5', '#FFC5BF', '#FFD8BE', '#FFC8A2' ];
    private static readonly Pastel4 = [ '#D4F0F0', '#8FCACA', '#CCE2CB', '#B6CFB6', '#97C1A9' ];

    private static readonly Pastel5 = [ '#FCB9AA', '#FFDBCC', '#ECEAE4', '#A2E1DB', '#55CBCD' ];

    private static readonly Winter1 = [ '#445A67', '#57838D', '#B4C9C7', '#F3BFB3', '#CCADB2' ];
    private static readonly Winter2 = [ '#FFEFFF', '#F6F7FB', '#E0F8F5', '#BEEDE5', '#A7D9C9' ];
    private static readonly Winter3 = [ '#50B4D8', '#9EDDEF', '#F7E5D7', '#D7E2EA', '#96B3C2' ];
    private static readonly Winter4 = [ '#FFDAD1', '#FFEDDA', '#CAB3C1', '#6E7B8F', '#2E3332' ];
    private static readonly Winter5 = [ '#C29BA3', '#E3BFB7', '#FFE4C9', '#B7EAF7', '#8A9BA7' ];

    private static readonly Gemstone1 = [ '#53051D', '#9E1C5C', '#EF70AA', '#FF8C94', '#F12761' ];
    private static readonly Gemstone2 = [ '#00C6C7', '#96D5E2', '#00ACA5', '#006F60', '#005245' ];
    private static readonly Gemstone3 = [ '#EEAC4D', '#FFF2C3', '#EE84B3', '#740E4C', '#E2035D' ];
    private static readonly Gemstone4 = [ '#B57E79', '#FF6F68', '#00E9E7', '#006072', '#5C2A2E' ];
    private static readonly Gemstone5 = [ '#20503E', '#187B30', '#75E0B0', '#2D8498', '#4CB0A6' ];

    private static readonly Autumn1 = [ '#57291F', '#C0413B', '#D77B5F', '#FF9200', '#FFCD73' ];
    private static readonly Autumn2 = [ '#F7E5BF', '#C87505', '#F18E3F', '#E59579', '#C14C32' ];
    private static readonly Autumn3 = [ '#80003A', '#8CB5B5', '#6C3400', '#FFA400', '#EC410B' ];
    private static readonly Autumn4 = [ '#E63400', '#8CB5B5', '#6C3400', '#FFA400', '#41222A' ];
    private static readonly Autumn5 = [ '#FFF7C2', '#FFB27B', '#FF7B80', '#BC7576', '#696B7E' ];

    private static readonly Vivid1 = [ '#FF3784', '#36A2EB', '#4BC0C0', '#F77825', '#9966FF' ];
    private static readonly Vivid2 = [ '#0074D9', '#FF4136', '#2ECC40', '#FF851B', '#7FDBFF' ];
    private static readonly Vivid3 = [ '#2D95EC', '#F6BA2A', '#F64D2A', '#8ABB21', '#E2711D' ];
    private static readonly Vivid4 = [ '#EC1F24', '#69BC45', '#3651A2', '#F3EC1F', '#6CCCDE' ];
    private static readonly Vivid5 = [ '#EC0F7B', '#F6831B', '#97C93B', '#6CC175', '#6950A1' ];
    private static readonly Vivid6 = [ '#CD1724', '#07B8FF', '#34A300', '#8D4D00', '#FFE700' ];

    private static readonly General1 = [ '#4573A7', '#AA4644', '#89A54E', '#71588F', '#4298AF' ];
    private static readonly General2 = [ '#DB843D', '#93A9D0', '#D09392', '#BACD96', '#A99BBE' ];
    private static readonly General3 = [ '#68D4CD', '#CFF67B', '#94DAFB', '#FD8080', '#6C838D' ];
    private static readonly General4 = [ '#26A0FC', '#26E7A6', '#FEBC3B', '#FAB1B2', '#8B75D7' ];
    private static readonly General5 = [ '#E64345', '#E48F1B', '#F7D027', '#6BA547', '#619ED6' ];
    private static readonly General6 = [ '#60CEED', '#9CF168', '#F7EA4A', '#FBC543', '#FFC9ED' ];
    private static readonly General7 = [ '#64D0DA', '#34B2E4', '#065381', '#8B103E', '#E34856' ];
    private static readonly General8 = [ '#FE912A', '#E6696E', '#B64D8B', '#554D89', '#003E59' ];

    private static readonly Red1 = [ '#4F2623', '#632724', '#923734', '#A93F3B', '#BA5754' ];
    private static readonly Red2 = [ '#D13A2C', '#E14A3B', '#F0594B', '#F76959', '#F7C6B5' ];

    private static readonly Blue1 = [ '#2244A1', '#345DB3', '#537BD2', '#6A94DD', '#9DC2F7' ];
    private static readonly Blue2 = [ '#2082CA', '#3797D8', '#44ABE8', '#58C5EF', '#78D8F5' ];

    private static readonly Green1 = [ '#39590A', '#51761C', '#689E2C', '#91C637', '#A2D970' ];
    private static readonly Green2 = [ '#005F03', '#0F8D00', '#2EC500', '#48DE48', '#9FF3A1' ];
    private static readonly Green3 = [ '#CEC358', '#D7C819', '#E9DA1E', '#F0E785', '#F5F1B7' ];
    private static readonly Green4 = [ '#0D754E', '#10A86F', '#46B98C', '#76CBA8', '#BBE4D4' ];

    private static readonly Yellow1 = [ '#A07900', '#C69A12', '#E5B72B', '#F1C04C', '#F1D185' ];

    private static readonly Pink1 = [ '#C75B73', '#DA7B8E', '#E79099', '#E4A2A7', '#ECBCBC' ];
    private static readonly Pink2 = [ '#F73E3E', '#F75D5D', '#F77C7C', '#F79B9B', '#F7BABA' ];

    private static readonly Soft1 = [ '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9' ];
    private static readonly Soft2 = [ '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9' ];
    private static readonly Soft3 = [ '#DCEDC8', '#F0F4C3', '#FFECB3', '#FFE0B2', '#FFCCBC' ];

    public static GetColors(palletes: ColorPallete[]): string[]
    {
        if (palletes.length == 0) throw new Error('You need to specify ate least one color pallete');

        var colors: string[] = [];

        palletes.forEach(pallete =>
        {
            // var type = typeof(ChartColorSelector);

            // TODO: traduzir lógica
            // var info = type.GetField(pallete.ToString(), BindingFlags.NonPublic | BindingFlags.Static);
            // var value = (string[])info.GetValue(null);
            // colors.push(value);
        });

        return colors;
    }
}
