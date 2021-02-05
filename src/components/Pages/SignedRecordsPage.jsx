import React from "react";
import SignedDocuments from "../Tables/SignedDocuments";
import SignedTrainings from "../Tables/SignedTrainings";
import {getUser} from "../../functions";
import useDataApi from "../../hooks/useDataApi";
import {FetchError, FetchLoading} from "../Others/FetchComponents";

const SignedRecordsPage = () => {

  const URL = `/signed/signatures/${getUser().id}`;

  const [data, isLoaded, error] = useDataApi(URL);
  // TODO TEST
  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || data === undefined) {
    return <FetchLoading/>
  }

  return (
    <>
      <SignedDocuments documents={data.documents}/>
      <SignedTrainings trainings={data.online_trainings}/>
    </>
  );
}

export default SignedRecordsPage;
