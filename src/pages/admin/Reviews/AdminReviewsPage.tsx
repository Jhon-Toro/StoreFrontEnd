import React, { useEffect, useState } from "react";
import axiosInstance from "@api/axiosIntance";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Review } from "@interfaces/admin/reviews/review.interface";
import "./AdminReviewsPage.scss";

const AdminReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        fetchReviews();
    }, [token]);

    const fetchReviews = async () => {
        const response = await axiosInstance.get("/reviews/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
    };

    const deleteReview = async (id: number) => {
        await axiosInstance.delete(`/reviews/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(reviews.filter((review) => review.id !== id));
    };

    return (
        <div className="admin-reviews-page">
            <h1 className="page-title">Admin - Reviews</h1>
            <div className="reviews-container">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <h3 className="review-username">
                                    Review by: {review.username}
                                </h3>
                                <div className="review-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`star-icon ${
                                                i < review.rating
                                                    ? "filled"
                                                    : ""
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="review-date">
                                {new Date(
                                    review.created_at
                                ).toLocaleDateString()}
                            </p>
                            <p className="review-comment">{review.comment}</p>
                            <button
                                onClick={() => deleteReview(review.id)}
                                className="delete-button"
                            >
                                <TrashIcon className="delete-icon" />
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-reviews">No reviews available.</p>
                )}
            </div>
        </div>
    );
};

export default AdminReviewsPage;
