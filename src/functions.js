import React from "react";

export const hasSubs = (row) => {
  return Object.keys(row).includes('sub');
};

/**
 * @return non expandable docs = tie ktore nie su s podpisom nadriadeneho
 * */
export const nonExpandableDocs = (documents) => {
  return documents.map(doc => !hasSubs(doc) ? doc.id : null);
}

/**
 * @return mapped field to the options
 * */
export const getSelectOptions = (field) => {
  return field.map(value => <option>{value}</option>);
}