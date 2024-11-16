import React from "react";
import { Link } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import "./NotFound.scss";

const NotFoundPage: React.FC = () => (
  <div className="notfound">
    <div className="notfound-icon-wrapper">
        <ExclamationCircleIcon className="error-icon" />
    </div>
    <h2 className="notfound-title">Error 404</h2>
    <p>Lo sentimos, Esta página no fue encontrada.</p>
    <Link to="/" className="home-button">
        Volver a inicio
    </Link>
  </div>
);

export default NotFoundPage;