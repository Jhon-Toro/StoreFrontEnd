import axios from 'axios';

// Configuración de Axios para Resend
const resendAxiosInstance = axios.create({
    baseURL: 'https://api.resend.com',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer re_frPpaNV3_MrqNitArrM4vLhsyNhRq3TkF`, // Clave API de Resend
    },
    timeout: 5000, // Tiempo de espera opcional
});

export default resendAxiosInstance;
