import React from "react";
import "primeicons/primeicons.css";
import { Divider } from "primereact/divider";
import { ArtistItem, TrackItem } from "@/types";
import { Image } from "primereact/image";
import { ScrollPanel } from "primereact/scrollpanel";

type CardProps = {
  title?: string;
  items?: ArtistItem[] | TrackItem[];
};

const Card: React.FC<CardProps> = ({ title, items }): React.JSX.Element => {
  const numItems = 20;

  // const ImageComponent = ({image: string | undefined}) => {
  //   if (image) {
  //     return <Image src={item.image} width="43" />
  //   } else {
  //     return <span style={{height: "43px"}}></span>
  //   }
  // }

  const renderItem = (item: ArtistItem | TrackItem) => {
    return (
      <>
        <p
          style={{
            marginBlock: "0rem",
            marginTop: "-1rem",
            marginInline: "1rem",
            fontSize: "15px",
            textAlign: "left",
            opacity: "80%",
            alignItems: "center",
            alignContent: "center",
            display: "flex",
            minHeight: "48px"
          }}
        >
          <span style={{ marginRight: "20px" }}>{item.personal_ranking}</span>
          <Image src={item.image} width="43" />
          <span style={{ marginInline: "20px" }}>{item.name}</span>
        </p>
        {item.personal_ranking < numItems ? (
          <Divider className="p-divider-items" />
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <p style={{ marginTop: "0rem" }}>{title || "Empty Card"}</p>
        {/* <i className="pi pi-arrow-up-right-and-arrow-down-left-from-center icon-button"></i> */}
      </div>
      <Divider />
      <div className="card-content">
        <ScrollPanel style={{ height: "115%" }} className="custombar2">
          {items
            ?.slice(0, numItems)
            .map((item, index) => <p key={index}>{renderItem(item)}</p>)}
        </ScrollPanel>
      </div>
    </div>
  );
};

export default Card;
