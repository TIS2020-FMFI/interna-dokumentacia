import React, {useState} from "react";
import {X, PlusSquare, DashSquare, XSquare} from 'react-bootstrap-icons';
import CombinationModal from "../Modals/CombinationModal";

const Combination = ({c, combinations, setCombinations}) => {

  const deleteCombination = () => {
    setCombinations(combinations.filter(c2 => c2.id !== c.id)); // TODO delete the document
  };

  return (
    // TODO prettify
    <p>{`Branch: ${c.branch} | Division: ${c.division} | Department: ${c.department} | City: ${c.city} `}
      <DashSquare size="25" color="red" onClick={deleteCombination}/>
    </p>
  )
}

const Combinations = ({combinations, setCombinations}) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <hr/>
      <span onClick={() => setShowModal(true)}>
        <strong>Add combination {" "}</strong>
        <PlusSquare size="25" color="green"/>
      </span>
      {combinations.map(c => {
        return (
          <Combination
            c={c}
            combinations={combinations}
            setCombinations={setCombinations}/>
        )
      })}
      {showModal &&
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
