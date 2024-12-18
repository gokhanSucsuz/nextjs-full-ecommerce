import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductThumb = ({ product }: { product: Product }) => {
	const isOutOfStock = product.stock != null && product.stock <= 0;
	return (
		<Link
			href={`/product/${product.slug?.current}`}
			className={`group flex flex-col bg-white rounded-lg border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""} dark:bg-gray-600 dark:text-white`}
		>
			<div className="relative aspect-square w-full h-full overflow-hidden">
				{product.image && (
					<Image
						className="object-contain transition-transform duration-300 group-hover:scale-105 pt-3"
						src={imageUrl(product.image).url()}
						alt={product.name || "Product Image"}
						fill
						sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
					/>
				)}
				
				{isOutOfStock && (
					<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
						<span className="text-white font-bold text-lg">Out of Stock</span>
					</div>
				)}
			</div>
			<div className="p-4">
				<h2 className="text-lg font-semibold dark:text-gray-50 text-gray-800 truncate">
					{product.name}
				</h2>
			</div>
			<p className="mt-2 text-sm text-gray-600 dark:text-gray-50 line-clamp-2 truncate p-4 mr-6">
				{product.description?.map((block) =>
					block._type === "block" ?
						block.children?.map((child) =>
			child.text).join(" ") : ""
				)}
			</p>
			<span className="indent-3 py-3">
				{product.price && <span className="text-lg font-bold text-gray-800 dark:text-gray-50">${product.price}</span>}
			</span>
			</Link>
	);
};

export default ProductThumb;
