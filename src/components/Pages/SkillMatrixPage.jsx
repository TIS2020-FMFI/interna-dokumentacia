import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "../Others/CaptionElement";
import ToggleBtn from "../Buttons/ToggleBtn";
import ConfirmModal from "../Modals/ConfirmModal";
import {Legend, RowButtons, DocumentLabel} from "../Others/SkillMatrixComponents";
import {getUser} from "../../functions";
import useDataApi from "../../hooks/useDataApi";
import {FetchError, FetchLoading} from "../Others/FetchComponents";

const SkillMatrixPage = () => {

  const URL = `/skill/matrix/${getUser().id}`;

  const [x, isLoaded, error] = useDataApi(URL);
  console.log("SM x", x) // TODO TEST online_trainings?, > training => require_superior

  const [showModal, setShowModal] = useState(false)
  const [event, setEvent] = useState("")

  const [data, setData] = useState(x);

  const columns = [{
    dataField: 'name',
    text: 'Document Name',
    formatter: DocumentLabel,
    formatExtraData: {
      data: data
    }
  }];

  if (isLoaded && !error && x !== undefined) {
    loadColumns()
  }

  function loadColumns() {
    let counter = 0;
    console.log('documents', x.documents[0])
    const signatures = x.documents[0].signatures;
    console.log('signatures', signatures)
    signatures.forEach(s => {
      console.log(s)})
    const employees = [...new Set(signatures.map(s => s.employee))];
    console.log('employees', employees)
    // TODO MATO load inferior employees
    employees.forEach(e => {
      columns.push({
        dataField: e.id,
        text: e.first_name,
        formatter: ToggleBtn,
        formatExtraData: {
          document: data,
          setData: setData,
          id: (counter++ % employees.length)
        },
        headerStyle: () => { return {width: '1%'} }
      })
    })
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
    console.log('export is not implemented') // TODO PATO
  };

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>;
  } else if (!isLoaded || data === undefined) {
    return <FetchLoading/>;
  }

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
