import React, { useEffect, useState } from "react";
import axiosInstance from "@api/axiosIntance";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { Category } from "@interfaces/admin/categories/categories.interface";
import "./AdminCategoriesPage.scss";

const AdminCategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );
    const [newCategory, setNewCategory] = useState({ name: "", image: "" });
    const [currentPage] = useState(1);
    const itemsPerPage = 10;
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        fetchCategories();
    }, [token]);

    const fetchCategories = async () => {
        const response = await axiosInstance.get("/categories/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
    };

    const handleDelete = async (id: number) => {
        await axiosInstance.delete(`/categories/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchCategories();
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
    };

    const handleSave = async () => {
        if (editingCategory) {
            await axiosInstance.put(
                `/categories/${editingCategory.id}`,
                editingCategory,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setEditingCategory(null);
        } else {
            await axiosInstance.post("/categories/", newCategory, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNewCategory({ name: "", image: "" });
        }
        fetchCategories();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = categories.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <div className="admin-categories-page">
            <h1 className="page-title">Administrar Categorías</h1>

            <div className="category-form">
                <h2 className="form-title">
                    {editingCategory
                        ? "Editar Categoría"
                        : "Agregar Nueva Categoría"}
                </h2>
                <input
                    type="text"
                    placeholder="Nombre de la Categoría"
                    value={
                        editingCategory
                            ? editingCategory.name
                            : newCategory.name
                    }
                    onChange={(e) =>
                        editingCategory
                            ? setEditingCategory({
                                  ...editingCategory,
                                  name: e.target.value,
                              })
                            : setNewCategory({
                                  ...newCategory,
                                  name: e.target.value,
                              })
                    }
                />
                <input
                    type="text"
                    placeholder="URL de la Imagen"
                    value={
                        editingCategory
                            ? editingCategory.image
                            : newCategory.image
                    }
                    onChange={(e) =>
                        editingCategory
                            ? setEditingCategory({
                                  ...editingCategory,
                                  image: e.target.value,
                              })
                            : setNewCategory({
                                  ...newCategory,
                                  image: e.target.value,
                              })
                    }
                />
                <div className="form-buttons">
                    <button className="save-button" onClick={handleSave}>
                        {editingCategory
                            ? "Guardar Cambios"
                            : "Agregar Categoría"}
                    </button>
                    {editingCategory && (
                        <button
                            className="cancel-button"
                            onClick={() => setEditingCategory(null)}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </div>

            <ul className="category-list">
                {currentCategories.map((category) => (
                    <li key={category.id} className="category-item">
                        <h3 className="category-name">{category.name}</h3>
                        <img
                            src={category.image}
                            alt={category.name}
                            className="category-image"
                        />
                        <div className="action-buttons">
                            <button
                                className="edit-button"
                                onClick={() => handleEdit(category)}
                            >
                                Editar
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(category.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminCategoriesPage;
