import OrderCard from "@/components/OrderCard";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const OrdersPage = async () => {
	const { userId } = await auth();
	if (!userId) return redirect("/");
	const orders = await getMyOrders(userId);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
			<div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
				<h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
					My Orders
				</h1>
				{orders.length === 0
					? <div className="text-center text-gray-600">
							<p>You have not placed any orders yet.</p>
						</div>
					: <div className="space-y-4 ">
							{orders.map(order => <OrderCard key={order._id} order={order} />)}
						</div>}
			</div>
		</div>
	);
};

export default OrdersPage;
