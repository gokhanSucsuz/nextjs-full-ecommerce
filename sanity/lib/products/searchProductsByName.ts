import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductsByName = async (name: string) => {
	const SEARCH_PRODUCTS_BY_NAME_QUERY = defineQuery(`
        *[ _type == "product" && name match $name ] | order(name asc)`);
	try {
		const products = await sanityFetch({
			query: SEARCH_PRODUCTS_BY_NAME_QUERY,
			params: {
				name: `*${name}*`
			}
		});
		return products.data || [];
	} catch (error) {
		console.log("Error fetching products: ", error);
		return [];
	}
};
