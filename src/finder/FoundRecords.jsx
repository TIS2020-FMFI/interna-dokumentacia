import React from "react";
import FoundDocuments from "./FoundDocuments";
import FoundTrainings from "./FoundTrainings";

const FoundRecords = ({ documents, setDocuments, trainings, setTrainings }) => {
  return (
    <>
      <FoundDocuments found={documents} setFound={setDocuments} />
      <FoundTrainings found={trainings} setFound={setTrainings} />
    </>
  );
};

export default FoundRecords;
