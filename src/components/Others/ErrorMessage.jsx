import {ExclamationTriangle} from 'react-bootstrap-icons';
import {Alert} from "react-bootstrap";

export const ErrorMessage = ({text}) => {

  const msg = text === undefined ? 'required field' : text;

  return (
    <Alert variant="danger" style={{color: "red"}}>
      <ExclamationTriangle size="18" style={{marginBottom: "5px"}}/> {msg}
    </Alert >
  );
}