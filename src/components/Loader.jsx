import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loader({ loading }) {
    return loading ? <FontAwesomeIcon icon="fa-spinner" spin /> : null;
}
