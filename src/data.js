/**
 * toto som čisto len testovacie dáta, náhradou za databázu
 */

export const employees = [{
  anet_id: '1',
  name: 'ja',
  pass: 'ja',
  job: 'Job1',
  complete: '10%'
}, {
  anet_id: '2',
  name: 'ty',
  pass: 'ty',
  job: 'Job1',
  complete: '10%'
}, {
  anet_id: '3',
  name: 'on',
  pass: 'on',
  job: 'Job1',
  complete: '10%'
}];

export const docs = [{
    id: '1',
    name: 'Document1',
    release: '1.7.2020',
    deadline: '15.1.2000',
    sign: '1.7.2020',
    type: 'A',
    city: 'C1',
    sub: [{
        anet_id: '1',
        name: 'Employee1',
        sign: '1.7.2020'
      }, {
        anet_id: '2',
        name: 'Employee2',
        sign: '1.7.2020'
      }, {
        anet_id: '3',
        name: 'Employee3',
        sign: '1.7.2020'
      }]
  }, {
    id: '2',
    name: 'Document2',
    release: '15.1.2019',
    deadline: '15.1.2019',
    sign: '1.7.2020',
    type: 'B',
    city: 'C2'
  }, {
    id: '3',
    name: 'Document3',
    release: '15.1.2018',
    deadline: '15.1.2021',
    sign: '1.7.2020',
    type: 'C',
    city: 'C3'
  }
];

export const sm_data = [
  {
    id: 1,
    name: 'Document1',
    type: 'A',
    deadline: new Date("2021/3/16"),
    employees: [{
        anet_id: '1',
        state: ''
      }, {
        anet_id: '2',
        state: 's'
      }, {
        anet_id: '3',
        state: 'es'
      }
    ]
  }, {
    id: 2,
    name: 'Document2',
    type: 'B',
    deadline: new Date("2021/1/16"),
    employees: [{
        anet_id: '1',
        state: '-'
      }, {
        anet_id: '2',
        state: ''
      }, {
        anet_id: '3',
        state: ''
      }
    ]
  }, {
    id: 3,
    name: 'Document3',
    type: 'B',
    deadline: new Date("2021/1/16"),
    employees: [{
        anet_id: '1',
        state: '-'
      }, {
        anet_id: '2',
        state: 's'
      }, {
        anet_id: '3',
        state: 's'
      }
    ]
  }
];

export const allInOne = {
  types: ["A", "B", "C"],
  branches: ["B1", "B2", "B3"],
  divisions: ["D1", "D2", "D3"],
  departments: ["Dep1", "Dep2", "Dep3"],
  cities: ["C1", "C2", "C3"]
};

export const combinations = [
  {
    type: "A",
    branch: "A1",
    city: "C1"
  },{
    type: "A",
    branch: "A2",
    city: "C1"
  },{
    type: "B",
    branch: "B2",
    city: "C2"
  },{
    type: "B",
    branch: "B2",
    city: "C1"
  }];

export const types = [...new Set(combinations.map(c => c.type))];
export const branches = [...new Set(combinations.map(c => c.branch))];
export const cities = [...new Set(combinations.map(c => c.city))];
// export const branches = ["B1", "B2", "B3"];
export const divisions = ["D1", "D2", "D3"];
export const departments = ["Dep1", "Dep2", "Dep3"];
// export const cities = ["C1", "C2", "C3"];

// export const combinations = [{
//   types: [],
//   branches: [],
//   divisions: [],
//   departments: [],
//   cities: []
// }];
