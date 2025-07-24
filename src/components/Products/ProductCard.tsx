import Link from "next/link";
import Image from "next/image";

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
            className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 hover:border-primary flex flex-col h-[350px]"
        >
            {/* Image Container */}
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        quality={80}
                        priority={false}
                    />
                ) : (
                    <Image
                        src="/images/paracetamol.png"
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        quality={80}
                        priority={false}
                    />
                )}
            </div>

            {/* Product Info */}
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-medium text-gray-900 line-clamp-2">
                    {product.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                    <p className="text-lg font-semibold text-primary">
                        €{product.price.toFixed(2)}
                    </p>
                    {product.quantity > 0 ? (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            In Stock
                        </span>
                    ) : (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                            Out of Stock
                        </span>
                    )}
                </div>

                {product.category && (
                    <span className="mt-2 text-xs text-gray-500">
                        {product.category}
                    </span>
                )}
            </div>
        </Link>
    );
}