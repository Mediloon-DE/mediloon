import Image from "next/image";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full">
            <div className="relative h-48 w-full">
                <Image src={product.image} alt={product.name} fill className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
                <span className="text-sm text-gray-500 mb-2">{product.category}</span>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
                    {product.name}
                </h3>
                <div className="mt-auto pt-3 flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-700">
                        €{product.price.toFixed(2)}
                    </span>
                    <button
                        className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800 transition duration-300 whitespace-nowrap cursor-pointer">
                        In den Warenkorb
                    </button>
                </div>
            </div>
        </div>
    );
}