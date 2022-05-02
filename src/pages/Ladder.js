import { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Modal, Stack } from "react-bootstrap";
import { useAxios } from "../hooks/useAxios";

export default function Ladder() {
  const { axios } = useAxios();
  const [ladders, setLadders] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function fetchLadders() {
      setLadders((await axios.get("/ladder/group")).data);
    }

    fetchLadders();
  }, []);

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
      setInfo({ title: "Info", message: "Join group successfully" });
    }
  };

  const handleClose = () => setInfo("");

  return (
    <Container className="mx-10">
      {info && (
        <Modal show={info} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{info.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{info.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <div className="mx-1 my-2 p-2">
        {ladders.length <= 0 && (
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
    </Container>
  );
}
