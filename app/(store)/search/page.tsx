import ProductGrid from "@/components/products/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

const SearchPage = async ({
	searchParams
}: {
	searchParams: Promise<{ query: string }>;
}) => {
	const { query } = await searchParams;
	const products = await searchProductsByName(query);
	return <div className="flex flex-col items-center justify-top min-h-screen bg-gray-300 dark:bg-gray-600 p-4">
			<div className="bg-white dark:bg-gray-400 p-8 rounded-lg shadow-md w-full max-w-4xl">
				<h1 className="text-3xl font-bold mb-6 text-center">
					{products.length > 0 ? `Search Results for ${query}` : "No results found"}
				</h1>
				<ProductGrid products={products} />
			</div>
		</div>;
};
export default SearchPage;
