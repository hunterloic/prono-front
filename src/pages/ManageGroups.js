import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import ManageMembers from "../components/ManageMembers";
import { useAxios } from "../hooks/useAxios";

export default function ManageGroups() {
  const [groups, setGroups] = useState([]);
  const [groupMembersModal, setgroupMembersModal] = useState({
    show: false,
    group: {},
  });
  const { axios } = useAxios();

  useEffect(() => {
    async function fetchGroups() {
      setGroups([...(await axios.get("/group")).data, , createNewGroup()]);
    }

    // fetchGroups();
  }, []);

  const createNewGroup = () => {
    return {
      tempId: getLatestAddedGroup().tempId + 1,
      members: [],
    };
  };

  const groupDeletedOrUpdateFilter = (group) => group.updated || group.deleted;

  const handleUpdateGroups = async () => {
    setGroups([
      ...(
        await axios.put(
          "/group",
          groups.filter((group) => groupDeletedOrUpdateFilter(group))
        )
      ).data,
      createNewGroup(),
    ]);
  };

  const filterGroupsById = (groups, group) => {
    return groups.filter((c) => {
      if (group.id) return c.id === group.id;
      if (group.tempId) return c.tempId === group.tempId;
      return false;
    })[0];
  };

  const handleChangeGroupName = (group, name) => {
    const newGroups = [...groups];
    const groupToUpdate = filterGroupsById(newGroups, group);
    groupToUpdate.name = name;
    groupToUpdate.updated = true;
    setGroups(newGroups);
  };

  const getLatestAddedGroup = () => {
    return groups.reduce(
      (prev, curr) => (curr.tempId && curr.tempId > prev.tempId ? curr : prev),
      { tempId: 0 }
    );
  };

  const handleAddGroup = () => {
    setGroups([...groups, createNewGroup()]);
  };

  const handleRemoveGroup = (group) => {
    const newGroups = [...groups];
    const groupToRemove = filterGroupsById(newGroups, group);
    groupToRemove.deleted = true;
    groupToRemove.name = "";
    groupToRemove.members = [];
    setGroups(newGroups);
  };

  const [modal, setModal] = useState();
  const handleClickMembers = (group) => {
    setModal(
      <ManageMembers
        show={true}
        members={group.members}
        onClose={() => {
          setModal(null);
        }}
        onSave={(members) => {
          const newGroups = [...groups];
          const groupToUpdate = filterGroupsById(newGroups, group);
          groupToUpdate.updated = true;
          groupToUpdate.members = members;
          setGroups(newGroups);
          setModal(null);
        }}
      />
    );
  };

  return (
    <Container>
      {modal}
      <Stack direction="vertical" gap={2} className="my-2">
        <Button
          variant="success"
          onClick={handleUpdateGroups}
          disabled={
            groups.filter((group) => groupDeletedOrUpdateFilter(group))
              .length === 0
          }
        >
          Submit
        </Button>
        {groups &&
          groups
            .filter((group) => !group.deleted)
            .map((group, index) => (
              <Stack key={index} direction="horizontal" gap={2}>
                <div>
                  <Form.Control
                    style={{ fontSize: "0.8em" }}
                    value={group.id || ""}
                    disabled
                  />
                </div>
                <div>
                  <Form.Control
                    value={group.name || ""}
                    onChange={(e) =>
                      handleChangeGroupName(group, e.target.value)
                    }
                  />
                </div>
                <div>
                  <Button
                    className="my-2"
                    variant="secondary"
                    onClick={(e) => {
                      handleClickMembers(group);
                    }}
                  >
                    Members
                  </Button>
                </div>
                <div className="ms-auto">
                  <Button
                    className="my-2"
                    variant="danger"
                    onClick={(e) => {
                      handleRemoveGroup(group);
                    }}
                  >
                    X
                  </Button>
                </div>
              </Stack>
            ))}
        <Button variant="success" onClick={handleAddGroup}>
          Add
        </Button>
      </Stack>
    </Container>
  );
}
