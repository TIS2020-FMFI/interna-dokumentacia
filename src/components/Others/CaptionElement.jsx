import React from "react";

const CaptionElement = ({title}) => {
  return (
    <h3 style={{
      borderRadius: '0.25em',
      textAlign: 'center',
      border: '2px solid gray',
      margin: "2% 0",
      padding: '0.5em',
      marginTop: '1.5%'
    }}>{title}</h3>
  )
}

export default CaptionElement;
