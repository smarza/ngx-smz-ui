import { SimpleEntity } from 'ngx-smz-ui';
export interface SmzCardsDemoData {
  tankId: string,
  type: SimpleEntity<number>,
  notes: string,
  date: Date,
  imagePath: string,
  id: string,
  isArchived: boolean,
  showAsImage?: boolean
}

export const SmzCardsDemo: SmzCardsDemoData[] = [
  {
    tankId: "87549138-5447-4730-769c-08da9316733c",
    type: {
      id: 2,
      name: "Mudança"
    },
    notes: "Descemos a iluminação em 2%",
    date: new Date("2022-09-21T11:00:00Z"),
    imagePath: "https://picsum.photos/300/200",
    id: "7572b0ef-a826-4459-35e1-08da9c8f3ece",
    isArchived: false,
    showAsImage: true
  },
  {
    tankId: "87549138-5447-4730-769c-08da9316733c",
    type: {
      id: 2,
      name: "Mudança"
    },
    notes: "Outra coisa (documento)",
    date: new Date("2022-09-21T11:00:00Z"),
    imagePath: "https://picsum.photos/300/200",
    id: "7572b0ef-a826-4459-35e1-08da9c8f3ece",
    isArchived: false,
    showAsImage: false
  },
  {
    tankId: "87549138-5447-4730-769c-08da9316733c",
    type: {
      id: 2,
      name: "Mudança"
    },
    notes: "Descemos novamente a iluminação em 2%",
    date: new Date("2022-09-22T11:39:47.688Z"),
    imagePath: "https://picsum.photos/300/200",
    id: "2b920950-554b-4153-35e2-08da9c8f3ece",
    isArchived: false,
    showAsImage: true
  },
  {
    tankId: "87549138-5447-4730-769c-08da9316733c",
    type: {
      id: 1,
      name: "Registro Geral"
    },
    notes: null,
    date: new Date("2022-09-18T03:00:00Z"),
    imagePath: "https://picsum.photos/300/200",
    id: "eeeeda39-49bf-4678-2c24-08da9ca9dd78",
    isArchived: false,
    showAsImage: true
  },
];

export const SmzCardsArchivedDemo: SmzCardsDemoData[] = [
  {
    tankId: "87549138-5447-4730-769c-08da9316733c",
    type: {
      id: 2,
      name: "Mudança"
    },
    notes: "TPA de 20 Litros no sump com sal AF Reef Salt Probiotics.",
    date: new Date("2022-09-21T22:00:00Z"),
    imagePath: "https://picsum.photos/300/200",
    id: "b4b58ba5-462d-4966-35e3-08da9c8f3ece",
    isArchived: true
  },
  {
    tankId: "87549138-5447-4730-769c-08da9316733c",
    type: {
      id: 2,
      name: "Mudança"
    },
    notes: "TPA de 20 Litros no sump com sal AF Reef Salt Probiotics.",
    date: new Date("2022-09-24T22:33:19.572Z"),
    imagePath: "https://picsum.photos/300/200",
    id: "9589c15c-25a4-4e93-3094-08da9e7ce094",
    isArchived: true
  }
];