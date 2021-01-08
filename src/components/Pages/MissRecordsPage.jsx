import React from "react";
import MissDocuments from "../Tables/MissDocuments";
import MissTrainings from "../Tables/MissTrainings";
import {documents} from "../../data"

const MissRecordsPage = () => {

  // TODO MATO load documents - name, release date, deadline
  // TODO MATO load trainings - name, date of event, deadline

  return (
    <>
      <MissDocuments documents={documents}/>
      <MissTrainings trainings={[]}/>
    </>
  );
}

export default MissRecordsPage;