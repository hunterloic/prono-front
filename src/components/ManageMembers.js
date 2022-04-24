import React, { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { cloneDeep } from "lodash";

export default function ManageMembers({ show, members = [], onClose, onSave }) {
  const [currentMembers, setCurrentMembers] = useState(cloneDeep(members));

  const handleMemberChangeUserName = (member, userName) => {
    const newCurrentMembers = [...currentMembers];
    newCurrentMembers.filter((m) => m.tempId === member.tempId)[0].userName =
      userName;
    setCurrentMembers(newCurrentMembers);
  };

  const handleAddMember = () => {
    setCurrentMembers([...currentMembers, createNewMember()]);
  };

  const getLatestAddedMember = () => {
    return currentMembers.reduce(
      (prev, curr) => (curr.tempId && curr.tempId > prev.tempId ? curr : prev),
      { tempId: 0 }
    );
  };

  const createNewMember = () => {
    return { userName: "", tempId: getLatestAddedMember().tempId + 1 };
  };

  const handleRemoveMember = (member) => {
    setCurrentMembers([
      ...currentMembers.filter((c) => c.tempId !== member.tempId),
    ]);
  };

  console.log(members);

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap={2}>
            {currentMembers &&
              currentMembers.map((member, index) => (
                <Stack key={index} direction="horizontal" gap={2}>
                  <div>
                    <Form.Control
                      value={member.userName || ""}
                      onChange={(e) =>
                        handleMemberChangeUserName(member, e.target.value)
                      }
                    />
                  </div>
                  <div className="ms-auto">
                    <Button
                      className="my-2"
                      variant="danger"
                      onClick={() => {
                        handleRemoveMember(member);
                      }}
                    >
                      X
                    </Button>
                  </div>
                </Stack>
              ))}
            <Button variant="success" onClick={handleAddMember}>
              Add
            </Button>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              onSave(currentMembers.filter((member) => member.userName !== ""))
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
