// import {badMsg, correctDocumentFormData, goodMsg, successResponse} from "./common_functions";
//
// export const onSubmit = (data, action) => {
//
//   const action2 = data.id ? 'update' : 'create'
//
//   if (action === "save") {
//     return upsert(data, action2)
//   }
//   return upsertConfirm(data, `${action2}/confirm`)
// }
//
// const upsert = (data, action) => {
//   let result = {
//     message: '',
//     id: undefined
//   }
//
//   fetch(proxy_url + `/document/${action}`, {
//     method: "POST",
//     body: JSON.stringify(data)
//   })
//   .then(res => {
//     if (successResponse(res)) {
//       // result.message(goodMsg(`${action} was successful`))
//       return res.json()
//     } else {
//       throw Error(`${action} failed`)
//     }
//   })
//   .then(res => {
//     result = res
//   })
//   .catch((e) => {
//     result = {
//       message: 'failed'
//     }
//     console.log(e)
//   })
//
//   return result
// }
//
// const upsertConfirm = (data, action) => {
//   return fetch(proxy_url + `/document/${action}`, {
//     method: "POST",
//     body: JSON.stringify(data)
//   })
// }
//
// export const filterSavedRec = (data, setRecords) => {
//   setRecords(prevState => prevState.filter(p => p.id !== data.id))
// }
//
// export const updateSavedRec = (data, setRecords) => {
//   setRecords(prevState => {
//     let update = prevState
//     const foundID = prevState.findIndex(p => p.id === data.id)
//     update[foundID] = data
//     return update
//   })
// }
