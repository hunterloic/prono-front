import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useAxios } from "../hooks/useAxios";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const { axios } = useAxios();

  useEffect(() => {
    async function fetchCategories() {
      setCategories([
        ...(await axios.get("/categories")).data,
        { tempId: getLatestAddedCategory().tempId + 1 },
      ]);
    }

    fetchCategories();
  }, []);

  const categoryDeletedOrUpdateFilter = (category) =>
    category.updated || category.deleted;

  const handleUpdateCategories = async () => {
    setCategories([
      ...(
        await axios.put(
          "/categories",
          categories.filter((category) =>
            categoryDeletedOrUpdateFilter(category)
          )
        )
      ).data,
      { tempId: getLatestAddedCategory().tempId + 1 },
    ]);
  };

  const filterCategoriesById = (categories, category) => {
    return categories.filter((c) => {
      if (category.id) return c.id === category.id;
      if (category.tempId) return c.tempId === category.tempId;
      return false;
    })[0];
  };

  const handleChangeCategoryName = (category, name) => {
    const newCategories = [...categories];
    const categoryToUpdate = filterCategoriesById(newCategories, category);
    categoryToUpdate.name = name;
    categoryToUpdate.updated = true;
    setCategories(newCategories);
  };

  const handleChangeCategoryOrder = (category, order) => {
    const newCategories = [...categories];
    const categoryToUpdate = filterCategoriesById(newCategories, category);
    categoryToUpdate.order = parseInt(order);
    categoryToUpdate.updated = true;
    setCategories(newCategories);
  };

  const getLatestAddedCategory = () => {
    return categories.reduce(
      (prev, curr) => (curr.tempId && curr.tempId > prev.tempId ? curr : prev),
      { tempId: 0 }
    );
  };

  const handleAddCategory = () => {
    setCategories([
      ...categories,
      { tempId: getLatestAddedCategory().tempId + 1 },
    ]);
  };

  const handleRemoveCategory = (category) => {
    const newCategories = [...categories];
    const categoryToRemove = filterCategoriesById(newCategories, category);
    categoryToRemove.deleted = true;
    categoryToRemove.name = "";
    categoryToRemove.order = "";
    setCategories(newCategories);
  };

  return (
    <Container>
      <Stack direction="vertical" gap={2} className="my-2">
        <Button
          variant="success"
          onClick={handleUpdateCategories}
          disabled={
            categories.filter((category) =>
              categoryDeletedOrUpdateFilter(category)
            ).length === 0
          }
        >
          Submit
        </Button>
        {categories &&
          categories
            .filter((category) => !category.deleted)
            .map((category, index) => (
              <Stack key={index} direction="horizontal" gap={2}>
                <Form.Control
                  style={{ fontSize: "0.8em" }}
                  value={category.id || ""}
                  disabled
                />
                <Form.Control
                  type="number"
                  min="0"
                  value={category.order || ""}
                  onChange={(e) =>
                    handleChangeCategoryOrder(category, e.target.value)
                  }
                />
                <Form.Control
                  value={category.name || ""}
                  onChange={(e) =>
                    handleChangeCategoryName(category, e.target.value)
                  }
                />
                <Button
                  className="my-2"
                  variant="danger"
                  onClick={(e) => {
                    handleRemoveCategory(category);
                  }}
                >
                  X
                </Button>
              </Stack>
            ))}
        <Button variant="success" onClick={handleAddCategory}>
          Add
        </Button>
      </Stack>
    </Container>
  );
}
