import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '@store/slices/cartSlice';
import { Product } from '@interfaces/products/Products.interface';
import CartIcon from '@shared-components/cart-icon/CartIcon';
import SearchBar from '@shared-components/search-bar/SearchBar';
import axiosInstance from '@api/axiosIntance';
import ProductSlider from '@shared-components/product-slider/ProductSlider';
import './../ProductList/ProductListPage.scss';
import './Products.scss';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { categoryId } = useParams<{ categoryId: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, [categoryId]);

    useEffect(() => {
        filterSearch();
    }, [searchTerm, products]);

    const getProducts = () => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get(`/products`);
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    };

    const filterSearch = () => {
        const filtered = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredProducts(filtered);
    };

    const handleAddToCart = (product: Product) => {
        dispatch(
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.images[0],
            })
        );
    };

    return (
        <div className="product-list-page">
            <ProductSlider />
            <header className="product-list-header">
                <h1>Todos nuestros productos</h1>
                <CartIcon />
            </header>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Link to={`/product/${product.id}`} className="product-link" key={product.id}>
                            <div className="product-card">
                                <div className="product-image">
                                    <img
                                        src={
                                            product.images && product.images.length > 0
                                                ? product.images[0]
                                                : 'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg'
                                        }
                                        alt={product.title}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg';
                                        }}
                                    />
                                </div>
                                <div className="product-details">
                                    <h3>{product.title}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <p className="product-price">Precio: ${product.price}</p>
                                    <button onClick={() => handleAddToCart(product)} className="add-to-cart">
                                        Agregar al Carrito
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="no-products">No hay productos que coincidan con la búsqueda.</p>
                )}
            </div>
        </div>
    );
};

export default Products;
