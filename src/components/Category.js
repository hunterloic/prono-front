import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { startTimeComparator } from "../helper/game";
import Game from "./Game";

export default function Category({ category }) {
  return (
    <Card className="my-2">
      <Card.Header style={{ fontWeight: "600" }} className="p-2">
        {category[0].category.name}
      </Card.Header>
      <ListGroup>
        {category.sort(startTimeComparator).map((game, index) => (
          <ListGroup.Item key={index} className="p-1">
            <Game {...game} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
