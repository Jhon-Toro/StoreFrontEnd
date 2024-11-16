import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import './OrderCancelPage.scss';

const OrderCancelPage: React.FC = () => (
    <div className="order-cancel-page">
        <div className="cancel-icon-wrapper">
            <XCircleIcon className="cancel-icon" />
        </div>
        <h1>Payment Cancelled</h1>
        <p>Your payment was cancelled. Please try again if you wish to complete your order.</p>
        <button className="retry-button" onClick={() => window.history.back()}>
            Try Again
        </button>
    </div>
);

export default OrderCancelPage;
