import { useState } from 'react';
import Modal from 'react-modal';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
}

const ProductModal = ({ product }: { product: Product }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button onClick={openModal}>Vista Rápida</button>

            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Vista rápida del producto" className="modal" overlayClassName="overlay">
                <h2>{product.title}</h2>
                <img src={product.images[0]} alt={product.title} />
                <p>{product.description}</p>
                <p>Precio: ${product.price}</p>
                <button onClick={closeModal}>Cerrar</button>
            </Modal>
        </div>
    );
};

export default ProductModal;
