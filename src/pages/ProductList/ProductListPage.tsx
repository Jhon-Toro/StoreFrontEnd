import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosIntance";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import CartIcon from "../../components/shared-components/cart-icon/CartIcon";
import "./ProductListPage.scss";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
}

const ProductListPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { categoryId } = useParams<{ categoryId: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            if (categoryId) {
                try {
                    const response = await axiosInstance.get(
                        `/categories/${categoryId}/products`
                    );
                    setProducts(response.data);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            }
        };
        fetchProducts();
    }, [categoryId]);

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
        <div
            className={`product-list-page ${
                products.length < 1 ? "product-empty" : ""
            }`}
        >
            <header className="product-list-header">
                <h1>Productos de la Categoría {categoryId}</h1>
                <CartIcon />
            </header>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product, i) => (
                        <Link
                            to={`/product/${product.id}`}
                            key={i}
                            className="product-link"
                        >
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <img
                                        src={
                                            product.images &&
                                            product.images.length > 0
                                                ? product.images[0]
                                                : "https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg"
                                        }
                                        alt={product.title}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                "https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg";
                                        }}
                                    />
                                </div>
                                <div className="product-details">
                                    <h3>{product.title}</h3>
                                    <p className="product-description">
                                        {product.description}
                                    </p>
                                    <p className="product-price">
                                        ${product.price}
                                    </p>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="add-to-cart"
                                    >
                                        Agregar al Carrito
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="no-products">
                        No hay productos en esta categoría.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductListPage;
