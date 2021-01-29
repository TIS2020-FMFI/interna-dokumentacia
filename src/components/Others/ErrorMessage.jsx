import {ExclamationTriangle} from 'react-bootstrap-icons';

export const ErrorMessage = ({text}) => {

  const msg = text === undefined ? 'required field' : text;

  return (
    <span style={{color: "red"}}> <ExclamationTriangle/> {msg}</span>
  );
}