import { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Modal, Stack } from "react-bootstrap";
import { useAxios } from "../hooks/useAxios";

export default function Ladder() {
  const { axios } = useAxios();
  const [ladders, setLadders] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLadders() {
      setLadders((await axios.get("/ladder/group")).data);
    }

    fetchLadders();
  }, []);

  const handleJoinGroup = async () => {
    if (groupId === "") {
      setError("Group id is mandatory");
    }
    await axios.get(`/group/join?password=${groupId}`).catch((err) => {
      if (err.response.status == 404) {
        setError("Group does not exists");
      }
    });
  };

  const handleClose = () => setError("");

  console.log(ladders);

  return (
    <Container>
      {error && (
        <Modal show={error !== ""} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <div>
        <Alert variant="info" className="mx-1 my-2 p-2">
          You are not in any group. You can join a group to see the ladder.
        </Alert>
      </div>
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
    </Container>
  );
}
