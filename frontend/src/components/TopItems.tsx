import React from "react";
import "primeicons/primeicons.css";
import { Divider } from "primereact/divider";
import { ArtistItem, TrackItem } from "@/types";
import { Image } from "primereact/image";

type CardProps = {
  items?: ArtistItem[] | TrackItem[];
  numItems?: number;
};

const TopItems = ({ items, numItems = 20 }: CardProps): React.JSX.Element => {

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
            minHeight: "48px",
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
    <>
      {items
        ?.slice(0, numItems)
        .map((item, index) => <p key={index}>{renderItem(item)}</p>) || ""}
    </>
  );
};

export default TopItems;
