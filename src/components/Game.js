import React from "react";
import { Form, Stack, Button } from "react-bootstrap";
import Team from "./Team";
import { epochToDate } from "../utils/date";
import CountryFlag from "../components/CountryFlag";

export default function Game({ gameId, teams, category, startTime }) {
  return (
    <div
      className="d-flex flex-column my-1"
      style={{ border: "black solid 1px", backgroundColor: "red" }}
    >
      <div>{epochToDate("ddd, mmm dS, yyyy, h:MM TT", startTime)}</div>
      <div className="d-flex flex-row justify-content-start">
        <div
          className="d-flex flex-row justify-content-end"
          style={{
            border: "black solid 1px",
            backgroundColor: "yellow",
          }}
        >
          aa
          {/* <div
            className="align-self-center order-1 m-1"
            style={{ backgroundColor: "orange" }}
          >
            <CountryFlag code="fr" />
          </div>
          <div
            className="align-self-center order-2 m-1"
            style={{
              width: "4.5em",
              backgroundColor: "green",
              wordBreak: "break-all",
            }}
          >
            {teams[0].name}
          </div>
          <div className="align-self-center order-3 m-1">
            <Form.Control className="p-1" style={{ width: "2em" }} />
          </div> */}
        </div>

        {/* -------------- */}

        <div
          className="d-flex flex-row justify-content-end"
          style={{ border: "black solid 1px", backgroundColor: "yellow" }}
        >
          bb
          {/* <div
            className="align-self-center order-3 m-1"
            style={{ backgroundColor: "orange" }}
          >
            <CountryFlag code="fr" />
          </div>
          <div
            className="align-self-center order-2 m-1"
            style={{
              width: "4.5em",
              backgroundColor: "green",
              wordBreak: "break-all",
            }}
          >
            {teams[0].name}
          </div>
          <div className="align-self-center order-1 m-1">
            <Form.Control className="p-1" style={{ width: "30px" }} />
          </div> */}
        </div>
      </div>
    </div>

    // <div
    //   className="d-flex flex-column bg-info my-1"
    //   style={{ border: "black solid 1px" }}
    // >
    //   <div style={{ border: "red solid 1px" }}>
    //     {epochToDate("yyyy-MM-dd hh:mm", startTime)}
    //   </div>

    //   <div
    //     className="d-flex flex-row flex-wrap"
    //     style={{ border: "black solid 1px" }}
    //   >
    //     <div
    //       className="d-flex flex-row flex-wrap"
    //       style={{ border: "green solid 1px" }}
    //     >
    //       <div
    //         className="d-flex flex-row flex-wrap"
    //         style={{ border: "yellow solid 1px" }}
    //       >
    //         <div>a</div>
    //         <div>b</div>
    //         <div>c</div>
    //       </div>
    //     </div>

    //     <div
    //       className="d-flex flex-row flex-wrap"
    //       style={{ border: "green solid 1px" }}
    //     >
    //       <div
    //         className="d-flex flex-row"
    //         style={{ border: "yellow solid 1px" }}
    //       >
    //         <div>a</div>
    //         <div>b</div>
    //         <div>c</div>
    //       </div>
    //     </div>

    //     {/* <div className="d-flex flex-row">
    //       <div
    //         className="d-flex flex-row"
    //         style={{ border: "black solid 1px" }}
    //       >
    //         <div>
    //           <CountryFlag code="fr" />
    //         </div>
    //         <div>Flex item 2</div>
    //         <Form.Control className="p-1" style={{ width: "30px" }} />
    //       </div>
    //     </div> */}
    //   </div>
    // </div>

    // <>
    //   {teams.map((team, index) => {
    //     return (
    //       // <Col xs={6} key={team.teamId}>
    //       //   <Team order={index} gameId={gameId} {...team} />
    //       // </Col>
    //       <div className="d-flex flex-row">
    //         <div>
    //           hello{index}
    //           {/* <Team order={index} gameId={gameId} {...team} /> */}
    //         </div>
    //       </div>
    //     );
    //   })}
    // </>
  );
}
