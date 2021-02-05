import React from "react";

const formatted = (date) => date.substr(0,10).split("-").reverse().join(".");

export const FormattedDeadline = (cell, row) => {
  return <>{formatted(row.deadline.Time)}</>
}

export const FormattedRelease = (cell, row) => {
  return <>{formatted(row.release_date.Time)}</>
}

export const FormattedTookPlace = (cell, row) => {
  return <>{formatted(row.date.Time)}</>
}
