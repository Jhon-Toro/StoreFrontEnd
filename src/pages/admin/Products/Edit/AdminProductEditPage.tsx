import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@api/axiosIntance';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { Product } from '@interfaces/admin/products/edit/products.interface';
import { Category } from '@interfaces/admin/categories/categories.interface';
import './AdminProductEditPage.scss';

const AdminProductEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product>({
        title: '',
        description: '',
        price: 0,
        images: [],
        category_id: '',
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== 'new') {
            axiosInstance
                .get(`/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => setProduct(response.data));
        }
        fetchCategories();
    }, [id, token]);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/categories/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id === 'new') {
            await axiosInstance.post('/products/', product, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            await axiosInstance.put(`/products/${id}`, product, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        navigate('/admin/products');
    };

    return (
        <div className="admin-product-edit-page">
            <h1>{id === 'new' ? 'Create Product' : 'Edit Product'}</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <label className="form-label">
                    Title
                    <input type="text" value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} placeholder="Enter product title" className="form-input" />
                </label>
                <label className="form-label">
                    Description
                    <textarea
                        value={product.description}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                description: e.target.value,
                            })
                        }
                        placeholder="Enter product description"
                        className="form-textarea"
                    />
                </label>
                <label className="form-label">
                    Price
                    <input
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                price: parseFloat(e.target.value),
                            })
                        }
                        placeholder="Enter product price"
                        className="form-input"
                    />
                </label>
                <label className="form-label">
                    Category
                    <select
                        value={product.category_id}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                category_id: e.target.value,
                            })
                        }
                        className="form-select"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="form-label">
                    Image URL
                    <input type="text" value={product.images[0] || ''} onChange={(e) => setProduct({ ...product, images: [e.target.value] })} placeholder="Enter image URL" className="form-input" />
                </label>
                <button type="submit" className="save-button">
                    Save
                </button>
            </form>
        </div>
    );
};

export default AdminProductEditPage;
