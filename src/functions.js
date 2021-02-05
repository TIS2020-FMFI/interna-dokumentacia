import React from "react";

// export const require_superior = (row) => row.signatures.length > 1 || row.signatures[0].employee !== null
export const require_superior = (row) => {
  return row.require_superior && row.signatures[0].employee !== null
}

export const recordType = (row) => {
  if (Object.keys(row).includes('link')) {
    return "document";
  }
  return "training"
}

export const nonExpandableDocs = (documents) => {
  return documents.map(doc => !require_superior(doc) ? doc.id : null);
}

export const getSelectOptions = (field) => {
  return (
    <>
      <option hidden value="">Select option ...</option>
      {field.map(value => <option>{value}</option>)}
    </>
  )
}

// Authentication
export const setUser = (user) => sessionStorage.setItem('user', JSON.stringify(user))
export const defUser = () => sessionStorage.setItem('user', JSON.stringify({name: "admin", pass: "admin", image: "/avatar1.png"}))
export const getUser = () => JSON.parse(sessionStorage.getItem('user'))
export const removeUser = () => sessionStorage.removeItem('user')

// export const isAdmin = () => getUser().role === 'admin' // todo test
export const isAdmin = () => true
