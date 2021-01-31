import React from "react";
import MissedDocuments from "../Tables/MissedDocuments";
import MissedTrainings from "../Tables/MissedTrainings";
import {docs} from "../../data"
import {getUser, setUser} from "../../functions";

const MissedRecordsPage = () => {

  const user = getUser()
  var documents = docs;
  var trainings = [];

  const cc = () => {
    return fetch('http://localhost:7777/signatures', {
      method: "GET",
      body: new URLSearchParams(user.anet_id)
    })
      .then(response => response.json())
      .then(respon => {
        documents = respon.documents
        trainings = respon.trainings
        // todo sprcurj}re
      }).catch(
        // todo
      );
  }

  const my_sign_docs = "select *, doc from doc_signatures where user_id = employee_id and e_date = null";

  const my_sign_docs_as_superior = "select *, doc from doc_signatures where user_id = superior_id and s_date = null"

  const my_inferiors = "..."

  // const Map<doc, sign_doc> map =  my_sign_docs_as_superior.partitionBy(sign_doc.doc)
  //
  // map.forEach((key, value) => {
  //
  //   }
  // )

  return (
    <>
      <MissedDocuments documents={documents}/>
      <MissedTrainings trainings={trainings}/>
    </>
  );
}

export default MissedRecordsPage;