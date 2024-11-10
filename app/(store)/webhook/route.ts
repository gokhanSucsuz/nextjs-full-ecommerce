import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
	const body = await req.text();
	const headersList = await headers();
	const sig = headersList.get("Stripe-Signature");

	if (!sig) {
		return NextResponse.json({ error: "Missing signature" }, { status: 400 });
	}

	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

	if (!webhookSecret) {
		return NextResponse.json(
			{ error: "Stripe webhook secret is not set" },
			{ status: 400 }
		);
	}

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
	} catch (error) {
		console.log("Webhook signature verification failed.", error);
		return NextResponse.json(
			{ error: "Webhook signature verification failed." },
			{ status: 400 }
		);
	}
	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;
		try {
			const order = await createOrderInSanity(session);
			console.log("Order created in Sanity: ", order);
		} catch (error) {
			console.log("Error creating order in Sanity: ", error);
			return NextResponse.json(
				{ error: "Error creating order in Sanity" },
				{ status: 500 }
			);
		}
	}
	return NextResponse.json({ recieved: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
	const {
		id,
		amount_total,
		currency,
		metadata,
		payment_intent,
		customer,
		total_details
	} = session;
	const {
		orderNumber,
		customerName,
		customerEmail,
		clerkUserId
	} = metadata as Metadata;

	const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
		id,
		{
			expand: ["data.price.product"]
		}
    );
    const sanityProducts = lineItemsWithProduct.data.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item.quantity || 0,
    }))
    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customer,
        clerkUserId: clerkUserId,
        customerEmail: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount ? 
            total_details.amount_discount / 100 : 0,
        products: sanityProducts,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString(),
    })
    return order;
}
