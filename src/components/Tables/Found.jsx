import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import {documents} from "../../data";
import EditBtn from "../Buttons/EditBtn";
import SMBtn from "../Buttons/SMBtn";
import filterFactory, { selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';

const Found = () => {

  const selectNames = {
    1: "Document1", 2: "Document2", 3: "Document3"
  };

  const selectTypes = {
    1: 'A', 2: 'B', 3: 'C'
  };

  const selectCities = {
    1: 'C1', 2: 'C2', 3: 'C3'
  };

  const [selected, setSelected] = useState({
    types: [],
    branches: [],
    divisions: [],
    departments: [],
    cities: []
  })

  const columns = [
    {
      dataField: 'name',
      text: "Name",
      // filter: selectFilter({
      //   options: selectNames,
      //   onFilter: (filterVal) => {
      //     console.log(`Filter Value: ${filterVal}`)
      //     console.log(setSelected(...selected, selected.types))
      //   },
      // })
    }, {
      dataField: 'release',
      text: 'Release'
    }, {
      dataField: 'type',
      text: 'Type',
      filter: multiSelectFilter({
        options: selectTypes,
        onFilter: (filterVal) => {
          console.log(`Filter Value: ${filterVal}`)
          setSelected({...selected, types: [filterVal]});
          console.log(`selected: ${selected}`)
        },
      })
    }, {
      dataField: 'division',
      text: 'Division'
    }, {
      dataField: 'department',
      text: 'Department'
    }, {
      dataField: 'city',
      text: 'City',
      // filter: multiSelectFilter({
      //   options: selectCities
      // })
    }, {
      dataField: 'recordType',
      text: 'Record Type'
    }, {
      dataField: 'state',
      text: 'State'
    }, {
      dataField: 'edit',
      text: 'Edit',
      formatter: EditBtn,
      formatExtraData: { // TODO
        setFormType: undefined,
        setFormData: undefined
      }
    }, {
      dataField: 'skillMatrix',
      text: 'SkillMatrix',
      formatter: SMBtn,
    }
  ];

  function afterFilter(newResult, newFilters) {
    console.log(newResult);
    console.log(newFilters);
  }

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={documents}
        columns={columns}
        filter={ filterFactory({afterFilter}) }
      />
    </>
  );
}

export default Found;

