import ProductView from "@/components/products/ProductView";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
	const products = await getAllProducts();
	const categories = await getAllCategories();
	console.log(products);
	return (
		<div>
			<h1>Hello World1213</h1>
			<div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
				<ProductView products={products} categories={categories} />
			</div>

			<Button variant={"default"}>Click</Button>
		</div>
	);
}
