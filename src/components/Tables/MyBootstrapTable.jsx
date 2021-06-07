import BootstrapTable from "react-bootstrap-table-next";
import React from "react";

const MyBootstrapTable = ({
  title,
  data,
  columns,
  order,
  expandRow,
  classes,
  ...rest
}) => {
  const TableHeader = () => {
    if (!title) return null;
    return (
      <h3
        style={{
          borderRadius: "0.25em",
          textAlign: "center",
          border: "2px solid gray",
          margin: "2% 0",
          padding: "0.5em",
          marginTop: "1.5%",
        }}
      >
        {title}
      </h3>
    );
  };

  const EmptyTable = () => <p>Table is empty</p>

  return (
    <>
      <TableHeader />
      <BootstrapTable
        keyField="id"
        hover
        classes={classes}
        data={data}
        columns={columns}
        noDataIndication={EmptyTable}
        defaultSorted={order}
        expandRow={expandRow}
        {...rest}
      />
    </>
  );
};

export default MyBootstrapTable;
