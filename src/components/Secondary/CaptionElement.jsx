import React from "react";

const CaptionElement = ({title}) => {
  return (
    <h3 style={{
      borderRadius: '0.25em',
      textAlign: 'center',
      border: '2px solid gray',
      maxWidth: "80%",
      margin: "0 10% 2%",
      padding: '0.5em',
      marginTop: '3%'
    }}>{title}</h3>
  )
}

export default CaptionElement;
