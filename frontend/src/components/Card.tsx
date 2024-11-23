import React from "react";
import "primeicons/primeicons.css";

type CardProps = {
  title?: string;
};

const Card: React.FC<CardProps> = ({ title }): React.JSX.Element => {
  return (
    <div className="card">
      <div className="card-header">
        {title || "Empty Card"}
        <i className="pi pi-arrow-up-right-and-arrow-down-left-from-center icon-button"></i>
      </div>
    </div>
  );
};

export default Card;
