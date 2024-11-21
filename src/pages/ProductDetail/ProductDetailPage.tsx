import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosIntance';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { StarIcon as SolidStarIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import './ProductDetailPage.scss';
import CartIcon from '@shared-components/cart-icon/CartIcon';

interface Review {
    id: number;
    user_id: number;
    rating: number;
    comment: string;
    username: string;
    created_at: string;
}

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    reviews: Review[];
    average_rating: number | null;
}

const ProductDetailPage: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState<number>(5);
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/products/${productId}`);
                setProduct(response.data);
                setMainImage(response.data.images[0]);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(
                addToCart({
                    ...product,
                    quantity: 1,
                    image: product.images[0],
                })
            );
        }
    };

    const handleAddReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const response = await axiosInstance.post('/reviews/', {
                rating: newRating,
                comment: newComment,
                product_id: Number(productId),
            });
            setProduct((prevProduct) =>
                prevProduct
                    ? {
                          ...prevProduct,
                          reviews: [...prevProduct.reviews, response.data],
                      }
                    : null
            );
            setNewComment('');
            setNewRating(5);
        } catch (error) {
            console.error('Error adding review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageClick = (image: string) => setMainImage(image);

    return (
        <div className="product-detail-page">
            <header className="categories-list-header">
                <h1>Detalles del producto</h1>
                <CartIcon />
            </header>
            {product ? (
                <>
                    <div className="product-detail-container">
                        <div className="product-content">
                            <div className="product-images">
                                <div className="main-image">
                                    <img
                                        src={mainImage && mainImage.length > 0 ? mainImage : 'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg'}
                                        alt={product.title}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg';
                                        }}
                                    />
                                </div>
                                <div className="thumbnail-images">
                                    {product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image && image.length > 0 ? image : 'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg'}
                                            alt={`Thumbnail ${index}`}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg';
                                            }}
                                            onClick={() => handleImageClick(image)}
                                            className={mainImage === image ? 'selected' : ''}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="product-info">
                                <div className="product-header">
                                    <h1>{product.title}</h1>
                                    <p className="price">Price: ${product.price}</p>
                                    <div className="rating">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <SolidStarIcon key={i} className={`star-icon ${i < (product.average_rating || 0) ? 'filled' : ''}`} />
                                        ))}
                                        <span className="average-rating">({product.average_rating || 'No ratings yet'})</span>
                                    </div>
                                </div>
                                <p className="description">{product.description}</p>
                                <button onClick={handleAddToCart} className="add-to-cart">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <section className="reviews-section">
                        <h2>Reseñas de nuestros clientes</h2>
                        {product.reviews.length > 0 ? (
                            <ul className="review-list">
                                {product.reviews.map((review) => (
                                    <li key={review.id} className="review">
                                        <div className="review-header">
                                            <UserCircleIcon className="user-icon" />
                                            <div className="user-info">
                                                <p className="username">{review.username}</p>
                                                <p className="timestamp">{new Date(review.created_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="rating">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <SolidStarIcon key={i} className={`star-icon ${i < review.rating ? 'filled' : ''}`} />
                                            ))}
                                        </div>
                                        <p className="comment">{review.comment}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-reviews">No hay reseñas de momento.</p>
                        )}

                        <div className="add-review">
                            <h3>Añadir una reseña</h3>
                            <form onSubmit={handleAddReview}>
                                <div className="star-selector">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <button key={i} type="button" onClick={() => setNewRating(i + 1)} className="star-button">
                                            {i < newRating ? <SolidStarIcon className="star-icon filled" /> : <OutlineStarIcon className="star-icon" />}
                                        </button>
                                    ))}
                                </div>
                                <label>
                                    Comentario:
                                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
                                </label>
                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Enviar'}
                                </button>
                            </form>
                        </div>
                    </section>
                </>
            ) : (
                <p>Cargando detalles del producto..</p>
            )}
        </div>
    );
};

export default ProductDetailPage;
