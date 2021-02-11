import {get_current_date} from "./functions";

/**
 * toto som čisto len testovacie dáta, náhradou za databázu
 */

export const employees = [{
  anet_id: '1',
  name: 'Janko',
  pass: 'ja',
  job: 'Job1',
  complete: '70%'
}, {
  anet_id: '2',
  name: 'Julka',
  pass: 'ty',
  job: 'Job2',
  complete: '100%'
}, {
  anet_id: '3',
  name: 'Jaroslav',
  pass: 'on',
  job: 'Job3',
  complete: '44%'
}, {
  anet_id: '4',
  name: 'Jozef',
  pass: 'ty',
  job: 'Job4',
  complete: '53%'
}, {
  anet_id: '5',
  name: 'Juraj',
  pass: 'on',
  job: 'Job5',
  complete: '83%'
}, {
  anet_id: '6',
  name: 'Janka',
  pass: 'on',
  job: 'Job6',
  complete: '22%'
}];

export const doc_form = {
  name: "Test",
  link: "",
  note: "",
  release: get_current_date(),
  deadline: get_current_date(),
  order_number: 1,
  version: "1",
  prev_version_id: 1,
  assigned_to: "b; u; b; u",
  type: 'A',
  require_superior: true
}

export const docs = [{
  id: '1',
  name: 'Document1',
  release: '1.7.2020',
  deadline: '15.1.2000',
  sign: '1.7.2020',
  type: 'T',
  division: 'D',
  department: 'D',
  city: 'Zilina',
  record_type: 'training-document',
  state: '75%',
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
  type: 'T',
  division: 'D',
  department: 'D',
  city: 'Zilina, Martin',
  record_type: 'document',
  state: '80%',
}, {
  id: '3',
  name: 'Document3',
  release: '15.1.2018',
  deadline: '15.1.2021',
  sign: '1.7.2020',
  type: 'T',
  division: 'D',
  department: 'D',
  city: 'Bratislava',
  record_type: 'online-training',
  state: '100%',
}];

export const dbdocs = [{
  assigned_to: "3; 4; 1; 4",
  deadline: {Time: "2017-03-14T00:00:00Z", Valid: true},
  id: 46,
  name: "name_46",
  agency: "Agency name_18",
  agenda: "Agenda Agenda AgendaAgendaAgenda Agenda Agenda Agenda",
  lector: "Simona",
  place: "Trnava",
  duration: 30,
  release_date: {Time: "2017-06-24T00:00:00Z", Valid: true},
}, {
  assigned_to: "5; 4; 2; 2",
  deadline: {Time: "2017-04-23T00:00:00Z", Valid: true},
  id: 18,
  name: "name_18",
  agency: "Agency name_18",
  agenda: "Agenda Agenda AgendaAgendaAgenda Agenda Agenda Agenda",
  lector: "Laura",
  place: "Banska bystrica",
  duration: 120,
  prev_version_id: 0,
  release_date: {Time: "2017-10-23T00:00:00Z", Valid: true},
}, {
  assigned_to: "5; 4; 2; 2",
  deadline: {Time: "2013-03-11T00:00:00Z", Valid: true},
  id: 1,
  link: "www.google.com",
  name: "name_1",
  release_date: {Time: "2017-10-23T00:00:00Z", Valid: true},
  require_superior: false,
  version: "v3"
}];

export const pobocky = ["prva pobocka", "druha pobocka", "tretia pobocka"]

export const sm_data = [{
  id: 1,
  name: 'Document1',
  type: 'A',
  deadline: new Date("2021/3/16"),
  employees: [{
    anet_id: '1',
    state: '_'
  }, {
    anet_id: '2',
      state: '_'
  }, {
    anet_id: '3',
      state: '_'
  }, {
    anet_id: '4',
      state: '_'
  }, {
    anet_id: '5',
      state: '_'
  }, {
    anet_id: '6',
      state: '_'
  }]
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
  }, {
    anet_id: '4',
    state: 's'
  }, {
    anet_id: '5',
    state: '-'
  }, {
    anet_id: '6',
    state: 'es'
  }]
}, {
  id: 3,
  name: 'Document3',
  type: 'B',
  deadline: new Date("2021/1/16"),
  employees: [{
    anet_id: '1',
    state: ''
  }, {
    anet_id: '2',
    state: 's'
  }, {
    anet_id: '3',
    state: 'es'
  }, {
    anet_id: '4',
    state: 's'
  }, {
    anet_id: '5',
    state: 'es'
  }, {
    anet_id: '6',
    state: ''
  }]
}];

export const combinations = [{
  type: { value: 'A', label: 'A' },
  branch: { value: 'A1', label: 'A1' },
  division: { value: 'D1', label: 'D1' },
  department: { value: 'D1', label: 'D1' },
  city: { value: 'C1', label: 'C1' },
},{
  type: { value: 'A', label: 'A' },
  branch: { value: 'A1', label: 'A1' },
  division: { value: 'Da1', label: 'Da1' },
  department: { value: 'Da1', label: 'Da1' },
  city: { value: 'C2', label: 'C2'},
},{
  type: { value: 'B', label: 'B' },
  branch: { value: 'B2', label: 'B2' },
  division: { value: 'D1', label: 'D1' },
  department: { value: 'D2', label: 'D2' },
  city: { value: 'C3', label: 'C3' },
},{
  type: { value: 'B', label: 'B' },
  branch: { value: 'B1', label: 'B1' },
  division: { value: 'D1', label: 'D1' },
  department: { value: 'D1', label: 'D1' },
  city: { value: 'C1', label: 'C1' },
}];

export const types = [...new Set(combinations.map(c => c.type.value))];
export const branches = [...new Set(combinations.map(c => c.branch))];
export const divisions = [...new Set(combinations.map(c => c.division))];
export const departments = [...new Set(combinations.map(c => c.department))];
export const cities = [...new Set(combinations.map(c => c.city))];

