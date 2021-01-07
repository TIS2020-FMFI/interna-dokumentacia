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

export const documents = [
  {
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

// TODO doc with employees or employee with docs?
export const sm_data = [
  {
    id: 1,
    name: 'Document1',
    employees: [
      {
        anet_id: '1',
        state: 'A'
      }, {
        anet_id: '2',
        state: 'B'
      }, {
        anet_id: '3',
        state: 'A'
      }
    ]
  }, {
    id: 2,
    name: 'Document2',
    type: 'B',
    employees: [
      {
        anet_id: '1',
        state: 'B'
      }, {
        anet_id: '2',
        state: 'A'
      }, {
        anet_id: '3',
        state: 'A'
      }
    ]
  }, {
    id: 3,
    name: 'Document3',
    type: 'C',
    employees: [
      {
        anet_id: '1',
        state: 'A'
      }, {
        anet_id: '2',
        state: 'B'
      }, {
        anet_id: '3',
        state: 'B'
      }
    ]
  }
];

export const types = ["A", "B", "C"];
export const branches = ["B1", "B2", "B3"];
export const divisions = ["D1", "D2", "D3"];
export const departments = ["Dep1", "Dep2", "Dep3"];
export const cities = ["C1", "C2", "C3"];

export const combinations = [] // TODO

// export const combinations = [{
//   types: []
//   branches:
// divisions:
//     departments:
//         cities:
// }];
