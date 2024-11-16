import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosIntance";
import { RootState } from "../../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearOrder } from "../../store/slices/orderSlice";

const PayPalSuccessPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = useSelector((state: RootState) => state.order.orderId);
  const token = searchParams.get("token");

  useEffect(() => {
    const confirmPayment = async () => {
      if (orderId && token) {
        try {
          const response = await axiosInstance.get(`/orders/confirm?order_id=${orderId}&token=${token}`);
          if (response.data.payment_status === "APPROVED") {
            alert("Payment successful!");
            navigate("/orders");
          } else {
            alert("Payment failed or cancelled.");
          }
          dispatch(clearOrder());
        } catch (error) {
          console.error("Error confirming payment:", error);
          alert("Payment confirmation failed.");
        }
      }
    };
    confirmPayment();
  }, [dispatch, navigate, orderId, token]);

  return (
    <div>
      <h2>Confirming Payment...</h2>
    </div>
  );
};

export default PayPalSuccessPage;
