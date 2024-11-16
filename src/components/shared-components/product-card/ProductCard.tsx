import { ProductCardProps } from '@interfaces/products/Product-card.interface';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <div className="product-card">
        <img src={product.image_url} alt={product.title} />
        <h2>{product.title}</h2>
        <p>${product.price.toFixed(2)}</p>
    </div>
);

export default ProductCard;
