import React from "react";

export const hasSubs = (row) => {
  return Object.keys(row).includes('sub');
};

export const recordType = (row) => {
  if (Object.keys(row).includes('link'))
    return "doc";
  else
    return "training"
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

export const setUser = (user) => sessionStorage.setItem('user', JSON.stringify(user))
export const defUser = () => sessionStorage.setItem('user', JSON.stringify({name: "admin", pass: "admin", image: "/avatar1.png"}))
export const getUser = () => JSON.parse(sessionStorage.getItem('user'))
export const removeUser = () => sessionStorage.removeItem('user')

export const isAdmin = () => true
