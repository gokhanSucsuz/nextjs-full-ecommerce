"use client";
import React from "react";
import { clsx } from "clsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatCurrency";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
const OrderCard = ({ order }: any) => {
	const utcDate = new Date(order.orderDate);
	const localDate = new Date(utcDate.toLocaleString());
	console.log(order);
	return (
        <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
                    <div className="">
                        <p className="text-yellow-600 font-medium mb-1 text-sm sm:text-base">Order Number: <br />
                            {order.orderNumber}
                        </p>
                    </div>

                    <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-lg">
                        <p className="text-slate-600 font-medium mb-1 text-sm sm:text-base">Order Date: <br />
						{localDate.toLocaleDateString()} -
						{localDate.toLocaleTimeString()}
                        </p>
                    </div>

					<div className="p-2 flex flex-col my-4">
						{order.products.map((product: any, index:number) =>
							<div key={crypto.randomUUID()} className="flex flex-col items-center gap-4 bg-white  border-b-2 p-4  rounded-xl mb-4 text-sm">
                                <div className="flex justify-between w-full items-center gap-4">
                                    <div className="relative w-16 h-16 flex">
                                        <Image
                                    src={imageUrl(product.product.image).url()}
                                alt={product.product.name ?? "Product Image"}
                                    fill
                                className="w-full object-contain transition-transform duration-300 hover:scale-105 "
                                />
                                    </div>
                                <p className="w-64 text-sm flex flex-1 truncate-3">{product.product.name}</p>
                                </div>
                                <div className="flex justify-between w-full">
                                <p className="text-gray-400">Quantity: {product.quantity}</p>
                                <p>Price: {product.product?.price && product.quantity ? formatCurrency(product.product.price * product.quantity, order.currency) : "N/A"}</p>
                                </div>
                                
							</div>
						)}
                    </div>

                	<div className="flex flex-col gap-4  justify-between w-full">
						<div className="flex items-center">
							<span className="text-sm mr-2">Status:</span>
							<span
								className={`px-3 py-1 rounded-full text-sm ${order.status ===
								"paid"
									? "bg-green-100 text-green-80*0"
									: "bg-gray-100 text-gray-800"}`}
							>
								{order.status}
							</span>
                        </div>
                        <div className="flex justify-between  items-center sm:text-right">
                            <p className="text-sm text-gray-600 mb-1">
                                Total Amount
                            </p>
                            <p className="font-bold text-lg">
                                {formatCurrency(order.totalPrice ?? 0, order.currency)}
                            </p>
                        </div>
                
                {order.amountDiscount ? (
                    <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg">
                        <p className="text-red-600 font-medium mb-1 text-sm sm:text-base">Discount Applied: {" "}
                            {formatCurrency(order.amountDiscount, order.currency)}
                        </p>
                        <p className="text-sm text-gray-600">
                            Original Subtotal: {" "}
                            {formatCurrency((order.totalPrice ?? 0)+ order.amountDiscount, order.currency )}
                        </p>
                    </div>
                    ) : ""}
                    </div>
        </div>
						

	);
};

export default OrderCard;
