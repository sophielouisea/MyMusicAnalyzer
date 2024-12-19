import React, { ReactNode } from "react";
import "primeicons/primeicons.css";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";

type Props = {
  title: string;
  className: string;
  children: ReactNode;
};

const Card = ({ title, className, children }: Props): React.JSX.Element => {
  return (
    <div className={className || "card"}>
      <div className="card-header">
        <p style={{ marginTop: "0rem" }}>{title}</p>
      </div>
      <Divider />
      <div className="card-content">
        <ScrollPanel style={{ height: "320px" }} className="custombar2">
          {children}
        </ScrollPanel>
      </div>
    </div>
  );
};

export default Card;
