import React, {useState} from "react";
import {Plus, X} from 'react-bootstrap-icons';
import CombinationModal from "../Modals/CombinationModal";

const Combination = ({c, combinations, setCombinations}) => {

  const deleteCombination = () => {
    setCombinations(combinations.filter(c2 => c2.id !== c.id)); // delete the document
  };

  return (
      <p>{`Branch: ${c.branch} | Division: ${c.division} | Department: ${c.department} | City: ${c.city}`}
        <span><X size="30" color="red" onClick={deleteCombination}/></span>
      </p>
  )
}

const Combinations = ({combinations, setCombinations}) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <span onClick={() => setShowModal(true)}>
      <Plus size="30" color="blue" />
      <a href="#"><strong>Add combination</strong></a>
      </span>
      {combinations.map(c => {
        return (
          <Combination
            c={c}
            combinations={combinations}
            setCombinations={setCombinations}/>
        )
      })}
      {!showModal ? null :
        <CombinationModal
          showModal={showModal}
          setShowModal={setShowModal}
          combinations={combinations}
          setCombinations={setCombinations}
        />
      }

      {/* ADD BUTTON */}
      {/*<Form.Group as={Col}>*/}
      {/*  <Button id="save" size="sm" variant="secondary" onClick={addCombination}> Add </Button>*/}
      {/*</Form.Group>*/}
    </>
  )
}

export default Combinations;
