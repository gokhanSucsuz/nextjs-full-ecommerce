"use server";

import { BasketItem } from "@/store";

export type Metadata = {
	orderNumber: string;
	customerNumber: string;
	cutomerEmail: string;
	clerkUserId: string;
};

export type GroupedBasketItem = {
	product: BasketItem["product"];
	quantity: number;
};
export const createCheckoutSession = async (
	items: GroupedBasketItem[],
	metadata: Metadata
) => {
	try {
		const itemsWithoutPrice = items.filter(item => !item.product.price);
		if (itemsWithoutPrice.length > 0) {
			throw new Error("Some items are missing a price.");
		}
	} catch (error) {
		console.log("Error creating checkout session: ", error);
		throw error;
	}
};
