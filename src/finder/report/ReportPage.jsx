import React, { useEffect, useState } from "react";
import { buttonColumn, getFetch, orderBy } from "../../utils/functions";
import MyBootstrapTable from "../../components/Tables/MyBootstrapTable";
import { format_date } from "../../utils/Formatter";
import { proxy_url } from "../../utils/data";

const ReportPage = ({ location: { search } }) => {
  const [record, setRecord] = useState();
  const [employees, setEmployees] = useState([]);

  const getDate = (date) => {
    const f = format_date(date);
    if (f === "01.01.0001") {
      return "-";
    }
    return f;
  };

  useEffect(() => {
    const split = search.split("=");
    if (split.length !== 2) return null;

    const [query, id] = split;
    if (query !== "?id") return null;
    if (parseInt(id) != id) return null;

    // getFetch(`/report/${row.id}`)
    fetch(proxy_url + `/skill/matrix`, {
      method: "POST",
      body: new URLSearchParams(`document_id=${id}`),
    })
      .then((res) => res.json())
      .then((r) => {
        console.log(r);
        const rec = r.documents[0];
        setRecord(rec);
        console.log(rec);
        setEmployees(
          rec.signatures.map((sign) => {
            const { employee: e } = sign;
            return {
              id: e.id,
              name: `${e.first_name} ${e.first_name}`,
              date: getDate(sign.e_date?.Time),
            };
          })
        );
      });
  }, []);

  if (!record) return null;

  console.log(employees);

  const columns = [
    {
      ...buttonColumn("id"),
    },
    {
      dataField: "name",
      text: "Full name",
      sort: true,
    },
    {
      dataField: "date",
      text: "Sign Date",
      sort: true,
    },
  ];

  const title = `${record.name}, ${format_date(record.release_date?.Time)}`;

  return (
    <MyBootstrapTable
      title={title}
      data={employees}
      columns={columns}
      defaultSorted={orderBy("name")}
      // horizontal scroll
      wrapperClasses="table-responsive"
      rowClasses="text-nowrap"
    />
  );
};

export default ReportPage;
