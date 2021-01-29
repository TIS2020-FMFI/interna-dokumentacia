import React from "react";
import MissedDocuments from "../Tables/MissedDocuments";
import MissedTrainings from "../Tables/MissedTrainings";
import {docs} from "../../data"

const MissedRecordsPage = () => {

  // TODO MATO load missed documents - name, release date, deadline
  const documents = docs;

  // TODO MATO load missed trainings - name, date of event, deadline
  const trainings = [];

  return (
    <>
      <MissedDocuments documents={documents}/>
      <MissedTrainings trainings={trainings}/>
    </>
  );
}

export default MissedRecordsPage;