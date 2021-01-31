import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "../Others/CaptionElement";
import {sm_data, employees} from "../../data";
import ToggleBtn from "../Buttons/ToggleBtn";
import ConfirmModal from "../Modals/ConfirmModal";
import {Legend, RowButtons, DocumentLabel} from "../Others/SkillMatrixComponents";

const SkillMatrixPage = () => {

  const [showModal, setShowModal] = useState(false)
  const [event, setEvent] = useState("")

  const documents = loadDocuments()
  const [data, setData] = useState(documents);

  const columns = loadColumns()

  function loadColumns() {
    const columns = [{
      dataField: 'name',
      text: 'Document Name',
      formatter: DocumentLabel,
      formatExtraData: {
        data: data
      }
    }];

    let counter = 0;

    // TODO MATO load inferior employees
    employees.forEach(e => {
      columns.push({
        dataField: e.anet_id,
        text: e.name,
        formatter: ToggleBtn,
        formatExtraData: {
          data: data,
          setData: setData,
          id: (counter++ % employees.length)
        },
        headerStyle: () => { return {width: '1%'} }
      })
    })

    return columns
  }
  function loadDocuments() {
    // TODO MATO load documents
    return sm_data
  }

  function getState(document, state){
    return state.includes('s') ? 'es' : 'e' // FIXME treba vediet kedy ma aj superior
  }

  const handleAccept = (event) => {

    const update = data.map(d => {

      let emp = d.employees.map(e => {

        if (e.state.includes('X')){
          let state = e.state.replace('X', '')
          if (event === 'sign')       state = state.replace('s', '')
          if (event === 'cancelDuty') state = '-'
          if (event === 'trainAgain') state = getState(d, state)
          return {...e, state: state} // updated employee
        }

        return e  // unchanged employee
      })

      return {...d, employees: emp}   // updated document
    })

    setData(update)
  };

  const handleExport = () => {
    {/* EXPORT TODO PATO https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Export%20CSV&selectedStory=Export%20Custom%20Data&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel*/}
    console.log('export is not implemented')
  };

  return (
    <>
      <CaptionElement title="Strečno"/>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
      />
      <RowButtons
        setEvent={setEvent}
        setShowModal={setShowModal}
        handleExport={handleExport}
      />
      <Legend/>
      {showModal &&
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalInfo={{name:"test"}}
        handleAccept={() => handleAccept(event)}
      />
      }
    </>
  );
};

export default SkillMatrixPage;
