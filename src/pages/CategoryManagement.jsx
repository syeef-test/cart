import React, { useEffect, useState, useRef } from "react";
import appwriteService from "../appwrite/appwriteService";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const nameRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await appwriteService.getCategorys();
      console.log(response);
      setCategories(response.documents);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };

    if (isEditing) {
      await updateCategory(currentCategory.$id, category);
    } else {
      await addCategory(category);
    }

    nameRef.current.value = "";
    descriptionRef.current.value = "";

    setIsEditing(false);
    setCurrentCategory(null);
  };

  const addCategory = async (category) => {
    try {
      const response = await appwriteService.createCategory(category);
      if (response) {
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const updateCategory = async (categoryId, updatedCategory) => {
    try {
      const response = await appwriteService.updateCategory(
        categoryId,
        updatedCategory
      );
      if (response) {
        fetchCategories();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await appwriteService.deleteCategory(categoryId);
      if (response) {
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    nameRef.current.value = category.name;
    descriptionRef.current.value = category.description;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Category Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label>Name</label>
          <input type="text" ref={nameRef} required />
        </div>
        <div>
          <label>Description</label>
          <textarea ref={descriptionRef} />
        </div>
        <button type="submit">
          {isEditing ? "Update Category" : "Add Category"}
        </button>
      </form>
      <div>
        {categories.map((category) => (
          <div key={category.$id}>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button onClick={() => handleEdit(category)}>Edit</button>
            <button onClick={() => deleteCategory(category.$id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManagement;
