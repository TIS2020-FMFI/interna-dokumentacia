import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Modal } from "react-bootstrap";
import CombinationForm from "../Forms/CombinationForm";
import uuid from "react-uuid";
import {
  badMsg,
  getEmployeeLabel,
  getFetch,
  resolveCombinations,
} from "../../utils/functions";
import { PairContext } from "../../App";
import { comboFields } from "../../utils/data";

const CombinationModal = ({
  prefill,
  combinations,
  setAssignedTo,
  setEmptyAssign,
  closeModal,
}) => {
  const pairs = useContext(PairContext);

  const [disabled, setDisabled] = useState([]);
  const [notification, setNotification] = useState();
  const [employees, setEmployees] = useState();
  const [combination, setCombination] = useState(
    prefill
      ? prefill
      : {
          branches: [],
          divisions: [],
          departments: [],
          cities: [],
          removedEmployees: [],
        }
  );

  useEffect(() => {
    if (prefill) {
      preview();
    }
  }, []);

  function preview() {
    setDisabled(comboFields);
    console.log(combination);
    const assignedTo = resolveCombinations([combination]);
    console.log(assignedTo);
    getFetch(`/employees/${assignedTo}`)
      .then((data) => {
        console.log(data);
        if (!data.length) {
          setNotification(badMsg("not valid combination"));
          return;
        }
        resolveEmployees(data);
      })
      .catch((e) => {
        setNotification(badMsg("not valid combination"));
        console.log("Errrrrrrrrrrror", e);
      });
  }

  const resolveEmployees = (data) => {
    setEmployees(
      data.map((d) => {
        return {
          value: d.id,
          label: getEmployeeLabel(d, pairs.departments),
        };
      })
    );
  };

  const save = () => {
    setAssignedTo((prev) => {
      return prev.map((c) => {
        if (c.id === prefill?.id) {
          return { ...combination, id: uuid() };
        }
        return c;
      });
    });

    closeModal();
  };

  const add = () => {
    const assignedTo = resolveCombinations([combination]);
    getFetch(`/employees/${assignedTo}`)
      .then((data) => {
        if (!data.length) {
          setNotification(badMsg("not valid combination"));
          return;
        }

        setNotification(undefined);
        setEmptyAssign([false]);

        setAssignedTo((prevState) => {
          return [...prevState, { ...combination, id: uuid() }];
        });

        closeModal();
      })
      .catch((e) => {
        setNotification(badMsg("not valid combination"));
        console.log("Errrrrrrrrrrror", e);
      });
  };

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Container className="pt-3 pb-3 pl-5 pr-5">
        <Modal.Header closeButton>
          <Modal.Title>Add new combination</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CombinationForm
            prefill={prefill}
            disabled={disabled}
            employees={employees}
            combinations={combinations}
            combination={combination}
            setCombination={setCombination}
            notification={notification}
            setNotification={setNotification}
          />
        </Modal.Body>
        <Modal.Footer>
          <Col className="text-center">
            {prefill ? (
              <Button onClick={save} size="sm" className="mr-2">
                Save
              </Button>
            ) : (
              <>
                <Button onClick={preview} size="sm" className="mr-2">
                  Preview
                </Button>
                <Button onClick={add} size="sm" className="mr-2">
                  Add
                </Button>
              </>
            )}
            <Button onClick={closeModal} variant="secondary" size="sm">
              close
            </Button>
          </Col>
        </Modal.Footer>
      </Container>
    </Modal>
  );
};

export default CombinationModal;
