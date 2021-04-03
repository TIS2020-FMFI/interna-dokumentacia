import React, { useEffect, useState } from "react";
import MyBootstrapTable from "../components/Tables/MyBootstrapTable";
import {
  documentsToSignColumns,
  documentsToSignExpandColumns,
  trainingsToSignColumns,
} from "./columns";
import {
  getUser,
  nonExpandableDocs,
  orderBy,
  recordType,
  successResponse,
} from "../utils/functions";
import { FetchError, FetchLoading } from "../components/FetchComponents";
import useDataApi from "../utils/useDataApi";
import ConfirmModal from "../components/Modals/ConfirmModal";
import { proxy_url } from "../utils/data";

const RecordsToSignPage = () => {
  const URL = `/unsigned/signatures/${getUser().id}`;
  const [data, isLoaded, error] = useDataApi(URL);

  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);

  const [trainings, setTrainings] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (data) {
      setDocuments(data.documents);
      setTrainings(data.trainings);
    }
  }, [data]);

  if (error) {
    return <FetchError e={`Error: ${error.message}`} />;
  } else if (!isLoaded || !data) {
    return <FetchLoading />;
  }

  const handleAccept = () => {
    if (modalInfo.asSuperior) {
      signAsSuperior(modalInfo.id);
    } else {
      signAsEmployee(modalInfo.signatures[0].id);
    }
    setShowModal(false);
  };

  /** Update sign date to Date.now()
   * @param url:
   *    '/sign' update employee date
   *    '/sign/superior' update superior date
   * @param id: id of the document_signature
   * */
  const fetchSign = (url, id) => {
    return fetch(proxy_url +url, {
      method: "POST",
      body: new URLSearchParams(`id=${id}`),
    });
  };

  const signAsEmployee = (sign_id) => {
    const record_type = recordType(modalInfo);
    fetchSign(`/sign/${record_type}`, sign_id).then((res) => {
      if (successResponse(res)) {
        if (record_type === "training") updateTrainings(sign_id);
        else updateEmployeeDocs(sign_id);
      }
    });
  };

  const signAsSuperior = (signature_id) => {
    fetchSign("/sign/superior", signature_id).then((res) => {
      if (successResponse(res)) {
        updateSuperiorDocs(signature_id);
      }
    });
  };

  const updateTrainings = (signature_id) => {
    setTrainings(trainings.filter((t) => t.signatures[0].id !== signature_id));
  };

  const updateEmployeeDocs = (signature_id) => {
    setDocuments(documents.filter((d) => d.signatures[0].id !== signature_id));
  };

  const updateSuperiorDocs = (signature_id) => {
    const update = documents.map((d) => {
      return {
        ...d,
        signatures: d.signatures.filter((s) => s.id !== signature_id),
      };
    });
    setDocuments(update.filter((d) => d.signatures.length));
  };

  const trn_columns = trainingsToSignColumns(setModalInfo, setShowModal);
  const doc_columns = documentsToSignColumns(setModalInfo, setShowModal);
  const expandColumns = documentsToSignExpandColumns(
    setModalInfo,
    setShowModal
  );

  const expandRow = {
    onlyOneExpanding: true,
    nonExpandable: nonExpandableDocs(documents),
    renderer: (cell) => (
      <MyBootstrapTable
        classes="inner-table"
        data={cell.signatures}
        columns={expandColumns}
        order={orderBy("employee.last_name")}
      />
    ),
  };

  console.log(data);

  return (
    <>
      {/* DOCUMENTS */}
      <MyBootstrapTable
        title="Documents to sign"
        data={documents}
        columns={doc_columns}
        order={orderBy("deadline.Time")}
        expandRow={expandRow}
      />
      {/* TRAININGS */}
      <MyBootstrapTable
        title="Trainings to sign"
        data={trainings}
        columns={trn_columns}
        order={orderBy("deadline.Time")}
      />
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalInfo={modalInfo}
        handleAccept={handleAccept}
      />
    </>
  );
};

export default RecordsToSignPage;
