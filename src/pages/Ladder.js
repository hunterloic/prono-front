import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import { useAxios } from "../hooks/useAxios";

export default function Ladder() {
  const { axios } = useAxios();
  const [ladders, setLadders] = useState({ groups: [] });
  const [groupId, setGroupId] = useState("");
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetchLadders();
  }, []);

  async function fetchLadders() {
    setLadders((await axios.get("/ladder/group")).data);
  }

  const handleJoinGroup = async () => {
    if (groupId === "") {
      setInfo("Group id is mandatory");
    }

    const response = await axios
      .get(`/group/join?password=${groupId}`)
      .catch((err) => {
        if (err.response.status == 404) {
          setInfo({ title: "Error", message: "Group does not exists" });
        }
      });

    if (response.status === 204) {
      setInfo({
        title: "Info",
        message: "Join group successfully",
        onClose: () => {
          fetchLadders();
          setGroupId("");
        },
      });
    }
  };

  const handleCloseInfo = (info) => {
    if (info.onClose) info.onClose();
    setInfo(null);
  };

  const handleLeaveGroup = async (groupName) => {
    await axios
      .get(`/group/leave?groupName=${groupName}`)
      .catch(() => {
        setInfo({
          title: "Error",
          message: "Error when leaving the group",
        });
      })
      .then(() => {
        setInfo({
          title: "Info",
          message: "You successfully left the group",
          onClose: fetchLadders,
        });
      });
  };

  const handleClickUser = () => {};

  return (
    <Container className="mx-10">
      {info && (
        <Modal show={info} onHide={() => handleCloseInfo(info)}>
          <Modal.Header closeButton>
            <Modal.Title>{info.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{info.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleCloseInfo(info)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <div className="mx-1 my-2 p-2">
        {ladders.groups.length <= 0 && (
          <div>
            <Alert variant="info">
              You are not in any group. You can join a group to see the ladder.
            </Alert>
          </div>
        )}
        <Stack direction="horizontal" gap={2}>
          <div>Enter the group identifier to join a group :</div>
          <div>
            <Form.Control
              placeholder="group id"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            />
          </div>
          <div>
            <Button onClick={handleJoinGroup}>Join</Button>
          </div>
        </Stack>
      </div>
      <div>
        <Row>
          {ladders.groups.map((group) => {
            return (
              <Col key={group.name} md="4" xs="6">
                <Card>
                  <Card.Header style={{ fontWeight: "600" }}>
                    <Stack direction="horizontal" gap={2}>
                      <div>{group.name}</div>
                      <div className="ms-auto">
                        <Button
                          className="m-1 p-1"
                          variant="danger"
                          onClick={(e) => {
                            handleLeaveGroup(group.name);
                          }}
                        >
                          Leave
                        </Button>
                      </div>
                    </Stack>
                  </Card.Header>
                  <Table striped bordered hover className={"m-0"}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.members
                        .sort((a, b) => b.points - a.points)
                        .map((member, index) => (
                          <tr
                            style={{ cursor: "pointer" }}
                            onClick={handleClickUser}
                          >
                            <td>{index + 1}</td>
                            <td>{member.userName}</td>
                            <td>{member.points}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
}
