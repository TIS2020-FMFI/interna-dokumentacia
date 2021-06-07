import React from "react";
import Spinner from "react-bootstrap/Spinner";

export const FetchLoading = () => <Spinner animation="border" className="m-5"/>
export const FetchError = ({e}) => <h6 className="p-5">{e}</h6>