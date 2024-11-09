import React from "react";
import { Category, Product } from "../../sanity.types";
import ProductGrid from "./ProductGrid";
import CategorySelectorComponent from "../CategorySelectorComponent";

interface ProductsViewProps {
	products: Product[];
	categories: Category[];
}
const ProductView = ({ products, categories }: ProductsViewProps) => {
	return (
		<div className="flex flex-col">
			<div className="w-full sm:w-[200px]">
				{/* categories */}
				<CategorySelectorComponent categories={categories} />
			</div>
			<div>
				{/* products */}
				<div className="flex-1">
					<div>
						{/* product */}
						<ProductGrid products={products} />
						<hr className="w-1/2 sm:w-3/4" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductView;
