import React from "react";
import { getUser, nonExpandableDocs, orderBy } from "../utils/functions";
import useDataApi from "../utils/useDataApi";
import { FetchError, FetchLoading } from "../components/FetchComponents";
import MyBootstrapTable from "../components/Tables/MyBootstrapTable";
import {
  signedDocumentsColumns,
  signedDocumentsExpandColumns,
  signedTrainingsExpandColumns,
} from "./columns";

const SignedRecordsPage = () => {
  const URL = `/signed/signatures/${getUser().id}`;
  const [data, isLoaded, error] = useDataApi(URL);

  if (error) {
    return <FetchError e={`Error: ${error.message}`} />;
  } else if (!isLoaded || !data) {
    return <FetchLoading />;
  }

  const documentsColumns = signedDocumentsColumns();
  const expandColumns = signedDocumentsExpandColumns();

  const trainingsColumns = signedTrainingsExpandColumns();

  const expandRow = {
    onlyOneExpanding: true,
    nonExpandable: nonExpandableDocs(data.documents),
    renderer: (cell) => (
      <MyBootstrapTable
        classes="inner-table"
        data={cell.signatures}
        columns={expandColumns}
        order={orderBy("employee.last_name")}
      />
    ),
  };

  return (
    <>
      <MyBootstrapTable
        title="Signed Documents"
        data={data.documents}
        columns={documentsColumns}
        expandRow={expandRow}
        order={orderBy("release_date.Time", "desc")}
      />
      <MyBootstrapTable
        title="Signed Trainings"
        data={data.trainings}
        columns={trainingsColumns}
        order={orderBy("date.Time", "desc")}
      />
    </>
  );
};

export default SignedRecordsPage;
