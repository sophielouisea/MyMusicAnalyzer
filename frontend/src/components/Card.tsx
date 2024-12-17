import React from "react";
import "primeicons/primeicons.css";
import { Divider } from 'primereact/divider';

type CardProps = {
  title?: string;
};

const Card: React.FC<CardProps> = ({ title }): React.JSX.Element => {
  return (
    <div className="card">
      <div className="card-header">
        <p style={{marginTop: "0rem"}}>{title || "Empty Card"}</p>
        <i className="pi pi-arrow-up-right-and-arrow-down-left-from-center icon-button"></i>
      </div>
      <Divider/>
    </div>
  );
};

export default Card;
