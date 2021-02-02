import React from "react";
import MissedDocuments from "../Tables/MissedDocuments";
import MissedTrainings from "../Tables/MissedTrainings";
import {docs} from "../../data"
import {getUser, setUser} from "../../functions";

const MissedRecordsPage = () => {

  const user = getUser()

  var documents = docs;
  var trainings = [];

  // const cc = () => {
  //   return fetch('http://localhost:7777/signatures', {
  //     method: "GET",
  //     body: new URLSearchParams(user.anet_id)
  //   })
  //     .then(response => response.json())
  //     .then(respon => {
  //       documents = respon.documents
  //       trainings = respon.trainings
  //     }).catch(
  //     );
  // }

  return (
    <>
      <MissedDocuments documents={documents}/>
      <MissedTrainings trainings={trainings}/>
    </>
  );
}

export default MissedRecordsPage;