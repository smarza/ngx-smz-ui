import { Selector } from "@ngxs/store";
import { DemoItem, Plant } from "../../models/demo";
import { DemoFeatureState, DemoFeatureStateModel } from "./demo.state";
import { TreeNode } from "primeng/api/treenode";
import { FontAwesomeMigrations } from "../../demos/data/icons/fontawesome-migration";
import { SpecialIcons } from "../../demos/data/icons/especial-icons";
import { cloneDeep, uniqBy } from "lodash-es";
import { ParentEntity, SimpleNamedEntity } from 'ngx-smz-ui';

export class DemoFeatureSelectors {
  @Selector([DemoFeatureState])
  public static all(state: DemoFeatureStateModel): DemoItem[] {
    const results = state.items.map((x, index) => ({
      ...x,
      roles: [
        { id: "1", name: "teste 1" },
        { id: "2", name: "teste 2" },
        { id: "3", name: "teste 3" },
        { id: "4", name: "teste 4" },
        { id: index.toString(), name: `index ${index}` },
      ],
      price: Math.floor(Math.random() * 1000) + 1,
      date: new Date()
    }));
    console.log("DemoFeatureSelectors results", results);
    return results;
  }

  @Selector([DemoFeatureState])
  public static migrationIcons(state: DemoFeatureStateModel): any[] {
    return FontAwesomeMigrations.map((x, index) => ({
      id: index.toString(),
      ...x,
    }));
  }

  @Selector([DemoFeatureState])
  public static countries(state: DemoFeatureStateModel): any[] {
    return uniqBy(
      state.items.map((x) => x.country),
      "id"
    );
  }

  @Selector([DemoFeatureState])
  public static specialIcons(state: DemoFeatureStateModel): any[] {
    return SpecialIcons.map((x, index) => ({ id: index.toString(), ...x }));
  }

  @Selector([DemoFeatureState])
  public static currentRouteKey(state: DemoFeatureStateModel): string[] {
    return state.currentRouteKey == null
      ? []
      : [state.currentRouteKey?.toString()];
  }

  @Selector([DemoFeatureState])
  public static moreItems(state: DemoFeatureStateModel): DemoItem[] {
    const items = state.items;
    const results = [
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
    ];
    return results.map((x, i) => ({ ...x, name: `${x.name} (${i})` }));
  }

  @Selector([DemoFeatureState])
  public static tree(state: DemoFeatureStateModel): TreeNode[] {
    return state.tree;
  }

  @Selector([DemoFeatureState])
  public static allWithHtmlTags(state: DemoFeatureStateModel): DemoItem[] {
    const results = state.items.map((x, index) => ({
      ...x,
      roles: [
        { id: "1", name: "teste 1" },
        { id: "2", name: "teste 2" },
        { id: "3", name: "teste 3" },
        { id: "4", name: "teste 4" },
        { id: index.toString(), name: `index ${index}` },
      ],
      html: `<div class="grid grid-nogutter items-center justify-start gap-2">
        <i class="fab fa-angellist text-2xl text-primary-color"></i>
        <div class="font-bold">${x.name}</div>
      </div>`,
    }));
    // console.log('DemoFeatureSelectors results', results);
    return results;
  }

  @Selector([DemoFeatureState])
  public static excelDemo(state: DemoFeatureStateModel): DemoItem[] {
    const status = [
      { id: "delivered", name: "Delivered", background: "bg-green-200" },
      { id: "cancelled", name: "Cancelled", background: "bg-slate-200" },
      { id: "processing", name: "Processing", background: "bg-blue-200" },
    ];

    const results = state.items.map((x, index) => ({
      ...x,
      roles: [
        { id: "1", name: "teste 1" },
        { id: "2", name: "teste 2" },
        { id: "3", name: "teste 3" },
        { id: "4", name: "teste 4" },
        { id: index.toString(), name: `index ${index}` },
      ],
      isActive: Math.floor(Math.random() * 1000) + 1 > 500,
      isAutoTask: Math.floor(Math.random() * 1000) + 1 > 500,
      status: status[Math.floor(Math.random() * status.length) + 0],
      price: Math.floor(Math.random() * 1000) + 1,
      html: `<div class="grid grid-nogutter items-center justify-start gap-2">
        <i class="fab fa-angellist text-2xl text-primary-color"></i>
        <a class="font-bold" href="https://www.google.com.br" target="_blank">${x.name}</a>
      </div>`,
      htmls: `<div class="grid grid-nogutter items-center justify-start gap-2">
      <i class="fab fa-angellist text-2xl text-primary-color"></i>
      <a class="font-bold" href="https://www.google.com.br" target="_blank">1. Pesquisa ${x.name}</a>
      <i class="fab fa-angellist text-2xl text-primary-color"></i>
      <a class="font-bold" href="https://www.youtube.com.br" target="_blank">2. Vídeo ${x.name}</a>
    </div>`,
    }));

    const finalResults = [];

    for (let index = 0; index < 5; index++) {
      finalResults.push(...cloneDeep(results));
    }

    return finalResults;
  }

  public static nested(state: DemoFeatureStateModel): Plant[] {
    return [
      {
        id: "1",
        name: "Plant 1",
        modules: [
          {
            id: "1",
            name: "Module 1",
            sectors: [
              {
                id: "1",
                name: "Sector 1",
              },
              {
                id: "2",
                name: "Sector 2",
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Plant 2",
        modules: [
          {
            id: "2",
            name: "Module 2",
            sectors: [
              {
                id: "3",
                name: "Sector 3",
              },
              {
                id: "4",
                name: "Sector 4",
              },
            ],
          },
        ],
      },
    ];
  }

  public static giants(state: DemoFeatureStateModel): any[] {
    return giantsTree;
  }

  public static parentedPortalModelsTree(state: DemoFeatureStateModel): any[] {

    const models = cloneDeep(portalModelsTree);

    const modelsTreeOptions: ParentEntity<string, Partial<TreeNode>>[] = plants.map(x => ({
      parentId: x.id,
      data: [
        ...models.filter(c => c.key === x.id).flatMap(plant => plant.children)]
    }));

    return modelsTreeOptions;
  }

  public static plants(state: DemoFeatureStateModel): any[] {
    return plants;
  }

//   public static linkedDataSample(state: DemoFeatureStateModel): { main: any[], data: ParentEntity<string, SimpleNamedEntity>[]} {
//     return {
//       main: [{ id: 'A', name: 'Group A'}, { id: 'B', name: 'Group B'}],
//       data: linkedTree
//     };
//   }

}

const linkedData = [{ parentId: 'A', data: [{ id: 'A1', name: 'Option A1' }, { id: 'A2', name: 'Option A2' }]}, { parentId: 'B', data: [{ id: 'B1', name: 'Option B1' }, { id: 'B2', name: 'Option B2' }]}];

const giantsTree = [
  {
    "name": "P-38",
    "topsideModules": [],
    "hullSpaces": [
      {
        "name": "Tanque n°1 de carga",
        "structuralMembers": [
          {
            "name": "Escoa Superior da Cav.104",
            "plates": [
              {
                "name": "HGP-104-1-2 plate",
                "id": "0700c8f1-8ea8-4aa5-b5a3-20f65831c18f"
              },
              {
                "name": "HGP-104-1-4 plate",
                "id": "0a4e17d6-a04b-4a0b-bc84-dd4eccac4054"
              },
              {
                "name": "HGP-104-1-1 plate",
                "id": "67980107-db46-4209-8b6a-d3d1815d9e1a"
              },
              {
                "name": "HGP-104-1-2-A plate",
                "id": "8578fc8e-e00a-4ff2-8449-a06412db89ec"
              },
              {
                "name": "HGP-104-1-3 plate",
                "id": "8962699c-1ae7-4ece-b0a5-c535a9adba49"
              },
              {
                "name": "HGP-104-1-1-A plate",
                "id": "b2c1c8f3-4035-4fc0-a442-7fef5127cce0"
              }
            ],
            "reinforcements": [
              {
                "name": "HGS-104-1-2 reinforcement",
                "id": "2cc85f5b-e7e9-4d62-a528-d127b9e2562d"
              },
              {
                "name": "HGS-104-1-3 reinforcement",
                "id": "79bf5fbf-2106-45e9-b6aa-fea5c4fe3584"
              },
              {
                "name": "HGS-104-1-6 reinforcement",
                "id": "856b9a44-9ba4-4363-8b4c-2936860436a1"
              },
              {
                "name": "HGS-104-1-7 reinforcement",
                "id": "901005c5-cfed-4449-9226-abebc36af5a4"
              },
              {
                "name": "HGS-104-1-1 reinforcement",
                "id": "b9e6941f-fd51-47de-aeee-c5245b165929"
              },
              {
                "name": "HGS-104-1-4 reinforcement",
                "id": "de6da92d-f365-4325-9e99-4526aa772d2c"
              },
              {
                "name": "HGS-104-1-5 reinforcement",
                "id": "f104357e-bd63-43fd-9f62-ed12c9784748"
              }
            ],
            "id": "0868ac4f-e17d-4e92-9794-f380540584a2"
          },
          // {
          //   "name": "Costado",
          //   "plates": [
          //     { "name": "SSP-6", "id": "06a2393a-c65c-4c81-8034-72c426b2d8bd" },
          //     {
          //       "name": "SSP-21",
          //       "id": "0ad06ccc-f33c-4b69-9194-ecc1d383aad7"
          //     },
          //     {
          //       "name": "SSP-11",
          //       "id": "0afa2899-7003-46e6-9e00-893d627bd640"
          //     },
          //     { "name": "SSP-9", "id": "121d1fbb-f0b1-4c67-a012-5c920e29b860" },
          //     {
          //       "name": "SSP-18",
          //       "id": "1302fd6a-8d16-4f78-afcf-d06b34a0f27d"
          //     },
          //     { "name": "SSP-5", "id": "21909f7b-c23f-479b-bb89-6af6f6d24d83" },
          //     {
          //       "name": "SSP-13",
          //       "id": "3aa7a12f-e386-4cc7-ba94-b3bd663df48b"
          //     },
          //     {
          //       "name": "SSP-29",
          //       "id": "3d7beb18-357c-43fe-9fe8-3caca906e03c"
          //     },
          //     { "name": "SSP-8", "id": "4063d375-7323-4bf8-8719-85bd1f14fc0c" },
          //     {
          //       "name": "SSP-17",
          //       "id": "415218bc-68e6-4a8a-9116-d13ed8aa6bc4"
          //     },
          //     {
          //       "name": "SSP-19",
          //       "id": "4749649a-5ee3-4054-856a-3903914a5ba8"
          //     },
          //     { "name": "SSP-3", "id": "4918c322-5faa-45e6-a0be-422c47b251e7" },
          //     {
          //       "name": "SSP-14",
          //       "id": "5ac46f9f-cc9c-44d0-849b-b7f23e462743"
          //     },
          //     {
          //       "name": "SSP-27",
          //       "id": "5d1b931d-504e-426d-9d86-bd955b217060"
          //     },
          //     {
          //       "name": "SSP-25",
          //       "id": "60c4220b-25c8-4e62-93bb-4d903e0d0e25"
          //     },
          //     {
          //       "name": "SSP-15",
          //       "id": "6469c95e-1925-4883-bfea-d5e30f926e62"
          //     },
          //     {
          //       "name": "SSP-31",
          //       "id": "6c544209-6c22-41fb-bbc2-c91cd17189c7"
          //     },
          //     { "name": "SSP-4", "id": "7141018b-813f-42f1-b952-015ca28c52d0" },
          //     {
          //       "name": "SSP-12",
          //       "id": "8e4d8898-0be0-4892-afb4-b6c603f1fe65"
          //     },
          //     { "name": "SSP-1", "id": "a02e3360-efd5-43d3-8022-caba90959756" },
          //     {
          //       "name": "SSP-20",
          //       "id": "ab86aff3-eeb1-4531-8e53-f994bf9a15f0"
          //     },
          //     {
          //       "name": "SSP-26",
          //       "id": "ad81abf5-cb57-4315-af12-01a2a77441a4"
          //     },
          //     { "name": "SSP-2", "id": "b9a6ee71-b217-49e4-aa27-7151ca326c9e" },
          //     {
          //       "name": "SSP-16",
          //       "id": "baab2e15-629f-49ab-abea-3a7cf7e3bb28"
          //     },
          //     {
          //       "name": "SSP-10",
          //       "id": "ca973b8a-62e4-42ae-9591-05b6475ef315"
          //     },
          //     {
          //       "name": "SSP-22",
          //       "id": "d03a41df-51f5-4a3e-b024-4a5543cb1b7f"
          //     },
          //     { "name": "SSP-7", "id": "d3da0e69-3738-49f2-a67b-37543fdcb21a" },
          //     {
          //       "name": "SSP-23",
          //       "id": "dae8ea12-9452-4ca5-b0ee-716687620f42"
          //     },
          //     {
          //       "name": "SSP-30",
          //       "id": "e3aa7c19-473a-49f0-aaa5-ea63cf2e105a"
          //     },
          //     {
          //       "name": "SSP-28",
          //       "id": "e50bc72f-2610-44aa-b670-428f90eaad5d"
          //     },
          //     { "name": "SSP-24", "id": "fac9423d-5cc2-49e2-b091-2d7b2a39e3bb" }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "SSL-7-4",
          //       "id": "11578c0d-1f88-406f-a2ba-2b594e79b39e"
          //     },
          //     {
          //       "name": "SSL-23-4",
          //       "id": "11c49a31-88d6-44ce-93f1-96f1972fde8b"
          //     },
          //     {
          //       "name": "SSL-7-7",
          //       "id": "26459204-e722-45b2-8ae6-38e304cb1b0e"
          //     },
          //     {
          //       "name": "SSL-16-10",
          //       "id": "379c513f-bc34-4dd3-8b26-64f878988755"
          //     },
          //     {
          //       "name": "SSL-19-7",
          //       "id": "3d105790-6caa-4806-aedd-14c4f6afe5ad"
          //     },
          //     {
          //       "name": "SSL-15-4",
          //       "id": "41f74f3c-c10b-4095-89e8-6d814084b08f"
          //     },
          //     {
          //       "name": "SSL-11-4",
          //       "id": "4fdbc6a3-4bed-4b9a-a180-b064b9a01113"
          //     },
          //     {
          //       "name": "SSL-23-1",
          //       "id": "509a0ba1-56fb-470b-a5ac-d1656898df33"
          //     },
          //     {
          //       "name": "SSL-11-7",
          //       "id": "5119f36d-f1ce-429a-acef-e5f67a6a93fe"
          //     },
          //     {
          //       "name": "SSL-11-1",
          //       "id": "5ff17d62-819e-45a0-9d2d-60f826bd72dc"
          //     },
          //     {
          //       "name": "SSL-7-10",
          //       "id": "6f196602-c3d4-43d5-9c8e-188cd79e23ff"
          //     },
          //     {
          //       "name": "SSL-19-10",
          //       "id": "7680158f-39dd-402b-a279-d24e15cd9d97"
          //     },
          //     {
          //       "name": "SSL-3-1",
          //       "id": "7b01d210-2b76-4241-adbc-0d282051a0a3"
          //     },
          //     {
          //       "name": "SSL-15-1",
          //       "id": "910098bf-c74e-4013-bce1-c60c75fa7460"
          //     },
          //     {
          //       "name": "SSL-19-1",
          //       "id": "98c6d8fd-85f6-4df5-a522-f10b9e05365b"
          //     },
          //     {
          //       "name": "SSL-19-4",
          //       "id": "9ce7b487-4c4c-4b71-93da-5d6ad0e86f0e"
          //     },
          //     {
          //       "name": "SSL-15-7",
          //       "id": "a229251c-07d3-46d3-851d-da0b5193940b"
          //     },
          //     {
          //       "name": "SSL-23-7",
          //       "id": "b8631ca3-e440-4e37-abc3-0b67b1bb1996"
          //     },
          //     {
          //       "name": "SSL-11-10",
          //       "id": "bcc2abc5-50d6-4c27-bdfb-4d45588a0640"
          //     },
          //     {
          //       "name": "SSL-23-10",
          //       "id": "bfc0d659-62a7-4478-a3dd-4ec2f3de5599"
          //     },
          //     {
          //       "name": "SSL-14-10",
          //       "id": "c05d942e-fbb1-44c3-b3bf-c92dc2af85f3"
          //     },
          //     {
          //       "name": "SSL-7-1",
          //       "id": "c69a69bf-56db-40e7-8854-d023579b2a3e"
          //     },
          //     {
          //       "name": "SSL-3-4",
          //       "id": "c7b6c2b4-cc69-40de-ad74-f0a50cb74335"
          //     },
          //     {
          //       "name": "SSL-3-7",
          //       "id": "e9496642-4d98-4a39-8c92-d60037d12914"
          //     },
          //     {
          //       "name": "SSL-3-10",
          //       "id": "f093b04f-1773-48ca-9000-e3c02a9ec9b4"
          //     }
          //   ],
          //   "id": "0af601e3-23f2-45c2-a337-ee1bc4ec8dc2"
          // },
          // {
          //   "name": "Convés Principal",
          //   "plates": [
          //     {
          //       "name": "DP-16-B",
          //       "id": "065d2e1c-7980-478e-9165-398c5fc58c49"
          //     },
          //     {
          //       "name": "DP-8-E",
          //       "id": "08633b02-2b1b-4210-9391-83c229bc5373"
          //     },
          //     { "name": "DP-17", "id": "0bdae200-652b-477a-ab6c-6412936ff975" },
          //     {
          //       "name": "DP-12-A",
          //       "id": "0f924e8a-d8b0-420a-947a-bc4cb082ca1a"
          //     },
          //     {
          //       "name": "DP-16-E",
          //       "id": "100710d1-6397-4343-962d-619e521d84be"
          //     },
          //     {
          //       "name": "DP-16-C",
          //       "id": "193b48ad-2411-41f3-9dda-85437de82de5"
          //     },
          //     { "name": "DP-7", "id": "21a34410-c382-47af-af1a-a24b6db17a8d" },
          //     { "name": "DP-16", "id": "2722b782-ce1d-4914-9795-aef20d53f7a9" },
          //     { "name": "DP-18", "id": "371892bc-1762-41ef-b082-568e1e1d681e" },
          //     { "name": "DP-3", "id": "45233bc7-2dc4-4b03-8611-a14e333954f4" },
          //     { "name": "DP-13", "id": "51ec20c4-250c-4f4f-b31e-6e43ff62fd26" },
          //     {
          //       "name": "DP-16-A",
          //       "id": "638d69c4-6fd6-4ff7-beca-c7575b56782f"
          //     },
          //     { "name": "DP-8", "id": "6bb987f2-3705-43fe-808a-f4b15cd71108" },
          //     { "name": "DP-5", "id": "6bf60917-baac-45a1-be22-abd9c3542a19" },
          //     {
          //       "name": "DP-4-A",
          //       "id": "747b1b56-2281-48d4-8b60-aea087debced"
          //     },
          //     { "name": "DP-14", "id": "7b9df961-48aa-4fb3-b0e5-618df5f4ae42" },
          //     {
          //       "name": "DP-15-A",
          //       "id": "81f58a5a-eb4d-484d-9351-7f2b49bee50e"
          //     },
          //     { "name": "DP-6", "id": "8fb14a4d-9271-407e-bf38-6fe1099c2e46" },
          //     { "name": "DP-12", "id": "92691330-7dac-4341-8bb5-ef354cf07895" },
          //     { "name": "DP-19", "id": "9ddc5ab3-b2b2-4ab8-92ae-eb18e7e94931" },
          //     {
          //       "name": "DP-11-B",
          //       "id": "a2b81beb-0e5e-4f62-ade1-303c4ba5b890"
          //     },
          //     {
          //       "name": "DP-8-B",
          //       "id": "b77a35ef-ffa4-42b0-8fa3-e2c32bc423c9"
          //     },
          //     { "name": "DP-1", "id": "b8951cef-2bef-4f7a-8f65-66cd3dde8b3d" },
          //     {
          //       "name": "DP-8-C",
          //       "id": "ba031de8-56cd-4e54-801e-116a5a44eec9"
          //     },
          //     {
          //       "name": "DP-18-C",
          //       "id": "bbea5fa0-3cca-45df-9fd2-6d26c8fb2368"
          //     },
          //     {
          //       "name": "DP-17-A",
          //       "id": "bbefea05-e6ea-48a5-bb68-f4b863566d50"
          //     },
          //     { "name": "DP-15", "id": "c1c45dbd-0ef4-405a-a741-1e3b81ccd74a" },
          //     { "name": "DP-11", "id": "c2b1326e-820a-4077-a2ff-daf9892b6eeb" },
          //     { "name": "DP-10", "id": "c47a9729-d4c4-4799-84b6-57cc90110772" },
          //     {
          //       "name": "DP-11-A",
          //       "id": "d86e5993-e0f2-45a4-aa21-173af1c0e628"
          //     },
          //     { "name": "DP-2", "id": "db100659-50d6-4fbc-968e-90087b23b371" },
          //     { "name": "DP-9", "id": "dc5329e1-713f-49a4-8b02-49e992fa7373" },
          //     {
          //       "name": "DP-8-D",
          //       "id": "dcf4cd65-dc3a-4a8e-8c2d-c44cd37a4374"
          //     },
          //     {
          //       "name": "DP-18-A",
          //       "id": "e327ebd9-9db1-4c12-85c3-1f778a592884"
          //     },
          //     {
          //       "name": "DP-11-C",
          //       "id": "e37523d5-f2a3-422c-88f3-f7abea1f37eb"
          //     },
          //     {
          //       "name": "DP-16-D",
          //       "id": "e69a79aa-f5b7-485d-9de4-81c4b0802d36"
          //     },
          //     {
          //       "name": "DP-18-B",
          //       "id": "eb6718d5-d15b-466b-b062-aa605f30565a"
          //     },
          //     {
          //       "name": "DP-8-A",
          //       "id": "f524cb90-fb9b-4240-9141-f240b5547fd3"
          //     },
          //     { "name": "DP-4", "id": "f6148157-b52a-4356-ad4e-6076d5a27234" }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "DL-23-1",
          //       "id": "0e76fda7-d688-4287-9fde-225727e7d7e8"
          //     },
          //     {
          //       "name": "DL-25-4",
          //       "id": "1229369d-a0c6-4b27-819f-bd1a702f2fc8"
          //     },
          //     {
          //       "name": "DL-11-6",
          //       "id": "257c5983-bb08-438c-9a2c-6e237b632b7b"
          //     },
          //     {
          //       "name": "DL-19-10",
          //       "id": "29ab56bf-6036-4098-aacf-0f160a6dccf9"
          //     },
          //     {
          //       "name": "DL-26-8",
          //       "id": "48fc5861-92a0-4d61-b5bf-36b6b8ef50b6"
          //     },
          //     {
          //       "name": "DL-23-4",
          //       "id": "509fcc1d-1656-40a2-9b97-66b561bf86bd"
          //     },
          //     {
          //       "name": "DL-11-1",
          //       "id": "60f92763-85da-4629-b71e-6a9667a9f592"
          //     },
          //     {
          //       "name": "DL-26-6",
          //       "id": "84285daf-396b-4428-b688-402e123a43f7"
          //     },
          //     {
          //       "name": "DL-19-8",
          //       "id": "86dfe712-1a78-4c9e-b583-44f7472dff10"
          //     },
          //     {
          //       "name": "DL-15-8",
          //       "id": "8dd218f1-da86-40d2-9efb-f47308035eb4"
          //     },
          //     {
          //       "name": "DL-15-4",
          //       "id": "a665bf1a-3bd4-4819-9ddc-dea7193f586f"
          //     },
          //     {
          //       "name": "DL-11-8",
          //       "id": "a9d62a8f-4e03-4d04-9041-9428edad94c9"
          //     },
          //     {
          //       "name": "DL-25-1",
          //       "id": "a9e56180-8256-4562-936e-7911520e836e"
          //     },
          //     {
          //       "name": "DL-23-6",
          //       "id": "b981ccaa-88b6-4d18-83f5-85b2ec4313c4"
          //     },
          //     {
          //       "name": "DL-19-1",
          //       "id": "c405614f-9993-4a6c-bbe8-98d7f511372b"
          //     },
          //     {
          //       "name": "DL-19-4",
          //       "id": "ca952fbc-c151-4f22-ab68-1a4930ee2ccc"
          //     },
          //     {
          //       "name": "DL-15-1",
          //       "id": "da2fe31c-6eb1-4b8b-bd1f-781b521d5e72"
          //     },
          //     {
          //       "name": "DL-15-10",
          //       "id": "e9e38318-c268-49c2-96f8-1fa75f92480b"
          //     },
          //     {
          //       "name": "DL-15-6",
          //       "id": "f57d6cb0-d2d6-4580-9ed4-4e8da739920e"
          //     },
          //     {
          //       "name": "DL-11-4",
          //       "id": "fd2b2e3d-3d0d-4580-a970-862d5ae0238f"
          //     },
          //     {
          //       "name": "DL-19-6",
          //       "id": "a2d9d2a7-5cdd-4afe-a3b5-4f0554cdc6e7"
          //     },
          //     {
          //       "name": "DL-11-10",
          //       "id": "cc44d09a-9935-475f-a4b1-884f75d5d859"
          //     }
          //   ],
          //   "id": "0db0bbe0-15cb-494b-a081-19ea9352af6a"
          // },
          // {
          //   "name": "Escoa No.2 da Cav.99",
          //   "plates": [
          //     {
          //       "name": "HGP-100-2-4",
          //       "id": "42d87b6d-a72a-4193-8c3b-927a059beb34"
          //     },
          //     {
          //       "name": "HGP-99-2-3 - A",
          //       "id": "741299e9-c455-4503-a28b-691d1aca1812"
          //     },
          //     {
          //       "name": "HGP-99-2-3",
          //       "id": "7eb8449e-a212-48f9-8ae3-6b44ef6f189c"
          //     },
          //     {
          //       "name": "HGP-99-2-2 - A",
          //       "id": "98363f05-cf24-4251-8e5b-a199c97206e0"
          //     },
          //     {
          //       "name": "HGP-100-2-3",
          //       "id": "9996b78b-ec14-4b6d-a2a0-2e9361e83ea2"
          //     },
          //     {
          //       "name": "HGP-99-2-1",
          //       "id": "a69635c4-cfe7-4d72-8a3b-da3a056649a8"
          //     },
          //     {
          //       "name": "HGP-100-2-2 ?",
          //       "id": "ef7489df-a46b-461c-860c-a499850b0d3a"
          //     },
          //     {
          //       "name": "HGP-100-2-1 ?",
          //       "id": "f9079018-80d0-40ad-9132-ee05e097a956"
          //     },
          //     {
          //       "name": "HGP-99-2-2",
          //       "id": "fa5d4c58-1307-41c4-9255-bccefe026b1c"
          //     }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "HGS-100-2-3",
          //       "id": "0c1e9489-0a3e-4ff7-b80c-255303607ca2"
          //     },
          //     {
          //       "name": "HGS-99-2-1",
          //       "id": "1ce5943c-cbe4-487c-8a65-6381068b7341"
          //     },
          //     {
          //       "name": "HGS-100-2-4",
          //       "id": "9d5c6784-fad1-4a38-b8ed-fea7c661282d"
          //     },
          //     {
          //       "name": "HGS-100-2-2",
          //       "id": "a132d85f-e831-45b2-ac22-059f7288fb0d"
          //     },
          //     {
          //       "name": "HGS-99-2-4",
          //       "id": "bbd334fe-1c79-4be2-b522-db4fefce9055"
          //     },
          //     {
          //       "name": "HGS-99-2-2",
          //       "id": "cbf922b0-ed2d-4423-a506-5990b1746772"
          //     },
          //     {
          //       "name": "HGS-99-2-3",
          //       "id": "dfd829e1-40fb-48e7-b94d-e7f176e30530"
          //     },
          //     {
          //       "name": "HGS-100-2-1",
          //       "id": "fcd6b434-33d4-4fd9-aa72-45b527ef4ec2"
          //     }
          //   ],
          //   "id": "0ef1ae0c-567b-4a18-a21e-8e1ac0733a7b"
          // },
          // {
          //   "name": "Escoa Inferior da Cav.104",
          //   "plates": [
          //     {
          //       "name": "HGP-104-2-3",
          //       "id": "1c0d5405-3008-46a4-82c5-a8cd0987e1e0"
          //     },
          //     {
          //       "name": "HGP-104-2-1",
          //       "id": "36424692-7e63-4b9a-bda4-d405a8f21022"
          //     },
          //     {
          //       "name": "HGP-104-2-1-A",
          //       "id": "6bf5bbf2-9f4c-46bc-865e-4dba1b1aaa04"
          //     },
          //     {
          //       "name": "HGP-104-2-2",
          //       "id": "cfbd82c0-e43f-45de-a320-921741321322"
          //     },
          //     {
          //       "name": "HGP-104-2-4",
          //       "id": "d79aa41c-cc96-4bf9-8351-c29daffa7af9"
          //     }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "HGS-104-2-4",
          //       "id": "2f0bf823-e4b7-43b9-86d6-dfc5ff3583ce"
          //     },
          //     {
          //       "name": "HGS-104-2-5",
          //       "id": "3ce5c58a-09a6-454e-9cc1-5af6cb563524"
          //     },
          //     {
          //       "name": "HGS-104-2-6",
          //       "id": "5814bb93-0abd-41f5-8b9c-8476d0332872"
          //     },
          //     {
          //       "name": "HGS-104-2-1",
          //       "id": "6b402657-952d-48ee-9554-fe03aa60e024"
          //     },
          //     {
          //       "name": "HGS-104-2-2",
          //       "id": "b27e4e4c-df21-4d08-bc70-c2952b9660b8"
          //     },
          //     {
          //       "name": "HGS-104-2-3",
          //       "id": "0b9f6b45-7fcb-4ba6-a134-04f3dd0fb9f4"
          //     }
          //   ],
          //   "id": "48c8ab31-9dce-4b72-a080-048f7f30c067"
          // },
          // {
          //   "name": "Escoa No.4 da Cav.99",
          //   "plates": [
          //     {
          //       "name": "HGP-99-4-1 - A",
          //       "id": "2e863a9a-a0ee-4107-b22c-a4c93680d8ac"
          //     },
          //     {
          //       "name": "HGP-100-4-3 ?",
          //       "id": "39cb1e64-b07a-44c6-9e72-1d098cc8cdcc"
          //     },
          //     {
          //       "name": "HGP-99-4-2",
          //       "id": "6771ed3c-4d38-41d1-ab8f-37498d3394f2"
          //     },
          //     {
          //       "name": "HGP-100-4-2 ?",
          //       "id": "793be581-2b70-49a3-b215-79502c1cc9f6"
          //     },
          //     {
          //       "name": "HGP-100-4-4",
          //       "id": "935eb7a0-bb75-4392-a122-e53a8f2752b5"
          //     },
          //     {
          //       "name": "HGP-100-4-1",
          //       "id": "bd1c949e-f62c-4409-bf34-a59b430aba46"
          //     },
          //     {
          //       "name": "HGP-99-4-1",
          //       "id": "c03a4733-d340-4274-af99-d1b245c89273"
          //     }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "HGS-99-4-2",
          //       "id": "1bc65fdc-0056-4b30-93fb-e370a3881a61"
          //     },
          //     {
          //       "name": "HGS-99-4-3",
          //       "id": "59213edb-0880-46c6-baaa-6a53d381ca41"
          //     },
          //     {
          //       "name": "HGS-100-4-4",
          //       "id": "866b55e6-f361-4fd8-933f-233a597c1aa5"
          //     },
          //     {
          //       "name": "HGS-99-4-1",
          //       "id": "8860a1fe-0272-4526-80aa-052987305afd"
          //     },
          //     {
          //       "name": "HGS-100-4-3",
          //       "id": "8bb945cc-0015-4a67-bf5f-c8abe323fa0a"
          //     },
          //     {
          //       "name": "HGS-100-4-1",
          //       "id": "c1999e2c-aacd-4b4e-b3ae-2d5c3c0bb695"
          //     },
          //     {
          //       "name": "HGS-99-4-4",
          //       "id": "f3f84a53-80e3-40d5-9b24-c49620d3cc98"
          //     },
          //     {
          //       "name": "HGS-100-4-2",
          //       "id": "fc7450d5-3376-400f-be8d-ec9f19a25c29"
          //     }
          //   ],
          //   "id": "4ba18848-8615-444f-8a0a-895bb2c9c5f9"
          // },
          // {
          //   "name": "Antepara Transversal da Cv.109",
          //   "plates": [
          //     {
          //       "name": "TBP-109-8-B",
          //       "id": "050f466f-6bd3-4ed5-bbd8-ea288f959c5e"
          //     },
          //     {
          //       "name": "TBP-109-7-D",
          //       "id": "0581a981-2475-4d7e-a3f3-43c52a102dad"
          //     },
          //     {
          //       "name": "TBP-109-7-B",
          //       "id": "11402619-d968-4f1d-ac23-6880eca95fad"
          //     },
          //     {
          //       "name": "TBP-109-8",
          //       "id": "1aaa3f50-954e-4632-b6e2-73d804d2d4a7"
          //     },
          //     {
          //       "name": "TBP-109-5-A",
          //       "id": "1cd879c3-e850-4bcf-81c8-d781f2f6fe49"
          //     },
          //     {
          //       "name": "TBP-109-2-A",
          //       "id": "20d1517d-1a76-4de5-980b-9530ca9f9af6"
          //     },
          //     {
          //       "name": "TBP-109-4-B",
          //       "id": "222b59d4-d648-4762-bbdf-5167d6eb2da2"
          //     },
          //     {
          //       "name": "TBP-109-3-A",
          //       "id": "2dcac7f1-af83-498b-acbe-02550ff7f15a"
          //     },
          //     {
          //       "name": "TBP-109-1",
          //       "id": "490b88aa-3254-4cd2-b84e-a799eadcecbc"
          //     },
          //     {
          //       "name": "TBP-109-4",
          //       "id": "4d38a3ae-4b41-4933-95ae-9639197b8322"
          //     },
          //     {
          //       "name": "TBP-109-6",
          //       "id": "5367499f-180a-47cf-bfc3-405bff2d4f41"
          //     },
          //     {
          //       "name": "TBP-109-10",
          //       "id": "58585ce4-bd67-43fb-85a0-b72a29adf40f"
          //     },
          //     {
          //       "name": "TBP-109-2",
          //       "id": "6e4317ff-7505-43b4-9f9b-ac5a68d83c58"
          //     },
          //     {
          //       "name": "TBP-109-4-A",
          //       "id": "86d43820-c6a7-4b3e-a90c-5273b3343a5b"
          //     },
          //     {
          //       "name": "TBP-109-7-C",
          //       "id": "87bdc42f-079f-4049-8341-2817c332e818"
          //     },
          //     {
          //       "name": "TBP-109-8-A",
          //       "id": "911f140e-d880-481a-9ea3-ae9ce181a0a4"
          //     },
          //     {
          //       "name": "TBP-109-6-A",
          //       "id": "91d5d3a1-441d-410c-8abb-89039198bb6f"
          //     },
          //     {
          //       "name": "TBP-109-9",
          //       "id": "97a9f658-2945-4268-8fcc-9d88bbf93d11"
          //     },
          //     {
          //       "name": "TBP-109-7",
          //       "id": "a5a88541-7bef-4ba7-8f5e-0a86d65f5f75"
          //     },
          //     {
          //       "name": "TBP-109-9-A",
          //       "id": "b9c0c849-d252-4fb8-8376-719b877c686d"
          //     },
          //     {
          //       "name": "TBP-109-7-A",
          //       "id": "c1257303-eba1-4999-a59b-ef1f2d6e9c74"
          //     },
          //     {
          //       "name": "TBP-109-5",
          //       "id": "c98aed24-9eca-4d82-ac2d-8b5b074ac4ea"
          //     },
          //     {
          //       "name": "TBP-109-3",
          //       "id": "ce1ccf2f-c7cf-41f5-8021-123e8f893538"
          //     },
          //     {
          //       "name": "TBP-109-4-C",
          //       "id": "daf8352d-5cb6-43c6-8488-f93d4a6c9deb"
          //     }
          //   ],
          //   "reinforcements": [],
          //   "id": "66a518a2-0078-427e-9e77-53ae5545125a"
          // },
          // {
          //   "name": "Escoas entre a Cav.106 & 107",
          //   "plates": [
          //     {
          //       "name": "HGP-106-2-1",
          //       "id": "1fef2378-aea5-416b-b668-5d32571efe26"
          //     },
          //     {
          //       "name": "HGP-106-1-1",
          //       "id": "47e27fd9-cdc7-4e93-a055-fd47d8f1cd2e"
          //     },
          //     {
          //       "name": "HGP-106-4-1",
          //       "id": "786c18f4-aa4d-46e7-b300-317906628b64"
          //     },
          //     {
          //       "name": "HGP-106-3-1",
          //       "id": "bc7326e2-5975-4675-b9f9-fe5afecab4c2"
          //     }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "HGS-106-4-1",
          //       "id": "547f4cc2-a3f3-4206-98ce-c5db2bc2f69b"
          //     },
          //     {
          //       "name": "HGS-106-1-1",
          //       "id": "5a6659a0-47ee-4c12-b801-ea225a5c1648"
          //     },
          //     {
          //       "name": "HGS-106-2-1",
          //       "id": "b1c58a74-a52a-40ba-8f8a-2017bfbec118"
          //     },
          //     {
          //       "name": "HGS-106-3-1",
          //       "id": "c6e2aaba-8fac-4998-be02-73a89753c549"
          //     }
          //   ],
          //   "id": "712faa93-8ad1-48ec-9a85-7c83ee62ee4c"
          // },
          // {
          //   "name": "Escoa No.3 da Cav.99",
          //   "plates": [
          //     {
          //       "name": "HGP-99-3-3",
          //       "id": "2f274848-6d15-44c6-a6b4-ebecb36fe9d5"
          //     },
          //     {
          //       "name": "HGP-99-3-3 - A",
          //       "id": "6016690b-87a9-4bd1-aa3b-962a4eb29df6"
          //     },
          //     {
          //       "name": "HGP-99-3-2 - A",
          //       "id": "92293909-82a3-4a7e-b628-505d63f383ae"
          //     },
          //     {
          //       "name": "HGP-99-3-2",
          //       "id": "a753c245-0728-4bdb-ba21-16462e80ecc1"
          //     },
          //     {
          //       "name": "HGP-99-3-1",
          //       "id": "ce956b9d-a307-4812-9ab9-ae178fbba736"
          //     },
          //     {
          //       "name": "HGP-100-3-2 ?",
          //       "id": "d7d404ed-0816-4602-83f0-10f188c30483"
          //     },
          //     {
          //       "name": "HGP-100-3-1 ?",
          //       "id": "fbd32594-8f49-471f-b5dd-5ab1dc115b60"
          //     }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "HGS-99-3-1",
          //       "id": "29238859-f609-4eeb-a7d0-146ca489f84f"
          //     },
          //     {
          //       "name": "HGS-99-3-4",
          //       "id": "392e0d32-f60d-448e-9129-11380c12103c"
          //     },
          //     {
          //       "name": "HGS-100-3-2",
          //       "id": "6ad32c75-389f-4d94-a314-451b2b904dca"
          //     },
          //     {
          //       "name": "HGS-100-3-1",
          //       "id": "adabf144-187d-4f5f-a06b-b156c33e9018"
          //     },
          //     {
          //       "name": "HGS-99-3-2",
          //       "id": "e6a68387-5e30-452a-82d0-8dc17a7fa5c1"
          //     },
          //     {
          //       "name": "HGS-99-3-3",
          //       "id": "eb0479e6-c0c2-49a9-9807-68e3297c191b"
          //     }
          //   ],
          //   "id": "7f581cbe-b775-40ee-b9a0-45997c196fa0"
          // },
          // {
          //   "name": "Escoa No.1 da Cav.99",
          //   "plates": [
          //     {
          //       "name": "HGP-99-1-3",
          //       "id": "134320e2-6c94-4e87-8b89-001c19304dfc"
          //     },
          //     {
          //       "name": "HGP-100-1-1 ?",
          //       "id": "3ce14570-1df3-4d78-9baa-13ff72c7b8b4"
          //     },
          //     {
          //       "name": "HGP-100-1-4",
          //       "id": "6d548217-059c-4ce2-a281-dfbb018300bf"
          //     },
          //     {
          //       "name": "HGP-100-1-3",
          //       "id": "7fda2427-a0ca-4610-8868-d29684b271e3"
          //     },
          //     {
          //       "name": "HGP-99-1-2 - A",
          //       "id": "bd5a3d30-98c0-42a8-b2fd-ee11318de98a"
          //     },
          //     {
          //       "name": "HGP-100-1-2",
          //       "id": "d64c1d3c-7d30-439b-b90f-f9c5c5d73fe7"
          //     },
          //     {
          //       "name": "HGP-99-1-3 - A",
          //       "id": "d9a8d283-9044-4f7c-b214-4c72ca337f7c"
          //     },
          //     {
          //       "name": "HGP-99-1-1",
          //       "id": "f04ff72d-3e97-48df-a1c0-8c6cac31e2d6"
          //     },
          //     {
          //       "name": "HGP-99-1-2",
          //       "id": "f5394240-d210-453e-a138-6340827fbab6"
          //     }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "HGS-99-1-3",
          //       "id": "417c8705-0a4e-4e7a-90ae-5b8120b79e6f"
          //     },
          //     {
          //       "name": "HGS-100-1-1",
          //       "id": "511c0ed8-141f-4b97-bce6-423dad370c33"
          //     },
          //     {
          //       "name": "HGS-99-1-4",
          //       "id": "9ecd3eb5-b013-44e8-999f-514a771ab0f2"
          //     },
          //     {
          //       "name": "HGS-100-1-3",
          //       "id": "a45faa9a-729e-4b60-8883-d177ef2ebf85"
          //     },
          //     {
          //       "name": "HGS-100-1-2 ?",
          //       "id": "b690cb38-439d-4de8-b5d7-dfa6824686cd"
          //     },
          //     {
          //       "name": "HGS-99-1-2",
          //       "id": "c4bf7787-f953-436c-877a-43007a087f70"
          //     },
          //     {
          //       "name": "HGS-99-1-1",
          //       "id": "ce162eae-7483-444f-aadd-f20d170991e8"
          //     },
          //     {
          //       "name": "HGS-100-1-4 ?",
          //       "id": "eb318092-870f-4396-a898-aea47dedd2e8"
          //     }
          //   ],
          //   "id": "844f3fdb-1aa2-4c74-9516-41f56d5939c3"
          // },
          // {
          //   "name": "Antepara Transversal da Cv.99",
          //   "plates": [
          //     {
          //       "name": "TBP-99-25",
          //       "id": "0c2cf37e-e298-4be6-98a2-2ab5750089d3"
          //     },
          //     {
          //       "name": "TBP-99-21",
          //       "id": "104e85a3-4e42-4e24-8869-32d1f08a188f"
          //     },
          //     {
          //       "name": "TBP-99-15",
          //       "id": "1afdf678-019c-4eb8-a163-0c33d7a8d2d6"
          //     },
          //     {
          //       "name": "TBP-99-10",
          //       "id": "1b97ebc9-a0c5-4f4a-919f-059664d578ad"
          //     },
          //     {
          //       "name": "TBP-99-24",
          //       "id": "2dfdb165-f004-428e-ba66-2d7aacf5a38f"
          //     },
          //     {
          //       "name": "TBP-99-3",
          //       "id": "3a97383b-126a-413a-966b-e4e5cf4aace4"
          //     },
          //     {
          //       "name": "TBP-99-23",
          //       "id": "5c9560e1-15e2-4037-980f-213b6f4af7d9"
          //     },
          //     {
          //       "name": "TBP-99-18",
          //       "id": "62095a0b-eec8-48b4-ac4b-e0360c7026b5"
          //     },
          //     {
          //       "name": "TBP-99-2",
          //       "id": "733818c0-ee4d-4440-aafa-2f5fd4d8e0b6"
          //     },
          //     {
          //       "name": "TBP-99-1",
          //       "id": "882f9158-404b-43de-a7b2-82e56dc726f8"
          //     },
          //     {
          //       "name": "TBP-99-4  ?",
          //       "id": "8fb2d601-21fd-4fb6-84f2-ac68eb871e27"
          //     },
          //     {
          //       "name": "TBP-99-20",
          //       "id": "93adc4b6-f849-4208-ba2e-3ee60302694e"
          //     },
          //     {
          //       "name": "TBP-99-5 ?",
          //       "id": "978e2d23-9857-4265-878f-52bc15e39012"
          //     },
          //     {
          //       "name": "TBP-99-11",
          //       "id": "9d947f33-8b3c-4297-93e8-d57c5b181a32"
          //     },
          //     {
          //       "name": "TBP-99-17",
          //       "id": "a008e017-85b1-4fb4-8406-f87f63487f75"
          //     },
          //     {
          //       "name": "TBP-99-19",
          //       "id": "a18230cf-e22d-4435-8f84-9640e5f59ff7"
          //     },
          //     {
          //       "name": "TBP-99-6",
          //       "id": "ac1f29cd-6ba8-4246-bc8f-be96b12dff1c"
          //     },
          //     {
          //       "name": "TBP-99-7",
          //       "id": "ada411dd-72f3-4318-beb0-979c59fa2aea"
          //     },
          //     {
          //       "name": "TBP-99-9",
          //       "id": "b61809ca-3cc8-4f64-8339-0b0f18e8bcdb"
          //     },
          //     {
          //       "name": "TBP-99-16",
          //       "id": "ba2a4675-689c-4b25-8cc1-f5b803ea15bd"
          //     },
          //     {
          //       "name": "TBP-99-12",
          //       "id": "cb1fe9a5-6686-4ef5-a977-8899ee157b3b"
          //     },
          //     {
          //       "name": "TBP-99-8",
          //       "id": "cf5a22dc-6d32-423b-aa2e-32105a8eeeb3"
          //     },
          //     {
          //       "name": "TBP-99-14",
          //       "id": "cf9da80e-6404-4ad3-8646-332310bac6e1"
          //     },
          //     {
          //       "name": "TBP-99-13 ?",
          //       "id": "d109271b-cbac-40b6-be80-5f469b9fd21b"
          //     },
          //     {
          //       "name": "TBP-99-26",
          //       "id": "d6158784-bf7b-452d-8114-dc2c22dd6e49"
          //     },
          //     {
          //       "name": "TBP-99-22",
          //       "id": "f2ec652e-8748-47d5-8ba2-9a988bb5e289"
          //     }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "TBS-99-16-3 ?",
          //       "id": "013246f4-d5e6-4f0d-bb63-05bae3aa90a9"
          //     },
          //     {
          //       "name": "TBS-99-21-2",
          //       "id": "01c8f6b9-9cd5-4014-8c4b-06f1487b5b59"
          //     },
          //     {
          //       "name": "TBS-99-21-3",
          //       "id": "152ade58-7550-4c42-ad21-0339cdcf0d53"
          //     },
          //     {
          //       "name": "TBS-99-25-2",
          //       "id": "18de5e95-2190-434e-aba6-3ecd802771d8"
          //     },
          //     {
          //       "name": "TBS-99-13-1",
          //       "id": "26009e1c-4118-489f-aed9-c1ee31f61515"
          //     },
          //     {
          //       "name": "TBS-99-34-4",
          //       "id": "2722b559-9def-4c3c-9c53-a9569e44a95d"
          //     },
          //     {
          //       "name": "TBS-99-13-2 ?",
          //       "id": "3b58f3d3-c182-4847-98bc-31085eddfb33"
          //     },
          //     {
          //       "name": "TBS-99-38-4",
          //       "id": "86606f02-7bf9-447f-9001-b62da5eff8c9"
          //     },
          //     {
          //       "name": "TBS-99-24-2",
          //       "id": "92f27d57-527b-4bcd-932e-271b03c1c43d"
          //     },
          //     {
          //       "name": "TBS-99-25-1 ?",
          //       "id": "a13ea7ca-c30b-4edc-91b2-b351c473786e"
          //     },
          //     {
          //       "name": "TBS-99-21-1",
          //       "id": "a31e9671-cbec-45f5-8a5e-235bef506c0b"
          //     },
          //     {
          //       "name": "TBS-99-23-2",
          //       "id": "bfeb69b2-3a85-4416-874b-2b659d8b05e2"
          //     },
          //     {
          //       "name": "TBS-99-13-3",
          //       "id": "c36aabf8-5f9a-4b80-857d-8de91fa9735d"
          //     },
          //     {
          //       "name": "TBS-99-16-1",
          //       "id": "c50a3d43-acf0-456b-bbc6-e925cf5ea581"
          //     },
          //     {
          //       "name": "TBS-99-16-2",
          //       "id": "cdabfea8-5c09-43c7-b809-38eb59409bd3"
          //     },
          //     {
          //       "name": "TBS-99-30-4",
          //       "id": "d8d43caa-c50f-42e1-b1ce-685062596b6d"
          //     },
          //     {
          //       "name": "TBS-99-42-4",
          //       "id": "f1cd08d5-2499-4826-ba40-43855cc728c4"
          //     },
          //     {
          //       "name": "TBS-99-25-3",
          //       "id": "f87deb40-74b4-4886-a376-452594bafacf"
          //     }
          //   ],
          //   "id": "94920e1c-afa7-448e-81af-1a02c416b61a"
          // },
          // {
          //   "name": "Ant. Transv. Diafragma Cv.104",
          //   "plates": [
          //     {
          //       "name": "SBP-104-03",
          //       "id": "0b25f705-15b4-4c54-8c76-8fbf020a6cdb"
          //     },
          //     {
          //       "name": "SBP-104-05",
          //       "id": "3e5b9ac8-1f87-420d-b1ce-3793e41fc7cb"
          //     },
          //     {
          //       "name": "SBP-104-02",
          //       "id": "45c85764-1854-4f6d-96e2-995dd70971ef"
          //     },
          //     {
          //       "name": "SBP-104-03-A",
          //       "id": "5f0533cf-f4e6-4752-8cdb-521cfab45641"
          //     },
          //     {
          //       "name": "SBP-104-07",
          //       "id": "8c9d44fe-15ac-480d-9c9f-aea2bd4a34ab"
          //     },
          //     {
          //       "name": "SBP-104-04 ?",
          //       "id": "a0d550a1-fd37-46d9-ae31-5070fd1c8c7b"
          //     },
          //     {
          //       "name": "SBP-104-01",
          //       "id": "e290a73c-c646-4f89-a85b-e73f8caf8bca"
          //     },
          //     {
          //       "name": "SBP-104-06",
          //       "id": "e7205950-3647-4b00-ac05-2c534588216b"
          //     },
          //     {
          //       "name": "SBP-104-08",
          //       "id": "f25224a3-9f2c-48ea-98f4-3c4c4c2c10cc"
          //     }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "SBS-104-24-1",
          //       "id": "18df2c2e-8dc9-49b3-90fd-fac0928700da"
          //     },
          //     {
          //       "name": "SBS-104-37-4",
          //       "id": "1e9eecb0-61c0-49fa-b076-af6b498f1b31"
          //     },
          //     {
          //       "name": "SBS-104-12-3?",
          //       "id": "21b13fe1-0349-4eec-b97d-2289c70cb75e"
          //     },
          //     {
          //       "name": "SBS-104-33-4",
          //       "id": "279b3b70-f9ba-4aa5-bd54-ff03cc1f216c"
          //     },
          //     {
          //       "name": "SBS-104-22-3",
          //       "id": "5133356c-cfdb-46fd-bf01-f58f2ac6915e"
          //     },
          //     {
          //       "name": "SBS-104-24-3",
          //       "id": "5d9c1242-012a-4fe9-b302-653125e22cea"
          //     },
          //     {
          //       "name": "SBS-104-2 ?",
          //       "id": "762ec322-6c41-4e2e-ba0f-66b078e2fa6b"
          //     },
          //     {
          //       "name": "SBS-104-16-1",
          //       "id": "80cbedb9-de16-41d8-9bba-d1d443dfe0ee"
          //     },
          //     {
          //       "name": "SBS-104-41-4",
          //       "id": "a14f5b5d-b4d6-4afc-a4f5-83adea8c6c4d"
          //     },
          //     {
          //       "name": "SBS-104-12-1",
          //       "id": "b72a484e-1b00-4b08-8c75-4f3048137bcf"
          //     },
          //     {
          //       "name": "SBS-104-20-1",
          //       "id": "e4193788-be99-4c2c-9aa2-cfbd0fca4329"
          //     },
          //     {
          //       "name": "SBS-104-1 ?",
          //       "id": "ed1264ee-7a80-4a0f-a21f-9cb5e895fbec"
          //     }
          //   ],
          //   "id": "94cd8591-a92d-41b2-ba25-b66d0fdfbf6a"
          // },
          // {
          //   "name": "Antepara Longitudinal",
          //   "plates": [
          //     {
          //       "name": "LBP-18 ?",
          //       "id": "0271f584-e074-4678-96d1-57c177841cc4"
          //     },
          //     {
          //       "name": "LBP-4  ?",
          //       "id": "03bf3465-7261-4176-944a-0e16ad0292a3"
          //     },
          //     {
          //       "name": "LBP-36",
          //       "id": "0a907aa4-3f47-4787-9ce7-a789fc7751f9"
          //     },
          //     {
          //       "name": "LBP-26",
          //       "id": "0da9c66b-8d14-48b4-a533-dbd36d6a962e"
          //     },
          //     { "name": "LBP-2", "id": "1912581f-5050-4cc4-bf4b-71e62312c3c1" },
          //     {
          //       "name": "LBP-33",
          //       "id": "1e378184-0335-4e4a-ab65-305192c4af1b"
          //     },
          //     {
          //       "name": "LBP-22",
          //       "id": "25391beb-db47-47e7-bc18-5d10f921120f"
          //     },
          //     {
          //       "name": "LBP-17",
          //       "id": "30df72e8-019b-450b-acf8-7824f8467abe"
          //     },
          //     {
          //       "name": "LBP-27",
          //       "id": "3e4f05c9-7e0a-4d05-b08b-1743904fbe59"
          //     },
          //     {
          //       "name": "LBP-5 ?",
          //       "id": "412ee416-e309-4fc3-b321-7e795a89255e"
          //     },
          //     {
          //       "name": "LBP-28",
          //       "id": "4159d91c-8deb-4fb3-a118-485bb3f8421e"
          //     },
          //     {
          //       "name": "LBP-19",
          //       "id": "46be0d8f-3358-45fc-b8ed-77890a9ffe47"
          //     },
          //     {
          //       "name": "LBP-37",
          //       "id": "4ebbec25-a7c3-4cf9-a8ae-b9ea28f15e9a"
          //     },
          //     {
          //       "name": "LBP-25 ?",
          //       "id": "5791822d-722d-496d-a7ef-cf38746394ec"
          //     },
          //     {
          //       "name": "LBP-12",
          //       "id": "58e08136-29a8-4a5c-9e38-a11ac587c85b"
          //     },
          //     {
          //       "name": "LBP-14",
          //       "id": "5dbe8317-a036-44bc-84c9-8b89a26359b7"
          //     },
          //     {
          //       "name": "LBP-11",
          //       "id": "5f76a844-fced-4f9a-929d-6c1dc6faa037"
          //     },
          //     {
          //       "name": "LBP-21",
          //       "id": "6bd83bf5-bc3b-411a-89f4-8c2a7538cc13"
          //     },
          //     {
          //       "name": "LBP-29",
          //       "id": "6e00b29f-b8dc-4a05-8310-35ac93920670"
          //     },
          //     {
          //       "name": "LBP-34",
          //       "id": "7874dd72-b1a8-4bfd-8254-e07dc21b4959"
          //     },
          //     { "name": "LBP-6", "id": "7e1153e8-6594-438c-a9af-986f235342e9" },
          //     {
          //       "name": "LBP-24 ?",
          //       "id": "7e615e09-a311-4af2-838d-1b2dc48d444a"
          //     },
          //     {
          //       "name": "LBP-31",
          //       "id": "83c168ac-cef2-43c5-bb1b-4c2befbdeb1e"
          //     },
          //     {
          //       "name": "LBP-16",
          //       "id": "8d07c399-f5e4-4061-85ed-754444b7933d"
          //     },
          //     { "name": "LBP-9", "id": "921fd2e4-2b1d-497d-b1f8-2108dca97e5a" },
          //     { "name": "LBP-7", "id": "93c3f9b8-754d-481a-a304-9d693cc58491" },
          //     {
          //       "name": "LBP-38",
          //       "id": "ab01936c-7a4f-4ba8-8cf6-a76d40f53849"
          //     },
          //     {
          //       "name": "LBP-10",
          //       "id": "ac4b687b-8476-4db6-b08e-09c1f3d7d410"
          //     },
          //     { "name": "LBP-8", "id": "b7c03485-d3a2-4b7d-905e-6d564e35af36" },
          //     {
          //       "name": "LBP-15",
          //       "id": "bbfb15cb-2e9a-49d9-895c-807c57bf8473"
          //     },
          //     {
          //       "name": "LBP-30",
          //       "id": "ca4cebe0-58ad-4796-8264-08f5b73c6a0b"
          //     },
          //     {
          //       "name": "LBP-32",
          //       "id": "d65276dc-7aa1-464b-9369-cdf4c6ce1876"
          //     },
          //     {
          //       "name": "LBP-20",
          //       "id": "d820eca5-d34e-4de7-a465-c510b8d5e325"
          //     },
          //     {
          //       "name": "LBP-23",
          //       "id": "d8b26a6c-a42e-44f0-8629-d00715340145"
          //     },
          //     {
          //       "name": "LBP-13 ?",
          //       "id": "db1abb0b-5821-4ea2-b14a-f040ad5b44cb"
          //     },
          //     { "name": "LBP-1", "id": "e18f860a-29f3-4103-957f-fa06c006d76c" },
          //     {
          //       "name": "LBP-35",
          //       "id": "e6faa6e8-6773-42a2-a105-147bccf2de0a"
          //     },
          //     { "name": "LBP-3", "id": "f9aefb72-5abc-4a86-9b6a-20e75ec201ac" }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "LBL-0-7",
          //       "id": "01e44700-3e61-4510-8288-373292ae5843"
          //     },
          //     {
          //       "name": "LBL-16-7",
          //       "id": "0ad3be5f-8b93-48f2-a46e-71459aa7c37e"
          //     },
          //     {
          //       "name": "LBL-16-10",
          //       "id": "17e50e6a-c54e-47d9-8ad3-e7fb32725808"
          //     },
          //     {
          //       "name": "LBL-20-4",
          //       "id": "2b63e0c5-4408-448e-8939-ea222588e53a"
          //     },
          //     {
          //       "name": "LBL-28-4",
          //       "id": "35c57c99-69ec-4dd5-a949-b8ae914cdd95"
          //     },
          //     {
          //       "name": "LBL-24-10",
          //       "id": "385b83db-4ea8-4c91-bcd9-b6ce012fb157"
          //     },
          //     {
          //       "name": "LBL-4-4",
          //       "id": "44051a0f-6251-45d1-9eac-888a16afff38"
          //     },
          //     {
          //       "name": "LBL-28-10",
          //       "id": "46ed96b0-9cc8-4b5c-aa21-9a74cc821010"
          //     },
          //     {
          //       "name": "LBL-16-4",
          //       "id": "515f1a7e-c912-416a-b3c1-f684ce73005d"
          //     },
          //     {
          //       "name": "LBL-16-1",
          //       "id": "52f7ea65-2279-473c-861d-b2dff48a35fa"
          //     },
          //     {
          //       "name": "LBL-12-1",
          //       "id": "7cd6b08f-73ef-4195-bcd0-ab987beefe6d"
          //     },
          //     {
          //       "name": "LBL-24-7",
          //       "id": "8da0a3b1-a6a2-4a3f-876b-5a130783ff34"
          //     },
          //     {
          //       "name": "LBL-8-10",
          //       "id": "92d07ae5-9ce3-4efd-9ac0-0e2774c83d19"
          //     },
          //     {
          //       "name": "LBL-4-7",
          //       "id": "93a66b2a-abdc-49b3-97fe-9d75594b5dca"
          //     },
          //     {
          //       "name": "LBL-20-7",
          //       "id": "95e7152c-7fb7-483c-93c1-ad5357569167"
          //     },
          //     {
          //       "name": "LBL-20-10",
          //       "id": "9f5b332a-9400-457c-89fb-d3350560c1f8"
          //     },
          //     {
          //       "name": "LBL-24-4",
          //       "id": "a36043a8-f21e-4980-b82e-84d003e963e2"
          //     },
          //     {
          //       "name": "LBL-12-4",
          //       "id": "b26fa74e-f534-4365-a637-0cec4d79ef69"
          //     },
          //     {
          //       "name": "LBL-8-1",
          //       "id": "bc68c9e9-35c5-4df7-8f16-bc2a7a76a924"
          //     },
          //     {
          //       "name": "LBL-28-7",
          //       "id": "bd01066c-1533-4a8a-87ad-cfdd0c7882d9"
          //     },
          //     {
          //       "name": "LBL-0-10 ?",
          //       "id": "c738e250-b04f-42cf-9a85-cace5832a45d"
          //     },
          //     {
          //       "name": "LBL-12-10",
          //       "id": "cbea5ae5-ae85-4f47-8305-e4389041e603"
          //     },
          //     {
          //       "name": "LBL-8-7",
          //       "id": "ccaf9a01-9b63-4156-8292-1362875c1cb9"
          //     },
          //     {
          //       "name": "LBL-0-4",
          //       "id": "d99c5a6a-295c-4308-9537-3d02e22c7802"
          //     },
          //     {
          //       "name": "LBL-4-10",
          //       "id": "e240b2e3-a321-401b-8678-4c7e9f1d8b9c"
          //     },
          //     {
          //       "name": "LBL-28-1",
          //       "id": "ecbba1f7-3bb6-4f5e-9f3e-97d705abab36"
          //     },
          //     {
          //       "name": "LBL-0-1",
          //       "id": "f68728a3-dba1-4d52-abdb-051791c62d88"
          //     },
          //     {
          //       "name": "LBL-12-7",
          //       "id": "f73007d6-fc6c-43d4-9726-b422fc473e08"
          //     },
          //     {
          //       "name": "LBL-20-1",
          //       "id": "fbf315c4-105d-4b03-a293-2b47fd2e9727"
          //     },
          //     {
          //       "name": "LBL-8-4",
          //       "id": "0cf19048-ed32-4810-b74e-e1650d499ce0"
          //     },
          //     {
          //       "name": "LBL-4-1",
          //       "id": "64d32b6e-9ead-47cd-ab09-227be203b2ff"
          //     },
          //     {
          //       "name": "LBL-24-1",
          //       "id": "79937efc-9d80-46ab-9862-855f651fffe8"
          //     }
          //   ],
          //   "id": "bc112311-3597-40b1-9d5b-3522a9d153f5"
          // },
          // {
          //   "name": "Fundo",
          //   "plates": [
          //     { "name": "BP-8", "id": "09978615-ca31-4716-a42c-f20c1f5cdd79" },
          //     {
          //       "name": "BP-8-A",
          //       "id": "0c21df2b-85fa-496b-aaec-344cc6c55fd7"
          //     },
          //     { "name": "BP-22", "id": "12526296-83a0-4099-a673-80f70ce882ac" },
          //     { "name": "BP-16", "id": "150938eb-8daa-4170-8428-cfa323224540" },
          //     {
          //       "name": "BP-2-A",
          //       "id": "1f751433-6508-430e-a9d1-3952a7ae21e6"
          //     },
          //     { "name": "BP-17", "id": "317cb66b-b1f9-43d3-93f4-670202fedbfc" },
          //     {
          //       "name": "BP-10-A",
          //       "id": "499c9286-146c-49d3-9410-b45c3b26ba14"
          //     },
          //     { "name": "BP-7", "id": "55e2686c-6b66-485f-9a1f-303ca29bd198" },
          //     { "name": "BP-2", "id": "5bbcd2ab-13d6-4f2b-80bc-bfb925726ab8" },
          //     { "name": "BP-19", "id": "5c6f1502-fd05-4067-b646-bf2e6a02809f" },
          //     { "name": "BP-4", "id": "622a729a-0d44-4b8f-88d8-787ea8f1b74c" },
          //     {
          //       "name": "BP-3-A",
          //       "id": "6e3f2343-2370-4e68-8451-19f54018c201"
          //     },
          //     { "name": "BP-13", "id": "70f75a25-fb81-4d37-8c4f-a5f2d57e8d09" },
          //     { "name": "BP-9", "id": "76a0a6b1-6419-4d87-bbe1-dd42311ff4e3" },
          //     {
          //       "name": "BP-4-A",
          //       "id": "7d65fab5-81e0-4147-9ac3-ae5c3d77fb47"
          //     },
          //     {
          //       "name": "BP-9-A",
          //       "id": "9265231a-48b3-45c7-b527-ec31c57562d9"
          //     },
          //     { "name": "BP-14", "id": "9545c677-f1c0-4ce0-b172-74b0b0f0125d" },
          //     { "name": "BP-1", "id": "9cbb69e5-bafb-40d5-b38d-67af5983d9d8" },
          //     {
          //       "name": "BP-11-A",
          //       "id": "a60724e2-1ac7-4580-b9e0-a00c2b8c2b5c"
          //     },
          //     { "name": "BP-18", "id": "a64ef80d-9833-4e29-8c92-f95a99663f01" },
          //     { "name": "BP-12", "id": "ad1f3aa1-7b85-4809-8e99-a9594ae87bbc" },
          //     {
          //       "name": "BP-1-A",
          //       "id": "b790da4e-9fa0-42ec-b072-1b9863dc945b"
          //     },
          //     { "name": "BP-21", "id": "c79e3688-81e0-48ab-902b-ca79e9510d82" },
          //     { "name": "BP-6", "id": "cd8a8ac9-8c31-4cb3-b60f-dea37d8252e0" },
          //     { "name": "BP-15", "id": "d0251268-e9cb-43ae-b5b1-e28e02ca495f" },
          //     { "name": "BP-5", "id": "d7e87aef-a3a6-4fd2-865e-20e44d93646f" },
          //     { "name": "BP-10", "id": "daa2a2e5-322b-4f29-974e-14740f44adf4" },
          //     { "name": "BP-20", "id": "de4daf28-5267-47ec-b340-91de457b009f" },
          //     { "name": "BP-3", "id": "f46fdc3a-e0cb-49f3-8b0a-6283b64d1f6e" },
          //     { "name": "BP-11", "id": "f8090335-e51b-4542-9130-5b0014192af7" }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "BL-24-4",
          //       "id": "06c28017-f6ba-4feb-8845-04f21391bc1d"
          //     },
          //     {
          //       "name": "BL-30-6",
          //       "id": "06f12f9a-f164-4ddd-a0f7-6a1c244089db"
          //     },
          //     {
          //       "name": "BL-26-8",
          //       "id": "14580dd0-de5a-44f5-a01b-255910a41b8c"
          //     },
          //     {
          //       "name": "BL-30-8",
          //       "id": "1e2a4267-be3e-4692-81de-62e319b8ff33"
          //     },
          //     {
          //       "name": "BL-41-10",
          //       "id": "3d20ee3a-56d4-4467-9b78-5619a8e61a6e"
          //     },
          //     {
          //       "name": "BL-26-6",
          //       "id": "4aae6d96-1a26-44d2-a941-d74caf30c620"
          //     },
          //     {
          //       "name": "BL-24-1",
          //       "id": "5f35f562-9d99-4f48-a937-dfde29ab8389"
          //     },
          //     {
          //       "name": "BL-43-4",
          //       "id": "5f63b9ea-ef21-4b73-bca7-6ecc8830fe81"
          //     },
          //     {
          //       "name": "BL-25-10",
          //       "id": "69fc983e-b067-44fc-847b-ef7d8733aa08"
          //     },
          //     {
          //       "name": "BL-29-10",
          //       "id": "7318e092-42c9-45e6-84ee-5e9e075d8287"
          //     },
          //     {
          //       "name": "BL-35-6",
          //       "id": "77a45165-2d16-47f6-a91c-d7c94eed9845"
          //     },
          //     {
          //       "name": "BL-26-4",
          //       "id": "89c1a436-87f1-4fc4-9db6-8b5567cb6459"
          //     },
          //     {
          //       "name": "BL-43-1",
          //       "id": "89f96554-1930-4772-bb2f-69312df29c35"
          //     },
          //     {
          //       "name": "BL-35-4",
          //       "id": "953bc5e5-d8a4-4b6f-bcc6-89f1ded2e8ce"
          //     },
          //     {
          //       "name": "BL-35-1",
          //       "id": "af214639-4259-4aeb-b4f2-7acf853f5c1c"
          //     },
          //     {
          //       "name": "BL-24-6",
          //       "id": "b60e322b-08f4-4a53-b1e5-6620d40c78ff"
          //     },
          //     {
          //       "name": "BL-39-1",
          //       "id": "d034f14d-ad88-4126-82d6-ce52cf066a38"
          //     },
          //     {
          //       "name": "BL-43-8",
          //       "id": "d1ac0417-34fd-4635-bfc2-3c902619208d"
          //     },
          //     {
          //       "name": "BL-24-8",
          //       "id": "d4cc3275-b593-4678-b2b5-d22d7a78e1e5"
          //     },
          //     {
          //       "name": "BL-43-6",
          //       "id": "d6a1360b-0723-4eb0-bc64-d8e6ce23df81"
          //     },
          //     {
          //       "name": "BL-39-4",
          //       "id": "d8093b36-5a8a-4118-a58c-e7e819264772"
          //     },
          //     {
          //       "name": "BL-39-6",
          //       "id": "deed038c-2a4c-413b-acd3-f4767354e800"
          //     },
          //     {
          //       "name": "BL-39-8",
          //       "id": "e5092ec0-9a6a-41ec-97ab-d988a5ff2a5d"
          //     },
          //     {
          //       "name": "BL-27-1",
          //       "id": "f6c8249b-3200-4956-8cb0-f7303c8013f7"
          //     },
          //     {
          //       "name": "BL-30-4",
          //       "id": "2eac25c9-01a8-4b28-839d-833e81dc912b"
          //     },
          //     {
          //       "name": "BL-31-1",
          //       "id": "4b41ae58-bf07-4243-b6de-0fb2a4c38b3a"
          //     }
          //   ],
          //   "id": "ff5e05b9-b068-42b9-979a-e38e21748f70"
          // },
          // {
          //   "name": "Escoas da Cav.109",
          //   "plates": [
          //     {
          //       "name": "HGP-109-L15-2",
          //       "id": "0262ff37-e344-49dd-b8a5-37c2ba5eb149"
          //     },
          //     {
          //       "name": "HGP-109-L9-5",
          //       "id": "0695b757-1878-4c26-9da4-55abeaf9be44"
          //     },
          //     {
          //       "name": "HGP-109-L21-4",
          //       "id": "0d523e40-f997-49f8-97c7-61fde7b7c267"
          //     },
          //     {
          //       "name": "HGP-109-L15-3",
          //       "id": "187b14af-650f-4ccd-8284-78103e3f9011"
          //     },
          //     {
          //       "name": "HGP-109-L0-5",
          //       "id": "18f78882-c313-45b4-a613-239068e27e12"
          //     },
          //     {
          //       "name": "HGP-109-L21-1",
          //       "id": "1db5c42b-14f5-438f-89a9-3d9cc0a7744c"
          //     },
          //     {
          //       "name": "HGP-109-L15-1",
          //       "id": "20ae3587-a5dc-4c39-815d-7ee3a62dc49d"
          //     },
          //     {
          //       "name": "HGP-109-L0-4",
          //       "id": "2bb9eeb2-e700-4131-910b-6577cf8690d6"
          //     },
          //     {
          //       "name": "HGP-109-L0-3",
          //       "id": "2c9d4c22-71a5-47a0-b753-9f4e3b7466f1"
          //     },
          //     {
          //       "name": "HGP-109-L9-1",
          //       "id": "50d71a32-9d32-49a7-9cc6-23109e0c7d2b"
          //     },
          //     {
          //       "name": "HGP-109-L15-6",
          //       "id": "571f05ce-9bdd-4cb8-85ce-efebc1447c6a"
          //     },
          //     {
          //       "name": "HGP-109-L0-1",
          //       "id": "7588e3a3-18e0-414e-bdc6-0c1d93b58157"
          //     },
          //     {
          //       "name": "HGP-109-L0-4-A",
          //       "id": "76851234-f98d-4c6b-b66c-3eaabfa64d08"
          //     },
          //     {
          //       "name": "HGP-109-L21-5",
          //       "id": "77bc06b4-e9dc-494f-baf5-67339a0e88ea"
          //     },
          //     {
          //       "name": "HGP-109-L9-2",
          //       "id": "7b9b19a5-930e-4501-85af-1b76594ac5a5"
          //     },
          //     {
          //       "name": "HGP-109-L15-5",
          //       "id": "848e22b1-dac1-43b7-a782-378752337046"
          //     },
          //     {
          //       "name": "HGP-109-L21-3",
          //       "id": "937e24f5-73d9-46a0-ac9b-5d0c3bee8ed2"
          //     },
          //     {
          //       "name": "HGP-109-L0-2",
          //       "id": "9483ee0a-515f-488f-9708-6d6b013d72c1"
          //     },
          //     {
          //       "name": "HGP-109-L9-3",
          //       "id": "9819c088-3207-45fd-9271-bd7970263836"
          //     },
          //     {
          //       "name": "HGP-109-L9-4",
          //       "id": "e1904d4e-0363-4e17-a602-e0e8bc09bade"
          //     },
          //     {
          //       "name": "HGP-109-L21-2",
          //       "id": "e4ac14b9-6885-4330-94a5-5e4d838a93d8"
          //     },
          //     {
          //       "name": "HGP-109-L0-6",
          //       "id": "e568792e-85f7-4a5c-b56e-539945a305c3"
          //     },
          //     {
          //       "name": "HGP-109-L15-4",
          //       "id": "f434630e-af85-43be-903e-954991d09d54"
          //     }
          //   ],
          //   "reinforcements": [
          //     {
          //       "name": "HGS-109-L9-1",
          //       "id": "065be033-1c67-43e5-8c92-302043bc6ecf"
          //     },
          //     {
          //       "name": "HGS-109-L15-2",
          //       "id": "068c3eec-d00c-4162-bf94-77782247eabd"
          //     },
          //     {
          //       "name": "HGS-109-L15-5",
          //       "id": "111a6c01-7022-4b42-af0a-419c2d8a333c"
          //     },
          //     {
          //       "name": "HGS-109-L9-2",
          //       "id": "29dfa568-3688-4811-8556-2c64aa77751e"
          //     },
          //     {
          //       "name": "HGS-109-L21-3",
          //       "id": "3864d471-236c-482e-9dee-db4489faf51f"
          //     },
          //     {
          //       "name": "HGS-109-L21-1",
          //       "id": "45778b87-85a2-4b7f-b98f-d8abf141ef6d"
          //     },
          //     {
          //       "name": "HGS-109-L0-7",
          //       "id": "48506b4a-067b-425a-a53e-3b1ebd78823a"
          //     },
          //     {
          //       "name": "HGS-109-L0-3",
          //       "id": "516237af-8144-4049-bd80-a89a45a770be"
          //     },
          //     {
          //       "name": "HGS-109-L21-4",
          //       "id": "5650a92d-4262-451b-a327-6e2a2b3fd5dc"
          //     },
          //     {
          //       "name": "HGS-109-L0-2",
          //       "id": "5b4a3952-d7ef-44e5-88ce-305bd516d088"
          //     },
          //     {
          //       "name": "HGS-109-L15-3",
          //       "id": "70afc169-48fb-48bd-ab6f-fed30296fbe7"
          //     },
          //     {
          //       "name": "HGS-109-L21-2",
          //       "id": "796cb29d-54d9-40cc-a29d-44dfeb160243"
          //     },
          //     {
          //       "name": "HGS-109-L9-4",
          //       "id": "9a09bc84-136d-42bd-a641-0b1796dd8ccf"
          //     },
          //     {
          //       "name": "HGS-109-L9-5",
          //       "id": "9e79bf21-53a6-4b98-9814-94d0a06c1aa2"
          //     },
          //     {
          //       "name": "HGS-109-L15-1",
          //       "id": "a3fd3ca7-7ceb-4bdc-b9e9-254ae85b17e9"
          //     },
          //     {
          //       "name": "HGS-109-L15-4",
          //       "id": "a7036527-5db6-4492-a9e1-48e7213a78ba"
          //     },
          //     {
          //       "name": "HGS-109-L9-3",
          //       "id": "a87a6599-1c17-4ce4-a9b2-a0d2437638c4"
          //     },
          //     {
          //       "name": "HGS-109-L21-5",
          //       "id": "b2a91001-d0f8-44c2-ba13-6320f80bda8c"
          //     },
          //     {
          //       "name": "HGS-109-L0-5",
          //       "id": "d71f65b2-7bea-4def-b714-7968412f8fdb"
          //     },
          //     {
          //       "name": "HGS-109-L0-1",
          //       "id": "d9b4c7a1-1f30-4f71-815d-bada5ee32af3"
          //     },
          //     {
          //       "name": "HGS-109-L0-6",
          //       "id": "f1cb4490-be11-4677-ac99-5d44e73ea82a"
          //     },
          //     {
          //       "name": "HGS-109-L0-4",
          //       "id": "f9f05147-0f71-40d0-8fa0-45469936eda5"
          //     }
          //   ],
          //   "id": "ffffec7b-e169-4a5d-abd2-715bcb2797c0"
          // }
        ],
        "id": "b15661d2-e1b1-42ca-bd86-b620ce374939"
      }
    ],
    "id": "f2b1ae4b-9d37-435e-b566-d15ba51a9c91"
  },
  {
    "name": "P-40",
    "topsideModules": [],
    "hullSpaces": [],
    "id": "219746bc-803c-402f-a0d3-40b9a9bacbcd"
  },
  {
    "name": "P-43",
    "topsideModules": [],
    "hullSpaces": [],
    "id": "ca4e5d77-46ec-4921-9617-5114919d6535"
  },
  {
    "name": "P-48",
    "topsideModules": [],
    "hullSpaces": [],
    "id": "4cc0b3a0-af3e-4881-9cef-f1bfe6aad78a"
  },
  {
    "name": "P-51",
    "topsideModules": [],
    "hullSpaces": [],
    "id": "343970f6-a73e-4ca6-b169-82d92ce26c62"
  },
  {
    "name": "P-53",
    "topsideModules": [],
    "hullSpaces": [],
    "id": "6eeb87e9-bab6-4acc-96ca-87f5c44daeb4"
  },
  {
    "name": "P-56",
    "topsideModules": [],
    "hullSpaces": [],
    "id": "c3fe1ff4-e1f0-4271-9610-02f44e4c991f"
  }
];

const portalModelsTree = [
  {
      "label": "P-74",
      "data": {
          "tenantId": "UN-BUZ",
          "name": "P-74",
          "description": null,
          "imagePath": "images/plant/P-74.jpg",
          "latitude": -24.6487,
          "longitude": -42.5147,
          "un": null,
          "type": {
              "id": 0,
              "name": "FPSO"
          },
          "id": "c2710611-a76b-40db-8eb2-08dc3c795e33"
      },
      "icon": null,
      "expandedIcon": null,
      "collapsedIcon": null,
      "leaf": false,
      "type": "Plant",
      "style": null,
      "styleClass": null,
      "draggable": false,
      "droppable": false,
      "selectable": true,
      "key": "c2710611-a76b-40db-8eb2-08dc3c795e33",
      "expanded": true,
      "children": [
          {
              "label": "Mapa de Corrosão",
              "data": {
                  "name": "Mapa de Corrosão",
                  "id": "3e9737fd-a178-4560-b699-08dc3c795e3f"
              },
              "icon": null,
              "expandedIcon": "far fa-folder-open",
              "collapsedIcon": "far fa-folder",
              "leaf": false,
              "type": "ModelFolderNormal",
              "style": null,
              "styleClass": null,
              "draggable": false,
              "droppable": false,
              "selectable": true,
              "key": "3e9737fd-a178-4560-b699-08dc3c795e3f",
              "expanded": false,
              "children": [
                  {
                      "label": "P-74 - Corrosão - 2020",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "P-74 - Corrosão - 2020",
                          "description": "Corrosão - 2020 da P-74",
                          "code": "P-74_CORROSAO_2020",
                          "imageVirtualPath": null,
                          "tagsSummary": null,
                          "files": [
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "P-74_Mapa_de_Corrosao_2020.zip",
                                  "date": "2024-03-04T18:31:55.1425664",
                                  "projectDate": "2024-03-04T18:31:55.1425664",
                                  "size": "66.133 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/P-74_Mapa_de_Corrosao_2020.zip",
                                  "viewer": {
                                      "name": "Environ",
                                      "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                  },
                                  "id": "8c214607-de48-4c62-4626-08dc3c795e5a"
                              }
                          ],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "a4186188-5496-474c-ab7c-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "a4186188-5496-474c-ab7c-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "P-74 - Corrosão - 2021",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "P-74 - Corrosão - 2021",
                          "description": "Corrosão - 2021 da P-74",
                          "code": "P-74_CORROSAO_2021",
                          "imageVirtualPath": null,
                          "tagsSummary": null,
                          "files": [
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "P-74_Mapa_de_Corrosao_2021.zip",
                                  "date": "2024-03-04T18:31:55.1701922",
                                  "projectDate": "2024-03-04T18:31:55.1701924",
                                  "size": "76.623 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/P-74_Mapa_de_Corrosao_2021.zip",
                                  "viewer": {
                                      "name": "Environ",
                                      "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                  },
                                  "id": "f37cfc88-cb04-4f7a-4627-08dc3c795e5a"
                              }
                          ],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "630b36e7-ef06-45be-ab7d-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "630b36e7-ef06-45be-ab7d-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  }
              ]
          },
          {
              "label": "P-74-Completa",
              "data": {
                  "name": "P-74-Completa",
                  "id": "cdf2bf47-f236-4a4e-b69a-08dc3c795e3f"
              },
              "icon": null,
              "expandedIcon": "far fa-folder-open",
              "collapsedIcon": "far fa-folder",
              "leaf": false,
              "type": "ModelFolderNormal",
              "style": null,
              "styleClass": null,
              "draggable": false,
              "droppable": false,
              "selectable": true,
              "key": "cdf2bf47-f236-4a4e-b69a-08dc3c795e3f",
              "expanded": false,
              "children": [
                  {
                      "label": "HULL",
                      "data": {
                          "name": "HULL",
                          "id": "5f41aff9-178d-4a1f-b69b-08dc3c795e3f"
                      },
                      "icon": null,
                      "expandedIcon": "far fa-folder-open",
                      "collapsedIcon": "far fa-folder",
                      "leaf": false,
                      "type": "ModelFolderNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "5f41aff9-178d-4a1f-b69b-08dc3c795e3f",
                      "expanded": false,
                      "children": [
                          {
                              "label": "Accommodation Module",
                              "data": {
                                  "tenantId": "UN-BUZ",
                                  "name": "Accommodation Module",
                                  "description": "Accommodation Module da P-74",
                                  "code": "P-74_Acc_Module",
                                  "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_Acc_Module.png",
                                  "tagsSummary": null,
                                  "files": [
                                      {
                                          "tenantId": "UN-BUZ",
                                          "name": "P-74_Accommodation_Module.env",
                                          "date": "2024-03-04T18:31:55.1705785",
                                          "projectDate": "2024-03-04T18:31:55.1705786",
                                          "size": "306.007 MB",
                                          "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/P-74_Accommodation_Module.env",
                                          "viewer": {
                                              "name": "Environ",
                                              "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                          },
                                          "id": "450512e3-331a-4950-4630-08dc3c795e5a"
                                      },
                                      {
                                          "tenantId": "UN-BUZ",
                                          "name": "P-74_Accommodation_Module.nwd",
                                          "date": "2024-03-04T18:31:55.1706154",
                                          "projectDate": "2024-03-04T18:31:55.1706155",
                                          "size": "306.007 MB",
                                          "virtualPath": "/UN-BUZ/MODELS/P-74/Navisworks/P-74_Accommodation_Module.nwd",
                                          "viewer": {
                                              "name": "Navisworks",
                                              "id": "8d0460d8-6791-447c-401a-08dc3c795e52"
                                          },
                                          "id": "983382c9-eac1-4294-4631-08dc3c795e5a"
                                      },
                                      {
                                          "tenantId": "UN-BUZ",
                                          "name": "P-74_Accommodation_Module.zip",
                                          "date": "2024-03-04T18:31:55.1706516",
                                          "projectDate": "2024-03-04T18:31:55.1706517",
                                          "size": "306.007 MB",
                                          "virtualPath": "/UN-BUZ/MODELS/P-74/SmartPlantReview/P-74_Accommodation_Module.zip",
                                          "viewer": {
                                              "name": "SmartPlantReview",
                                              "id": "f5b21efb-8cbf-4534-4017-08dc3c795e52"
                                          },
                                          "id": "750fb767-deda-48cf-4632-08dc3c795e5a"
                                      }
                                  ],
                                  "pointClouds": [],
                                  "subType": 0,
                                  "converterAssociation": false,
                                  "jobViewers": [],
                                  "id": "25e45b4e-da91-4b0c-ab96-08dc3c795e42"
                              },
                              "icon": null,
                              "expandedIcon": null,
                              "collapsedIcon": null,
                              "leaf": true,
                              "type": "ModelNormal",
                              "style": null,
                              "styleClass": null,
                              "draggable": false,
                              "droppable": false,
                              "selectable": true,
                              "key": "25e45b4e-da91-4b0c-ab96-08dc3c795e42",
                              "expanded": false,
                              "children": null
                          },
                          {
                              "label": "AFT Region",
                              "data": {
                                  "tenantId": "UN-BUZ",
                                  "name": "AFT Region",
                                  "description": "AFT Region da P-74",
                                  "code": "P74_AFT",
                                  "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_AFT.png",
                                  "tagsSummary": null,
                                  "files": [
                                      {
                                          "tenantId": "UN-BUZ",
                                          "name": "P-74_AFT.env",
                                          "date": "2024-03-04T18:31:55.1706861",
                                          "projectDate": "2024-03-04T18:31:55.1706861",
                                          "size": "81.894 MB",
                                          "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/P-74_AFT.env",
                                          "viewer": {
                                              "name": "Environ",
                                              "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                          },
                                          "id": "7a9f6435-3d14-437b-4633-08dc3c795e5a"
                                      },
                                      {
                                          "tenantId": "UN-BUZ",
                                          "name": "P-74_AFT.nwd",
                                          "date": "2024-03-04T18:31:55.1707248",
                                          "projectDate": "2024-03-04T18:31:55.1707249",
                                          "size": "81.894 MB",
                                          "virtualPath": "/UN-BUZ/MODELS/P-74/Navisworks/P-74_AFT.nwd",
                                          "viewer": {
                                              "name": "Navisworks",
                                              "id": "8d0460d8-6791-447c-401a-08dc3c795e52"
                                          },
                                          "id": "9cb0b5ee-0a5b-4ae7-4634-08dc3c795e5a"
                                      },
                                      {
                                          "tenantId": "UN-BUZ",
                                          "name": "P-74_AFT.zip",
                                          "date": "2024-03-04T18:31:55.1707591",
                                          "projectDate": "2024-03-04T18:31:55.1707591",
                                          "size": "81.894 MB",
                                          "virtualPath": "/UN-BUZ/MODELS/P-74/SmartPlantReview/P-74_AFT.zip",
                                          "viewer": {
                                              "name": "SmartPlantReview",
                                              "id": "f5b21efb-8cbf-4534-4017-08dc3c795e52"
                                          },
                                          "id": "f89b57fe-cc8c-43cb-4635-08dc3c795e5a"
                                      }
                                  ],
                                  "pointClouds": [],
                                  "subType": 0,
                                  "converterAssociation": false,
                                  "jobViewers": [],
                                  "id": "086c204c-5432-4b52-ab97-08dc3c795e42"
                              },
                              "icon": null,
                              "expandedIcon": null,
                              "collapsedIcon": null,
                              "leaf": true,
                              "type": "ModelNormal",
                              "style": null,
                              "styleClass": null,
                              "draggable": false,
                              "droppable": false,
                              "selectable": true,
                              "key": "086c204c-5432-4b52-ab97-08dc3c795e42",
                              "expanded": false,
                              "children": null
                          },
                          {
                              "label": "Bow Region",
                              "data": {
                                  "tenantId": "UN-BUZ",
                                  "name": "Bow Region",
                                  "description": "Bow Region da P-74",
                                  "code": "P74_Bow_Region",
                                  "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_Bow_Region.png",
                                  "tagsSummary": null,
                                  "files": [
                                      {
                                          "tenantId": "UN-BUZ",
                                          "name": "P-74_Bow.env",
                                          "date": "2024-03-04T18:31:55.1707941",
                                          "projectDate": "2024-03-04T18:31:55.1707942",
                                          "size": "38.024 MB",
                                          "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/P-74_Bow.env",
                                          "viewer": {
                                              "name": "Environ",
                                              "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                          },
                                          "id": "422e44ca-0af9-4c9d-4636-08dc3c795e5a"
                                      },
                                      {
                                          "tenantId": "UN-BUZ",
                                          "name": "P-74_Bow.nwd",
                                          "date": "2024-03-04T18:31:55.1708281",
                                          "projectDate": "2024-03-04T18:31:55.1708281",
                                          "size": "38.024 MB",
                                          "virtualPath": "/UN-BUZ/MODELS/P-74/Navisworks/P-74_Bow.nwd",
                                          "viewer": {
                                              "name": "Navisworks",
                                              "id": "8d0460d8-6791-447c-401a-08dc3c795e52"
                                          },
                                          "id": "36b6527b-86a0-4e6f-4637-08dc3c795e5a"
                                      },
                                      {
                                          "tenantId": "UN-BUZ",
                                          "name": "P-74_Bow.zip",
                                          "date": "2024-03-04T18:31:55.1708639",
                                          "projectDate": "2024-03-04T18:31:55.170864",
                                          "size": "38.024 MB",
                                          "virtualPath": "/UN-BUZ/MODELS/P-74/SmartPlantReview/P-74_Bow.zip",
                                          "viewer": {
                                              "name": "SmartPlantReview",
                                              "id": "f5b21efb-8cbf-4534-4017-08dc3c795e52"
                                          },
                                          "id": "539621fa-7d45-4c36-4638-08dc3c795e5a"
                                      }
                                  ],
                                  "pointClouds": [],
                                  "subType": 0,
                                  "converterAssociation": false,
                                  "jobViewers": [],
                                  "id": "f46f04ab-1e02-4989-ab98-08dc3c795e42"
                              },
                              "icon": null,
                              "expandedIcon": null,
                              "collapsedIcon": null,
                              "leaf": true,
                              "type": "ModelNormal",
                              "style": null,
                              "styleClass": null,
                              "draggable": false,
                              "droppable": false,
                              "selectable": true,
                              "key": "f46f04ab-1e02-4989-ab98-08dc3c795e42",
                              "expanded": false,
                              "children": null
                          }
                      ]
                  },
                  {
                      "label": "M000 - Main Deck",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M000 - Main Deck",
                          "description": "Main Deck da P-74",
                          "code": "P-74_M000",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": {
                              "date": "2024-03-04T18:31:55.091686Z",
                              "number": 4
                          },
                          "files": [
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "P-74_M00_Main_Deck.env",
                                  "date": "2024-03-04T18:31:55.1702688",
                                  "projectDate": "2024-03-04T18:31:55.1702688",
                                  "size": "43.244 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/P-74_M00_Main_Deck.env",
                                  "viewer": {
                                      "name": "Environ",
                                      "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                  },
                                  "id": "2bae3ed7-00fd-4793-4628-08dc3c795e5a"
                              },
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "P-74_M00_Main_Deck.nwd",
                                  "date": "2024-03-04T18:31:55.1703121",
                                  "projectDate": "2024-03-04T18:31:55.1703121",
                                  "size": "43.244 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Navisworks/P-74_M00_Main_Deck.nwd",
                                  "viewer": {
                                      "name": "Navisworks",
                                      "id": "8d0460d8-6791-447c-401a-08dc3c795e52"
                                  },
                                  "id": "563ec250-8c99-4cb3-4629-08dc3c795e5a"
                              }
                          ],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "45c4bc17-039b-463f-ab7e-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "45c4bc17-039b-463f-ab7e-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M001 - Flare System",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M001 - Flare System",
                          "description": "Flare System da P-74",
                          "code": "P-74_M001",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M01.png",
                          "tagsSummary": {
                              "date": "2024-03-04T18:31:55.0918626Z",
                              "number": 4
                          },
                          "files": [
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "P-74_M01_Flare_System.env",
                                  "date": "2024-03-04T18:31:55.1703511",
                                  "projectDate": "2024-03-04T18:31:55.1703512",
                                  "size": "33.708 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/P-74_M01_Flare_System.env",
                                  "viewer": {
                                      "name": "Environ",
                                      "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                  },
                                  "id": "8232dbdc-4f2b-4891-462a-08dc3c795e5a"
                              },
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "P-74_M01_Flare_System.nwd",
                                  "date": "2024-03-04T18:31:55.1703879",
                                  "projectDate": "2024-03-04T18:31:55.1703879",
                                  "size": "33.708 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Navisworks/P-74_M01_Flare_System.nwd",
                                  "viewer": {
                                      "name": "Navisworks",
                                      "id": "8d0460d8-6791-447c-401a-08dc3c795e52"
                                  },
                                  "id": "c0679f6b-19e0-44c9-462b-08dc3c795e5a"
                              }
                          ],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "ee1f1ccc-fe99-4398-ab7f-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "ee1f1ccc-fe99-4398-ab7f-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M002 - CO2 Compressor",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M002 - CO2 Compressor",
                          "description": "CO2 Compressor da P-74",
                          "code": "P-74_M002",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M02.png",
                          "tagsSummary": {
                              "date": "2024-03-04T18:31:55.0918633Z",
                              "number": 4
                          },
                          "files": [
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "P-74_M02_CO2_Compression.env",
                                  "date": "2024-03-04T18:31:55.1704234",
                                  "projectDate": "2024-03-04T18:31:55.1704235",
                                  "size": "81.392 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/P-74_M02_CO2_Compression.env",
                                  "viewer": {
                                      "name": "Environ",
                                      "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                  },
                                  "id": "1a04c3ed-9adc-4f36-462c-08dc3c795e5a"
                              },
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "P-74_M02_CO2_Compression.nwd",
                                  "date": "2024-03-04T18:31:55.170458",
                                  "projectDate": "2024-03-04T18:31:55.1704581",
                                  "size": "81.392 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Navisworks/P-74_M02_CO2_Compression.nwd",
                                  "viewer": {
                                      "name": "Navisworks",
                                      "id": "8d0460d8-6791-447c-401a-08dc3c795e52"
                                  },
                                  "id": "b3e416eb-4155-4fba-462d-08dc3c795e5a"
                              }
                          ],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "a3a860a2-04ad-4d52-ab80-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "a3a860a2-04ad-4d52-ab80-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M003 - Exportation Gas Compression",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M003 - Exportation Gas Compression",
                          "description": "Exportation Gas Compression da P74",
                          "code": "P-74_M003",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M03.png",
                          "tagsSummary": {
                              "date": "2024-03-04T18:31:55.0918638Z",
                              "number": 4
                          },
                          "files": [
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "P-74_M03_Exportation_Gas_Compression.env",
                                  "date": "2024-03-04T18:31:55.1704935",
                                  "projectDate": "2024-03-04T18:31:55.1704935",
                                  "size": "47.059 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/P-74_M03_Exportation_Gas_Compression.env",
                                  "viewer": {
                                      "name": "Environ",
                                      "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                  },
                                  "id": "bcfd6ca2-e713-49eb-462e-08dc3c795e5a"
                              },
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "P-74_M03_Exportation_Gas_Compression.nwd",
                                  "date": "2024-03-04T18:31:55.1705284",
                                  "projectDate": "2024-03-04T18:31:55.1705284",
                                  "size": "47.059 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Navisworks/P-74_M03_Exportation_Gas_Compression.nwd",
                                  "viewer": {
                                      "name": "Navisworks",
                                      "id": "8d0460d8-6791-447c-401a-08dc3c795e52"
                                  },
                                  "id": "887870de-a6d4-46a2-462f-08dc3c795e5a"
                              }
                          ],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "f2bc98dc-1d81-4332-ab81-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "f2bc98dc-1d81-4332-ab81-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M004 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M004 - Overflow Busca",
                          "description": "Overflow na busca 004",
                          "code": "P-74_M004",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "3008472a-af53-4492-ab82-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "3008472a-af53-4492-ab82-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M005 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M005 - Overflow Busca",
                          "description": "Overflow na busca 005",
                          "code": "P-74_M005",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "e4872783-24e7-4f5e-ab83-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "e4872783-24e7-4f5e-ab83-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M006 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M006 - Overflow Busca",
                          "description": "Overflow na busca 006",
                          "code": "P-74_M006",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "315732bb-f4ff-46f4-ab84-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "315732bb-f4ff-46f4-ab84-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M007 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M007 - Overflow Busca",
                          "description": "Overflow na busca 007",
                          "code": "P-74_M007",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "11f4ba8f-77f4-413a-ab85-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "11f4ba8f-77f4-413a-ab85-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M008 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M008 - Overflow Busca",
                          "description": "Overflow na busca 008",
                          "code": "P-74_M008",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "feacb4ef-2bc2-4ba2-ab86-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "feacb4ef-2bc2-4ba2-ab86-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M009 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M009 - Overflow Busca",
                          "description": "Overflow na busca 009",
                          "code": "P-74_M009",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "279ccfe1-858f-456a-ab87-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "279ccfe1-858f-456a-ab87-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M010 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M010 - Overflow Busca",
                          "description": "Overflow na busca 010",
                          "code": "P-74_M010",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "cdd601ce-386c-4778-ab88-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "cdd601ce-386c-4778-ab88-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M011 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M011 - Overflow Busca",
                          "description": "Overflow na busca 011",
                          "code": "P-74_M011",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "cc85db34-bd1d-4942-ab89-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "cc85db34-bd1d-4942-ab89-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M012 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M012 - Overflow Busca",
                          "description": "Overflow na busca 012",
                          "code": "P-74_M012",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "4e8a9fe5-1e83-4327-ab8a-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "4e8a9fe5-1e83-4327-ab8a-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M013 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M013 - Overflow Busca",
                          "description": "Overflow na busca 013",
                          "code": "P-74_M013",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "6ed57938-9c0c-47ce-ab8b-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "6ed57938-9c0c-47ce-ab8b-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M014 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M014 - Overflow Busca",
                          "description": "Overflow na busca 014",
                          "code": "P-74_M014",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "27abcd7e-2896-4960-ab8c-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "27abcd7e-2896-4960-ab8c-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M015 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M015 - Overflow Busca",
                          "description": "Overflow na busca 015",
                          "code": "P-74_M015",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "973097a7-fded-44c7-ab8d-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "973097a7-fded-44c7-ab8d-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M016 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M016 - Overflow Busca",
                          "description": "Overflow na busca 016",
                          "code": "P-74_M016",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "c979d53b-592a-48ed-ab8e-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "c979d53b-592a-48ed-ab8e-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M017 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M017 - Overflow Busca",
                          "description": "Overflow na busca 017",
                          "code": "P-74_M017",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "bf1dbe14-fbad-4492-ab8f-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "bf1dbe14-fbad-4492-ab8f-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M018 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M018 - Overflow Busca",
                          "description": "Overflow na busca 018",
                          "code": "P-74_M018",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "4b85fbcb-69dc-4a4d-ab90-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "4b85fbcb-69dc-4a4d-ab90-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M019 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M019 - Overflow Busca",
                          "description": "Overflow na busca 019",
                          "code": "P-74_M019",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "ddc7fb91-9010-40a3-ab91-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "ddc7fb91-9010-40a3-ab91-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M020 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M020 - Overflow Busca",
                          "description": "Overflow na busca 020",
                          "code": "P-74_M020",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "96f698e1-1324-4355-ab92-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "96f698e1-1324-4355-ab92-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M021 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M021 - Overflow Busca",
                          "description": "Overflow na busca 021",
                          "code": "P-74_M021",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "89c24a06-b6de-4ec1-ab93-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "89c24a06-b6de-4ec1-ab93-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M022 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M022 - Overflow Busca",
                          "description": "Overflow na busca 022",
                          "code": "P-74_M022",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "3ba83eef-a0f0-4bd2-ab94-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "3ba83eef-a0f0-4bd2-ab94-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "M023 - Overflow Busca",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "M023 - Overflow Busca",
                          "description": "Overflow na busca 023",
                          "code": "P-74_M023",
                          "imageVirtualPath": "/UN-BUZ/IMAGES/P-74/P-74_M00.png",
                          "tagsSummary": null,
                          "files": [],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "64293f50-7964-4f2b-ab95-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "64293f50-7964-4f2b-ab95-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  }
              ]
          },
          {
              "label": "Pré-delineamento de Pintura",
              "data": {
                  "name": "Pré-delineamento de Pintura",
                  "id": "500e0d04-2e50-41ba-b69c-08dc3c795e3f"
              },
              "icon": null,
              "expandedIcon": "far fa-folder-open",
              "collapsedIcon": "far fa-folder",
              "leaf": false,
              "type": "ModelFolderNormal",
              "style": null,
              "styleClass": null,
              "draggable": false,
              "droppable": false,
              "selectable": true,
              "key": "500e0d04-2e50-41ba-b69c-08dc3c795e3f",
              "expanded": false,
              "children": [
                  {
                      "label": "Pré-delineamento de Pintura",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "Pré-delineamento de Pintura",
                          "description": "Pré-delineamento de Pintura da P-74",
                          "code": "P-74_DELINEAMENTO",
                          "imageVirtualPath": null,
                          "tagsSummary": null,
                          "files": [
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "Delineamento_P74.zip",
                                  "date": "2024-03-04T18:31:55.1708978",
                                  "projectDate": "2024-03-04T18:31:55.1708978",
                                  "size": "210.64 MB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/P-Delineamento_P74.zip",
                                  "viewer": {
                                      "name": "Environ",
                                      "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                  },
                                  "id": "b9798520-088c-4f11-4639-08dc3c795e5a"
                              }
                          ],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "eb44efe3-1735-4ebd-ab99-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "eb44efe3-1735-4ebd-ab99-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  }
              ]
          },
          {
              "label": "SEPS",
              "data": {
                  "name": "SEPS",
                  "id": "9d9f4759-8d2f-4dcd-b69d-08dc3c795e3f"
              },
              "icon": null,
              "expandedIcon": "far fa-folder-open",
              "collapsedIcon": "far fa-folder",
              "leaf": false,
              "type": "ModelFolderNormal",
              "style": null,
              "styleClass": null,
              "draggable": false,
              "droppable": false,
              "selectable": true,
              "key": "9d9f4759-8d2f-4dcd-b69d-08dc3c795e3f",
              "expanded": false,
              "children": [
                  {
                      "label": "3010.0F-2018-0029",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "3010.0F-2018-0029",
                          "description": "SEP 3010.0F-2018-0029 da P-74",
                          "code": "P-74_SEP_3010.0F-2018-0029",
                          "imageVirtualPath": null,
                          "tagsSummary": null,
                          "files": [
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "3010.0F-2018-0029.env",
                                  "date": "2024-03-04T18:31:55.1709336",
                                  "projectDate": "2024-03-04T18:31:55.1709336",
                                  "size": "282.555 KB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/3010.0F-2018-0029.env",
                                  "viewer": {
                                      "name": "Environ",
                                      "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                  },
                                  "id": "f6113c5d-7743-4083-463a-08dc3c795e5a"
                              },
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "3010.0F-2018-0029.nwd",
                                  "date": "2024-03-04T18:31:55.1709675",
                                  "projectDate": "2024-03-04T18:31:55.1709676",
                                  "size": "282.555 KB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Navisworks/3010.0F-2018-0029.nwd",
                                  "viewer": {
                                      "name": "Navisworks",
                                      "id": "8d0460d8-6791-447c-401a-08dc3c795e52"
                                  },
                                  "id": "67a3dc14-35de-4cf7-463b-08dc3c795e5a"
                              },
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "3010.0F-2018-0029.zip",
                                  "date": "2024-03-04T18:31:55.1710022",
                                  "projectDate": "2024-03-04T18:31:55.1710022",
                                  "size": "282.555 KB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/SmartPlantReview/P-74_Mapa_de_Corrosao_2021.zip",
                                  "viewer": {
                                      "name": "SmartPlantReview",
                                      "id": "f5b21efb-8cbf-4534-4017-08dc3c795e52"
                                  },
                                  "id": "542c6f0c-92d3-4188-463c-08dc3c795e5a"
                              }
                          ],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "8fbd06e0-9165-468b-ab9a-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "8fbd06e0-9165-468b-ab9a-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  },
                  {
                      "label": "3010.0F-2018-0244",
                      "data": {
                          "tenantId": "UN-BUZ",
                          "name": "3010.0F-2018-0244",
                          "description": "SEP 3010.0F-2018-0244 da P-74",
                          "code": "P-74_SEP_3010.0F-2018-0244",
                          "imageVirtualPath": null,
                          "tagsSummary": null,
                          "files": [
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "3010.0F-2018-0244.env",
                                  "date": "2024-03-04T18:31:55.1710369",
                                  "projectDate": "2024-03-04T18:31:55.171037",
                                  "size": "12.643 KB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Environ/3010.0F-2018-0244.envp",
                                  "viewer": {
                                      "name": "Environ",
                                      "id": "73bd5c34-fd2f-4075-4018-08dc3c795e52"
                                  },
                                  "id": "78ea5d19-f1f0-4133-463d-08dc3c795e5a"
                              },
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "3010.0F-2018-0244.nwd",
                                  "date": "2024-03-04T18:31:55.1710709",
                                  "projectDate": "2024-03-04T18:31:55.171071",
                                  "size": "12.643 KB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/Navisworks/3010.0F-2018-0244.nwd",
                                  "viewer": {
                                      "name": "Navisworks",
                                      "id": "8d0460d8-6791-447c-401a-08dc3c795e52"
                                  },
                                  "id": "d57fc661-8bf8-4065-463e-08dc3c795e5a"
                              },
                              {
                                  "tenantId": "UN-BUZ",
                                  "name": "3010.0F-2018-0244.zip",
                                  "date": "2024-03-04T18:31:55.1711057",
                                  "projectDate": "2024-03-04T18:31:55.1711057",
                                  "size": "12.643 KB",
                                  "virtualPath": "/UN-BUZ/MODELS/P-74/SmartPlantReview/3010.0F-2018-0244.zip",
                                  "viewer": {
                                      "name": "SmartPlantReview",
                                      "id": "f5b21efb-8cbf-4534-4017-08dc3c795e52"
                                  },
                                  "id": "6dc94af8-361f-4168-463f-08dc3c795e5a"
                              }
                          ],
                          "pointClouds": [],
                          "subType": 0,
                          "converterAssociation": false,
                          "jobViewers": [],
                          "id": "178f1fe6-84e2-41bd-ab9b-08dc3c795e42"
                      },
                      "icon": null,
                      "expandedIcon": null,
                      "collapsedIcon": null,
                      "leaf": true,
                      "type": "ModelNormal",
                      "style": null,
                      "styleClass": null,
                      "draggable": false,
                      "droppable": false,
                      "selectable": true,
                      "key": "178f1fe6-84e2-41bd-ab9b-08dc3c795e42",
                      "expanded": false,
                      "children": null
                  }
              ]
          }
      ]
  },
  {
      "label": "P-75",
      "data": {
          "tenantId": "UN-BUZ",
          "name": "P-75",
          "description": null,
          "imagePath": "images/plant/P-75.jpg",
          "latitude": -24.788,
          "longitude": -42.5094,
          "un": null,
          "type": {
              "id": 0,
              "name": "FPSO"
          },
          "id": "cb3b702f-584e-4493-8eb3-08dc3c795e33"
      },
      "icon": null,
      "expandedIcon": null,
      "collapsedIcon": null,
      "leaf": false,
      "type": "Plant",
      "style": null,
      "styleClass": null,
      "draggable": false,
      "droppable": false,
      "selectable": true,
      "key": "cb3b702f-584e-4493-8eb3-08dc3c795e33",
      "expanded": true,
      "children": []
  },
  {
      "label": "P-76",
      "data": {
          "tenantId": "UN-BUZ",
          "name": "P-76",
          "description": null,
          "imagePath": "images/plant/P-76.jpg",
          "latitude": -24.6876,
          "longitude": -42.5057,
          "un": null,
          "type": {
              "id": 0,
              "name": "FPSO"
          },
          "id": "ed961f7c-df9d-4147-8eb4-08dc3c795e33"
      },
      "icon": null,
      "expandedIcon": null,
      "collapsedIcon": null,
      "leaf": false,
      "type": "Plant",
      "style": null,
      "styleClass": null,
      "draggable": false,
      "droppable": false,
      "selectable": true,
      "key": "ed961f7c-df9d-4147-8eb4-08dc3c795e33",
      "expanded": true,
      "children": []
  },
  {
      "label": "P-77",
      "data": {
          "tenantId": "UN-BUZ",
          "name": "P-77",
          "description": null,
          "imagePath": "images/plant/P-77.jpg",
          "latitude": -24.6354,
          "longitude": -42.4121,
          "un": null,
          "type": {
              "id": 0,
              "name": "FPSO"
          },
          "id": "3da04b15-4229-45a4-8eb5-08dc3c795e33"
      },
      "icon": null,
      "expandedIcon": null,
      "collapsedIcon": null,
      "leaf": false,
      "type": "Plant",
      "style": null,
      "styleClass": null,
      "draggable": false,
      "droppable": false,
      "selectable": true,
      "key": "3da04b15-4229-45a4-8eb5-08dc3c795e33",
      "expanded": true,
      "children": []
  },
  {
      "label": "P-78",
      "data": {
          "tenantId": "UN-BUZ",
          "name": "P-78",
          "description": "Plataforma Petrobras 78 do Campo de BUZIOS - Em Construção.",
          "imagePath": null,
          "latitude": -12.0262676,
          "longitude": -77.1278635,
          "un": null,
          "type": {
              "id": 0,
              "name": "FPSO"
          },
          "id": "d31ab38b-1e85-4e9c-8eb6-08dc3c795e33"
      },
      "icon": null,
      "expandedIcon": null,
      "collapsedIcon": null,
      "leaf": false,
      "type": "Plant",
      "style": null,
      "styleClass": null,
      "draggable": false,
      "droppable": false,
      "selectable": true,
      "key": "d31ab38b-1e85-4e9c-8eb6-08dc3c795e33",
      "expanded": true,
      "children": []
  },
  {
      "label": "P-79",
      "data": {
          "tenantId": "UN-BUZ",
          "name": "P-79",
          "description": "Plataforma Petrobras 79 do Campo de BUZIOS - Em Construção",
          "imagePath": null,
          "latitude": -12.0262676,
          "longitude": -77.1278635,
          "un": null,
          "type": {
              "id": 0,
              "name": "FPSO"
          },
          "id": "fa33bbf3-8b12-4add-8eb7-08dc3c795e33"
      },
      "icon": null,
      "expandedIcon": null,
      "collapsedIcon": null,
      "leaf": false,
      "type": "Plant",
      "style": null,
      "styleClass": null,
      "draggable": false,
      "droppable": false,
      "selectable": true,
      "key": "fa33bbf3-8b12-4add-8eb7-08dc3c795e33",
      "expanded": true,
      "children": []
  }
];

const plants = [
  {
      "tenantId": "UN-BUZ",
      "name": "P-74",
      "description": null,
      "imagePath": "images/plant/P-74.jpg",
      "latitude": -24.6487,
      "longitude": -42.5147,
      "un": {
          "name": "UN-BUZ",
          "id": "232e7ff2-fb4d-4734-7428-08dc3c795e2c"
      },
      "type": 0,
      "id": "c2710611-a76b-40db-8eb2-08dc3c795e33"
  },
  {
      "tenantId": "UN-BUZ",
      "name": "P-75",
      "description": null,
      "imagePath": "images/plant/P-75.jpg",
      "latitude": -24.788,
      "longitude": -42.5094,
      "un": {
          "name": "UN-BUZ",
          "id": "232e7ff2-fb4d-4734-7428-08dc3c795e2c"
      },
      "type": 0,
      "id": "cb3b702f-584e-4493-8eb3-08dc3c795e33"
  },
  {
      "tenantId": "UN-BUZ",
      "name": "P-76",
      "description": null,
      "imagePath": "images/plant/P-76.jpg",
      "latitude": -24.6876,
      "longitude": -42.5057,
      "un": {
          "name": "UN-BUZ",
          "id": "232e7ff2-fb4d-4734-7428-08dc3c795e2c"
      },
      "type": 0,
      "id": "ed961f7c-df9d-4147-8eb4-08dc3c795e33"
  },
  {
      "tenantId": "UN-BUZ",
      "name": "P-77",
      "description": null,
      "imagePath": "images/plant/P-77.jpg",
      "latitude": -24.6354,
      "longitude": -42.4121,
      "un": {
          "name": "UN-BUZ",
          "id": "232e7ff2-fb4d-4734-7428-08dc3c795e2c"
      },
      "type": 0,
      "id": "3da04b15-4229-45a4-8eb5-08dc3c795e33"
  },
  {
      "tenantId": "UN-BUZ",
      "name": "P-78",
      "description": "Plataforma Petrobras 78 do Campo de BUZIOS - Em Construção.",
      "imagePath": null,
      "latitude": -12.0262676,
      "longitude": -77.1278635,
      "un": {
          "name": "UN-BUZ",
          "id": "232e7ff2-fb4d-4734-7428-08dc3c795e2c"
      },
      "type": 0,
      "id": "d31ab38b-1e85-4e9c-8eb6-08dc3c795e33"
  },
  {
      "tenantId": "UN-BUZ",
      "name": "P-79",
      "description": "Plataforma Petrobras 79 do Campo de BUZIOS - Em Construção",
      "imagePath": null,
      "latitude": -12.0262676,
      "longitude": -77.1278635,
      "un": {
          "name": "UN-BUZ",
          "id": "232e7ff2-fb4d-4734-7428-08dc3c795e2c"
      },
      "type": 0,
      "id": "fa33bbf3-8b12-4add-8eb7-08dc3c795e33"
  }
];