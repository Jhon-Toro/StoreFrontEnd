import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@interfaces/category/Category.interface';
import SearchBar from '@shared-components/search-bar/SearchBar';
import axiosInstance from '@api/axiosIntance';
import './CategoriesPage.scss';
import CartIcon from '@shared-components/cart-icon/CartIcon';

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        filter();
    }, [searchTerm, categories]);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/categories/');
            setCategories(response.data);
            setFilteredCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const filter = () => {
        let filtered = categories;
        if (searchTerm) filtered = filtered.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setFilteredCategories(filtered);
    };

    return (
        <div className="category">
            <header className="categories-list-header">
                <h1>Categorías</h1>
                <CartIcon />
            </header>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Buscar categoría..." />

            <ul className="category-list">
                {filteredCategories.map((category) => (
                    <li key={category.id} className="category-card">
                        <Link to={`category/${category.id}/products`} className="category-link">
                            <img src={category.image} alt={category.name} className="category-image" />
                            <h3 className="category-name">{category.name}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesPage;
