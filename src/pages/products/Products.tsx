import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/slices/cartSlice';
import { Product } from '@interfaces/products/Products.interface';
import CartIcon from '@shared-components/cart-icon/CartIcon';
import SearchBar from '@shared-components/search-bar/SearchBar';
import axiosInstance from '@api/axiosIntance';
import Pagination from '@shared-components/pagination/Pagination';
import './Products.scss';
import ProductSlider from '@shared-components/product-slider/ProductSlider';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        filterAndSortProducts();
    }, [searchTerm, products, sortOrder, currentPage, minPrice, maxPrice]);

    const getProducts = async () => {
        try {
            const response = await axiosInstance.get(`/products/`);
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const filterAndSortProducts = () => {
        let filtered = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

        if (minPrice !== null) filtered = filtered.filter((product) => product.price >= minPrice);
        if (maxPrice !== null) filtered = filtered.filter((product) => product.price <= maxPrice);

        filtered = filtered.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

        const startIndex = (currentPage - 1) * productsPerPage;
        const paginatedProducts = filtered.slice(startIndex, startIndex + productsPerPage);

        setFilteredProducts(paginatedProducts);
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

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value as 'asc' | 'desc');
    };

    return (
        <div className="product-list-page">
            <ProductSlider />
            <header className="product-list-header">
                <h1>Todos nuestros productos</h1>
                <CartIcon />
            </header>

            <div className="product-controls">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="filter-controls">
                    <select className="sort-select" onChange={handleSortChange}>
                        <option value="asc">Precio: Menor a Mayor</option>
                        <option value="desc">Precio: Mayor a Menor</option>
                    </select>
                    <input type="number" placeholder="Precio Min." onChange={(e) => setMinPrice(Number(e.target.value) || null)} />
                    <input type="number" placeholder="Precio Max." onChange={(e) => setMaxPrice(Number(e.target.value) || null)} />
                </div>
            </div>

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <Link to={`/product/${product.id}`} className="product-image">
                                <img src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/200'} alt={product.title} />
                            </Link>
                            <div className="product-details">
                                <h3>{product.title}</h3>
                                <p className="product-price">Precio: ${product.price}</p>
                                <button onClick={() => handleAddToCart(product)} className="add-to-cart">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-products">No hay productos que coincidan con la búsqueda.</p>
                )}
            </div>

            <Pagination currentPage={currentPage} totalItems={products.length} itemsPerPage={productsPerPage} onPageChange={setCurrentPage} />
        </div>
    );
};

export default Products;
