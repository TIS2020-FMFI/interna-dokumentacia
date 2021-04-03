import React, { useState } from "react";
import { Plus, XSquare, Pencil } from "react-bootstrap-icons";
import CombinationModal from "../Modals/CombinationModal";
import Button from "react-bootstrap/Button";
import { buttonColumn } from "../../utils/functions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import MyBootstrapTable from "./MyBootstrapTable";

const Combinations = ({
  combinations,
  assignedTo,
  setAssignedTo,
  setEmptyAssign,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [prefill, setPrefill] = useState();

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setPrefill(undefined);
    setShowModal(false);
  };

  const EditIcon = (_, row) => {
    const editCombination = (row) => {
      console.log(row);
      setPrefill(row);
      openModal();
    };

    return (
      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip id="tooltip-right" className="text-left">
            {!row.removedEmployees || !row.removedEmployees.length ? (
              <p>Empty</p>
            ) : (
              row.removedEmployees.map((e) => <p key={e.value}>{e.label}</p>)
            )}
          </Tooltip>
        }
      >
        <Pencil size="25" color="black" onClick={() => editCombination(row)} />
      </OverlayTrigger>
    );
  };

  const DeleteIcon = (_, row) => {
    const deleteCombination = (row) => {
      setAssignedTo((prevState) => {
        return prevState.filter((c) => c.id !== row.id);
      });
    };

    return (
      <XSquare size="25" color="red" onClick={() => deleteCombination(row)} />
    );
  };

  const AddIcon = () => (
    <Button variant="dark" onClick={openModal} size="sm" className="mb-2">
      <Plus size="20" color="white" />
      <span>add combination</span>
    </Button>
  );

  const getLabels = (field) => <>{field?.map((f) => f.label).join(",")}</>;
  const Branches = (_, row) => getLabels(row.branches);
  const Divisions = (_, row) => getLabels(row.divisions);
  const Departments = (_, row) => getLabels(row.departments);
  const Cities = (_, row) => getLabels(row.cities);

  const columns = [
    {
      dataField: "branches",
      text: "branches",
      formatter: Branches,
    },
    {
      dataField: "divisions",
      text: "Divisions",
      formatter: Divisions,
    },
    {
      dataField: "departments",
      text: "departments",
      formatter: Departments,
    },
    {
      dataField: "cities",
      text: "cities",
      formatter: Cities,
    },
    {
      ...buttonColumn("edit"),
      formatter: EditIcon,
    },
    {
      ...buttonColumn("del"),
      formatter: DeleteIcon,
    },
  ];

  return (
    <>
      <MyBootstrapTable
        data={assignedTo}
        columns={columns}
        // horizontal scroll
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      <AddIcon />
      {showModal && (
        <CombinationModal
          prefill={prefill}
          combinations={combinations}
          setAssignedTo={setAssignedTo}
          setEmptyAssign={setEmptyAssign}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Combinations;
