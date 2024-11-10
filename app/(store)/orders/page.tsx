import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";




const OrdersPage = async () => {
  const { userId } = await auth();

	if (!userId) return redirect("/");
  const orders = await getMyOrders(userId);
  console.log(orders)
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
      {orders.map((order) => (
        <div key={order.orderNumber} className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
          <div>
            <p className="text-yellow-600 font-medium mb-1 text-sm sm:text-base">
              Order Number: <br />
              {order.orderNumber}
            </p>
          </div>

          <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-lg">
            <p className="text-slate-600 font-medium mb-1 text-sm sm:text-base">
              Order Date: <br />
              {order.orderDate}
            </p>
          </div>

          <div className="p-2 flex flex-col my-4">
            {order.products && order.products.length > 0 ? (
              order.products.map((product) => (
                <div key={crypto.randomUUID()} className="flex flex-col items-center gap-4 bg-white border-b-2 p-4 rounded-xl mb-4 text-sm">
                  <div className="flex justify-between w-full items-center gap-4">
                    <div className="relative w-16 h-16 flex">
					  {product?.product?.image && (
						  <Image
                        src={imageUrl(product?.product?.image).url()}
                        alt={product?.product?.name ?? "Product Image"}
                        fill
                        className="w-full object-contain transition-transform duration-300 hover:scale-105"
                      />
					  )}
                    </div>
                    <p className="w-64 text-sm flex flex-1 truncate-3">{product?.product?.name}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-gray-400">Quantity: {product.quantity}</p>
                    <p>
                      Price: {product.product?.price && product.quantity ? formatCurrency(product.product.price * product.quantity, order.currency) : "N/A"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found for this order.</p>
            )}
          </div>

          <div className="flex flex-col gap-4 justify-between w-full">
            <div className="flex items-center">
              <span className="text-sm mr-2">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm ${order.status === "paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {order.status}
              </span>
            </div>

            <div className="flex justify-between items-center sm:text-right">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
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
                  {formatCurrency((order.totalPrice ?? 0) + order.amountDiscount, order.currency)}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>}
			</div>
		</div>
	);
};

export default OrdersPage;
