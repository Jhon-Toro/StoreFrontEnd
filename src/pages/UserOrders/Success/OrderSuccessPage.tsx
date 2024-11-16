import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../../../api/axiosIntance';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import './OrderSuccessPage.scss';

const OrderSuccessPage: React.FC = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const confirmPayment = async () => {
            const orderId = searchParams.get('orderId');
            const token = searchParams.get('token');

            if (orderId && token) {
                try {
                    const response = await axiosInstance.get(`/orders/confirm?order_id=${orderId}&token=${token}`);
                    console.log('Payment confirmed:', response.data);
                } catch (error) {
                    console.error('Error confirming payment:', error);
                }
            }
        };
        confirmPayment();
    }, [searchParams]);

    return (
        <div className="order-success-page">
            <div className="success-icon-wrapper">
                <CheckCircleIcon className="success-icon" />
            </div>
            <h1>Thank You for Your Purchase!</h1>
            <p>Your payment was successful, and your order has been confirmed.</p>
            <button className="continue-shopping-button" onClick={() => (window.location.href = '/')}>
                Continue Shopping
            </button>
        </div>
    );
};

export default OrderSuccessPage;
