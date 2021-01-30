import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {PlusSquare, DashSquare} from 'react-bootstrap-icons';
import CombinationModal from "../Modals/CombinationModal";
import EmptyTable from "../Tables/EmptyTable";
import {Button} from "react-bootstrap";

const Combinations = ({combinations, setCombinations}) => {

  const [showModal, setShowModal] = useState(false)

  const deleteCombination = (c) => {
    setCombinations(combinations.filter(c2 => c2.id !== c.id)); // delete the combination
  };

  const DeleteIcon = (cell, c) => {
    return (
      <DashSquare size="25" color="red" onClick={() => deleteCombination(c)}/>
    )
  };

  const AddIcon = () => {
    return (
      <Button variant="success" onClick={() => setShowModal(true)}>
        <strong>Add combination {" "}</strong>
        <PlusSquare size="20" color="white"/>
      </Button>
    )
  };

  const columns = [{
    dataField: 'branch',
    text: 'Branch'
  }, {
    dataField: 'division',
    text: 'Division'
  }, {
    dataField: 'department',
    text: 'Department'
  }, {
    dataField: 'city',
    text: 'City'
  }, {
    dataField: '',
    text: 'Delete',
    formatter: DeleteIcon,
    headerStyle: () => { return {width: '1%'}; }
  }
  ];

  return (
    <>
      <hr/>
      <BootstrapTable
        keyField="id"
        data={ combinations }
        columns={ columns }
        bordered={ false }
        noDataIndication={EmptyTable}
      />
      <AddIcon/>
      { showModal &&
        <CombinationModal
          showModal={showModal}
          setShowModal={setShowModal}
          combinations={combinations}
          setCombinations={setCombinations}
        />
      }
      <hr/>
    </>
  )
}

export default Combinations;
