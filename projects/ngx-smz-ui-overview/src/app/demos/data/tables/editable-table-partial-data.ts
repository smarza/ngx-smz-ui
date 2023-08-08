
const p75 = { id: '5bdf44ac-9c51-40de-e435-08da4ad3baf7', name: 'P-75'};

const function1 = { id: '413c2fa3-bca7-4ba8-e17b-08da4ad3bafb', name: 'Casa de Bombas'};

const levelLight = { id: '0', name: 'Light'};
const levelModerate = { id: '1', name: 'Moderate'};
const levelGeneralized = { id: '2', name: 'Generalized'};

export const EditableTablePartialLevels = [levelLight, levelModerate, levelGeneralized];
export const EditableTablePartialData = [
  // { id: 0, plant: p75, module: 'M31', section: 'S06', system: 'Suportes', function: function1, value: 0, level: levelLight },
  { id: 3, plant: p75, module: 'M31', section: 'S06', isNotApplicable: false, system: 'Teto', function: function1, value: 0.2, level: levelModerate },
  { id: 1, plant: p75, module: 'M31', section: 'S06', isNotApplicable: false, system: 'Estruturas', function: function1, value: 0.03, level: levelLight },
  { id: 2, plant: p75, module: 'M31', section: 'S06', isNotApplicable: true, system: 'TVF', function: function1, value: null, level: null },
  { id: 4, plant: p75, module: 'M31', section: 'S06', isNotApplicable: false, system: 'Equipamento', function: function1, value: 0, level: levelLight },
];