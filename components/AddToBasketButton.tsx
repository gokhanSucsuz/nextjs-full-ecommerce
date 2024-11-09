"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/sanity.types";
import { Button } from "@/components/ui/button";
import useBasketStore from "@/store";

interface AddToBasketButtonProps {
	product: Product;
	disabled?: boolean;
}

const AddToBasketButton = ({ product, disabled }: AddToBasketButtonProps) => {
	const { addItem, removeItem, getItemCount } = useBasketStore();
	const itemCount = getItemCount(product._id);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}
	return (
		<div className="flex items-center justify-center space-x-2">
			<Button
				onClick={() => removeItem(product._id)}
				className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${itemCount ===
				0
					? "bg-gray-100 cursor-not-allowed"
					: "bg-gray-200 hover:bg-gray-300"}`}
				disabled={itemCount === 0 || disabled}
			>
				<span
					className={`text-xl font-bold ${itemCount === 0
						? "text-gray-400"
						: "text-gray-600"}`}
				>
					-
				</span>
			</Button>
			<span className="w-8 text-center font-semibold">
				{itemCount}
			</span>
			<Button
				onClick={() => addItem(product)}
				className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${disabled
					? "bg-gray-400 cursor-not-allowed"
					: "bg-green-500 hover:bg-green-600"}`}
			>
				<span className="text-xl font-bold text-white">+</span>
			</Button>
		</div>
	);
};

export default AddToBasketButton;
