import { AnnualPlanningDetails } from '@models/annual-planning-details';

interface HidroblastLocations {
  id: string;
  name: string;
  sectors: {
    id: string,
    name: string
  }[];
}

export function getHidroblastLocations(annualPlanning: AnnualPlanningDetails): HidroblastLocations[] {

  const groupedByModule = annualPlanning.inspectionData.reduce((acc, curr) => {
    if (!acc[curr.module]) {
      acc[curr.module] = new Set();
    }
    acc[curr.module].add(curr.sector);
    return acc;
  }, {});

  return Object.keys(groupedByModule).map(module => ({
    id: module,
    name: module,
    sectors: Array.from(groupedByModule[module]).map((sector: string) => ({ id: `${module}_${sector}`, name: sector }))
  }));
}

