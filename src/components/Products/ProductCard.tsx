
import Link from "next/link";

interface Product {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    category?: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/products/${product._id}`}
            className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
            {/* <div className="bg-gray-500 aspect-square"></div> */}
            <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-600 mt-1">€{product.price}</p>
                <p className="text-gray-600 mt-1">availability {product.quantity}</p>
            </div>
        </Link>
    );
}