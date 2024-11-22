import React, { useEffect, useState } from 'react';
import axiosInstance from '@api/axiosIntance';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import './AdminProductsPage.scss';
import Pagination from '@shared-components/pagination/Pagination';

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
}

const AdminProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10); // Define el número de productos por página
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axiosInstance.get('/products/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const mappedProducts = response.data.map((product: any) => ({
                ...product,
                image: product.images?.[0] || '',
            }));
            setProducts(mappedProducts);
        };
        fetchProducts();
    }, [token]);

    const deleteProduct = async (id: number) => {
        await axiosInstance.delete(`/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter((product) => product.id !== id));
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="admin-products-page">
            <header className="page-header">
                <h1>Admin - Products</h1>
                <button onClick={() => navigate('/admin/product/new')} className="add-product-button">
                    <PlusCircleIcon className="icon" />
                    Add Product
                </button>
            </header>
            <div className="products-grid">
                {currentProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img
                            src={product.image && product.image.length > 0 ? product.image : 'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg'}
                            alt={product.title}
                            className="product-image"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg';
                            }}
                        />
                        <div className="product-details">
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-price">Price: ${product.price.toFixed(2)}</p>
                            <div className="actions">
                                <button onClick={() => navigate(`/admin/product/${product.id}`)} className="edit-button">
                                    <PencilIcon className="icon" /> Edit
                                </button>
                                <button onClick={() => deleteProduct(product.id)} className="delete-button">
                                    <TrashIcon className="icon" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Asegúrate de usar los nombres correctos de las props */}
            <Pagination
                currentPage={currentPage}
                totalItems={products.length} // Cambia totalProducts por totalItems
                itemsPerPage={productsPerPage} // Cambia productsPerPage por itemsPerPage
                onPageChange={paginate} // Cambia paginate a onPageChange
            />
        </div>
    );
};

export default AdminProductsPage;
