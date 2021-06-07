import Alert from "react-bootstrap/Alert";

export const CustomAlert = ({notification}) => {

  if (!notification) return null

  return <Alert variant={notification.variant}>{notification.body}</Alert>
}