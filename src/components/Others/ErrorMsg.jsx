import {ExclamationTriangle} from 'react-bootstrap-icons';

export const ErrorMsg = ({text}) => {
  return (
    <span style={{color: "red"}}><ExclamationTriangle/> required field</span>
  );
}