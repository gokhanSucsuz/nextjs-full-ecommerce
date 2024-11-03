import { Product } from "@/sanity.types";
import React from "react";

const ProductGrid = ({ products }: { products: Product[] }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4">
			{products.map(product =>
				<div key={product._id}>
					{product.name}
				</div>
			)}
		</div>
	);
};

export default ProductGrid;
