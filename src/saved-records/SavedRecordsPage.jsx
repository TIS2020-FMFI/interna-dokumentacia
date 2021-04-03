import React, { useEffect, useState } from "react";
import MyBootstrapTable from "../components/Tables/MyBootstrapTable";
import { savedDocumentsColumns, savedTrainingsColumns } from "./columns";
import useDataApi from "../utils/useDataApi";
import { FetchError, FetchLoading } from "../components/FetchComponents";
import { orderBy, recordType } from "../utils/functions";
import { CustomAlert } from "../components/CustomAlert";
import EditRecordModal from "../components/Modals/EditRecordModal";

const SavedRecordsPage = () => {
  const [doc_data, isLoaded, error] = useDataApi("/document/edited");
  const [trn_data, isLoaded2, error2] = useDataApi("/training/edited");

  const [documents, setDocuments] = useState([]);
  const [trainings, setTrainings] = useState([]);

  const [notification, setNotification] = useState();
  const [formData, setFormData] = useState();

  useEffect(() => {
    if (doc_data && trn_data) {
      setDocuments(doc_data);
      setTrainings(trn_data);
    }
  }, [doc_data, trn_data]);

  if (error) {
    return <FetchError e={`Error: ${error.message}`} />;
  } else if (error2) {
    return <FetchError e={`Error: ${error2.message}`} />;
  } else if (!isLoaded || !doc_data || !isLoaded2 || !trn_data) {
    return <FetchLoading />;
  }

  const trn_columns = savedTrainingsColumns(
    setFormData,
    setTrainings,
    setNotification
  );
  const doc_columns = savedDocumentsColumns(
    setFormData,
    setDocuments,
    setNotification
  );

  return (
    <>
      {/* DOCUMENTS */}
      <MyBootstrapTable
        title="Saved trainings"
        data={documents}
        columns={doc_columns}
        order={orderBy("deadline.Time")}
      />
      {/* TRAININGS */}
      <MyBootstrapTable
        title="Saved documents"
        data={trainings}
        columns={trn_columns}
        order={orderBy("deadline.Time")}
      />
      {notification && <CustomAlert notification={notification} />}
      {formData && (
        <EditRecordModal
          setRecords={
            recordType(formData) === "document" ? setDocuments : setTrainings
          }
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
};

export default SavedRecordsPage;
