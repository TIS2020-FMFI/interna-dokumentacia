import React, { useContext, useEffect, useState } from "react";
import Filter from "./Filter";
import SkillMatrix from "./skill-matrix/SkillMatrix";
import {
  prepareEmployees,
  getFetch,
  prepareCombinations,
  postFetch,
  prepareFoundDocs,
} from "../utils/functions";
import { PairContext } from "../App";
import FoundRecords from "./FoundRecords";
import { FetchLoading } from "../components/FetchComponents";
import { proxy_url } from "../utils/data";

const FinderPage = () => {
  const pairs = useContext(PairContext);

  const [cs, setCs] = useState([]); // all combinations
  const [es, setEs] = useState([]); // all employees
  const [em, setEm] = useState(); // selected employee in filter

  const [documents, setDocuments] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [SMData, setSMData] = useState([]);

  const [showSM, setShowSM] = useState();

  useEffect(() => {
    getFetch("/combinations").then((res) => setCs(prepareCombinations(res)));
    getFetch("/employees/all").then((res) =>
      setEs(prepareEmployees(res, pairs.departments))
    );
  }, []);

  useEffect(() => {
    getFetch("/document/actual").then((res) =>
      setDocuments(prepareFoundDocs(res, pairs))
    );
  }, [cs]);

  const resetTables = () => {
    setDocuments([]);
    setTrainings([]);
  };

  const searchByCombination = (filter) => {
    resetTables();
    console.log(filter);
    postFetch(`/document/filter`, JSON.stringify(filter)).then((r) =>
      setDocuments(prepareFoundDocs(r, pairs))
    );
  };

  const searchByEmployee = (employee) => {
    if (!employee) return;
    console.log(employee);
    setEm(employee);
    resetTables();

    const id = employee.value;
    getFetch(`/signed/signatures/${id}`).then((r) => {
      console.log(r);
      let trainings = addCompleteness(r.trainings, 100);
      setTrainings((prevState) => [...prevState, ...trainings]);

      let documents = addCompleteness(r.documents, 100);
      documents = prepareFoundDocs(documents, pairs);
      setDocuments((prevState) => [...prevState, ...documents]);
    });

    getFetch(`/unsigned/signatures/${id}`).then((r) => {
      console.log(r);
      let trainings = addCompleteness(r.trainings, 0);
      setTrainings((prevState) => [...prevState, ...trainings]);

      let documents = addCompleteness(r.documents, 0);
      documents = prepareFoundDocs(documents, pairs);
      setDocuments((prevState) => [...prevState, ...documents]);
    });
  };

  const matrixByFilter = (filter) => {
    console.log(filter);
    fetch(proxy_url + `skill/matrix`, {
      method: "POST",
      body: new URLSearchParams(`filter=${JSON.stringify(filter)}`),
    })
      .then((result) => result.json())
      .then((r) => {
        console.log(r);
        setSMData(r.documents);
      });
  };

  const matrixBySuperior = (superior) => {
    setEm(superior);

    const id = superior.value;

    fetch(proxy_url + `/skill/matrix`, {
      method: "POST",
      body: new URLSearchParams(`superior_id=${id}`),
    })
      .then((result) => result.json())
      .then((r) => {
        setSMData(r.documents);
      });
  };

  function addCompleteness(records, percentage) {
    return records.map((rec) => {
      return { ...rec, complete: percentage };
    });
  }

  if (!cs.length || !es.length) {
    return <FetchLoading />;
  }

  return (
    <div style={{ marginTop: "1%" }} className="finder">
      <Filter
        cs={cs}
        em={em}
        es={es}
        setEm={setEm}
        showSM={showSM}
        setShowSM={setShowSM}
        matrixByFilter={matrixByFilter}
        matrixBySuperior={matrixBySuperior}
        searchByEmployee={searchByEmployee}
        searchByCombination={searchByCombination}
      />
      {showSM ? (
        <SkillMatrix documents={SMData} />
      ) : (
        <FoundRecords
          documents={documents}
          setDocuments={setDocuments}
          trainings={trainings}
          setTrainings={setTrainings}
        />
      )}
    </div>
  );
};

export default FinderPage;
