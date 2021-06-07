import React from "react";
import uuid from "react-uuid";
import { comboFields, comboFieldsSingular } from "./data";
import { proxy_url } from "./data";

// Tables
export const buttonColumn = (field = "", text = "") => {
  return {
    dataField: "" + field,
    text: text,
    sort: true,
    headerStyle: { width: "1%" },
  };
};

export const recordType = (record) => {
  return Object.keys(record).includes("link") ? "document" : "training";
};

export const require_superior = (rec) => rec.require_superior === true;

export const nonExpandableDocs = (documents) => {
  return documents.map((doc) => {
    if (!require_superior(doc)) return doc.id;
  });
};

export const orderBy = (field, order = "asc") => {
  return [{ dataField: field, order: order }];
};

// Authentication
export const setUser = (user) =>
  sessionStorage.setItem("user", JSON.stringify(user));
export const getUser = () => JSON.parse(sessionStorage.getItem("user"));
export const removeUser = () => sessionStorage.removeItem("user");
export const isAdmin = () => getUser() !== null && getUser().role === "admin";

// Helpers
export const goodMsg = (body) => {
  return { variant: "success", body: body };
};

export const badMsg = (body) => {
  return { variant: "danger", body: body };
};

export const successResponse = (response) => {
  return 200 <= response.status && response.status <= 299;
};

export const getLanguage = () => JSON.parse(sessionStorage.getItem("language"));
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Add record forms
export const getFormID = (form) => (form ? form.id : 0);

export const getSelectOptions = (field) => {
  return (
    <>
      <option hidden value="">
        Select option ...
      </option>
      {field.map((value) => (
        <option value={value} key={uuid()}>
          {value}
        </option>
      ))}
    </>
  );
};

export const setOf = (array) => {
  const set = [];
  array.forEach((arr) => {
    if (!set.find((res) => res.value === arr.value)) set.push(arr);
  });
  return set; // array of unique objects by their .value
};

export const emptyCombination = (combination) => {
  return comboFields.every((field) => combination[field].length === 0);
};

export const prepareCombinations = (combinations) => {
  return combinations.map((c) => {
    const combination = {};
    comboFieldsSingular.forEach((field) => {
      combination[field] = {
        value: c[`${field}_id`],
        label: c[`${field}_name`],
      };
    });
    return combination;
  });
};

export const getOptionsForSelect = (pairs) => {
  return {
    branches: pairs.branches.map((n) => {
      return { value: n.id, label: n.name };
    }),
    divisions: pairs.divisions.map((n) => {
      return { value: n.id, label: n.name };
    }),
    departments: pairs.departments.map((n) => {
      return { value: n.id, label: n.name };
    }),
    cities: pairs.cities.map((n) => {
      return { value: n.id, label: n.name };
    }),
  };
};

export const resolveFilter = (f) => {
  return {
    branch: f.branches.map((v) => v.value).join(","),
    city: f.cities.map((v) => v.value).join(","),
    department: f.departments.map((v) => v.value).join(","),
    division: f.divisions.map((v) => v.value).join(","),
  };
};

function getState(sign, require_superior) {
  if (sign.cancel) return "-";
  let state = sign.e_date.Valid ? "" : "e";
  if (require_superior && !sign.s_date.Valid) {
    state += "s";
  }
  return state;
}

export const prepareSMData = (docs) => {
  return docs.map((doc) => {
    return {
      id: doc.id,
      name: doc.name,
      require_superior: doc.require_superior,
      deadline: doc.deadline.Time,
      employees: doc.signatures
        .filter((sign) => sign.employee !== null)
        .map((sign) => {
          return {
            id: sign.employee.id,
            sign_id: sign.id,
            state: getState(sign, doc.require_superior),
          };
        }),
    };
  });
};

export const getAssignedTo = (document, pairs, employees) => {
  if (!document) return [];

  return document.assigned_to.split("&").map((e) => {
    const [combs, remEms, _] = e.split("#");
    const values = combs.split("; ");
    const combination = { id: uuid() };

    comboFields.forEach((field, i) => {
      combination[field] = [];
      if (values[i] !== "x") {
        const ids = values[i].split(",");
        ids.forEach((id) => {
          combination[field].push({
            value: id,
            label: getFieldName(field, id, pairs),
          });
        });
      }
    });
    combination.removedEmployees = [];
    if (!remEms) return combination;

    const e_ids = remEms.split(",");
    console.log(e_ids);
    e_ids.forEach((id) => {
      combination.removedEmployees.push({
        value: id,
        label: getEmployeeName(id, employees, pairs.departments),
      });
    });
    console.log(combination);
    return combination;
  });
};

export const getFieldName = (field, id, pairs) => {
  return pairs[field].find((f) => f.id == id)?.name;
};

export const getEmployeeName = (id, employees, departments) => {
  if (!employees) return "unknown";
  const e = employees.find((e) => e.id.toString() === id);
  if (!e) return "unknown";
  return getEmployeeLabel(e, departments);
};

export const getSingularFieldName = (field) => {
  switch (field) {
    case "branches":
      return "branch";
    case "divisions":
      return "division";
    case "departments":
      return "department";
    case "cities":
      return "city";
  }
};

export const getEmployeesNames = (formData, employees) => {
  employees = sortByName(employees);
  if (!formData || !formData.employees) return [];
  return formData.employees
    .split(",")
    .map((a) => employees.find((e) => e.id == a));
};

export const prefillDocumentForm = (data) => {
  if (!data) return {};
  return {
    ...data,
    release_date: getDateString(data.release_date),
    deadline: getDateString(data.deadline),
  };
};

export const prefillTrainingForm = (data) => {
  if (!data) return {};
  return {
    ...data,
    date: getDateString(data.date),
    deadline: getDateString(data.deadline),
  };
};

export const correctTrainingFormData = (data, attendees) => {
  return {
    ...data,
    date: getDateObject(data.date),
    deadline: getDateObject(data.deadline),
    employees: attendees.map((a) => a.id).join(","),
  };
};

export const correctDocumentFormData = (data, combinations) => {
  return {
    ...data,
    release_date: getDateObject(data.release_date),
    deadline: getDateObject(data.deadline),
    assigned_to: resolveCombinations(combinations),
  };
};

const getDateObject = (date) => {
  return {
    Time: date + "T00:00:00Z",
    Valid: true,
  };
};

const getDateString = (date) => date.Time.substr(0, 10);

export const resolveCombinations = (combinations) => {
  // TODO
  const n = combinations.map((combination) => {
    let c_string = comboFields
      .map((field) => {
        const values = combination[field];
        console.log("values", values);
        if (!values.length) return "x";
        return values.map((c) => c.value).join(",");
      })
      .join("; ");
    const r_string = combination.removedEmployees.map((c) => c.value).join(",");
    return `${c_string}#${r_string}#`;
  });
  console.log(n);
  return n.join("&");
};

export const sortByName = (employees) => {
  return employees.sort(function (a, b) {
    if (a.last_name < b.last_name) {
      return -1;
    }
    if (a.last_name > b.last_name) {
      return 1;
    }
    return 0;
  });
};

export const prepareEmployees = (employees, departments) => {
  employees = sortByName(employees);
  return employees.map((e) => {
    return {
      value: e.id,
      label: getEmployeeLabel(e, departments),
    };
  });
};

export const getEmployeeLabel = (employee, departments) => {
  const { id, first_name, last_name, department_id } = employee;
  const dep = departments.find((d) => d.id === department_id)?.name;
  return `${first_name} ${last_name} [${id}, ${dep}]`;
};

export const prepareFoundDocs = (found, pairs) => {
  if (!found.length) return [];

  function getLabels(cs, field) {
    const labels = cs.map((c) => c[field].map((f) => f.label));
    const unique = [...new Set(labels.flat())];
    // if (unique[0] === undefined) {
    //   return "*";
    // }
    return unique.join(", ");
  }

  return found.map((doc) => {
    const doc_cs = getAssignedTo(doc, pairs);
    return {
      ...doc,
      branches: getLabels(doc_cs, "branches"),
      cities: getLabels(doc_cs, "cities"),
      divisions: getLabels(doc_cs, "divisions"),
      departments: getLabels(doc_cs, "departments"),
    };
  });
};

// fetch
export const getFetch = (url) => {
  return fetch(proxy_url + url, {
    method: "GET",
  }).then((result) => result.json());
};

export const postFetch = (url, body) => {
  return fetch(proxy_url +url, {
    method: "POST",
    body: body,
  }).then((result) => result.json());
};

export const reloadPage = () => window.location.reload(false);
export const redirectTo = (path) => window.location.replace(path);
