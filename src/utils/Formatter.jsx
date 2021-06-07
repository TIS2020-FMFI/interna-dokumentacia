import React from "react";
import { ExclamationTriangle } from "react-bootstrap-icons";

/** Couple of simple formatting functions to displays some cells of table  */
export const FullName = (_, { employee }) => {
  if (!employee) return;

  return (
    <>
      {employee.first_name} {employee.last_name}
    </>
  );
};

export const format_date = (date) => {
  const { Time, Valid } = date;
  if (!Valid) return "-";
  return Time.substr(0, 10).split("-").reverse().join(".");
};

export const FormattedDate = (_, row) => {
  return <>{format_date(row.date)}</>;
};

export const FormattedDeadline = (_, row) => {
  return <>{format_date(row.deadline)}</>;
};

export const FormattedRelease = (_, row) => {
  return <>{format_date(row.release_date)}</>;
};

export const FormattedSuperiorDate = (_, row) => {
  return <>{format_date(row.s_date)}</>;
};

export const FormattedTrainingDate = (_, row) => {
  return <>{format_date(row.signatures[0].date)}</>;
};

export const FormattedEmployeeDate = (_, row) => {
  return <>{format_date(row.e_date)}</>;
};

export const Percentage = (_, row) =>
  Math.round(row.complete * 100) / 100 + "%";

export const NameWithLink = (_, row) => {
  return (
    <a href={row.name} target="_blank" rel="noreferrer">
      {row.name}
    </a>
  );
};

export const DocumentLabel = (_, row) => {
  const ExclamationName = () => (
    <h5>
      <ExclamationTriangle style={{ color: "red", marginBottom: "6px" }} />{" "}
      {NameWithLink(_, row)}
    </h5>
  );

  const expired =
    row.deadline < Date.now() &&
    row.employees.find((e) => e.state.includes("e") || e.state.includes("s"));

  return <>{expired ? <ExclamationName /> : NameWithLink(_, row)}</>;
};

export const FormattedEmployee = (_, row) => {
  // const employee = employees[row-1]
  const employee = {};
  const percentage = 100; // TODO implement
  return (
    <div style={{ fontSize: "12px" }}>
      {employee.name}, {employee.job}, {percentage}%
    </div>
  );
};
