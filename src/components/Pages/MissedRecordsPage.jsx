import React from "react";
import MissedDocuments from "../Tables/MissedDocuments";
import MissedTrainings from "../Tables/MissedTrainings";
import {getUser} from "../../functions";
import {FetchError, FetchLoading} from "../Others/FetchComponents";
import useDataApi from "../../hooks/useDataApi";


const MissedRecordsPage = () => {

  const URL = `http://localhost:7777/unsigned/signatures/${getUser().id}`;

  const [data, isLoaded, error] = useDataApi(URL);

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || data === undefined) {
    return <FetchLoading/>
  }

  return (
    <>
      {/*TODO order by deadline */}
      <MissedDocuments documents={data.documents}/>
      <MissedTrainings trainings={data.online_trainings}/>
    </>
  )
}

export default MissedRecordsPage;