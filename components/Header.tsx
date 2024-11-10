"use client";
import Form from "next/form"
import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store";

const Header = () => {
	const { user } = useUser();
	const itemCount = useBasketStore((state) => state.items.reduce((total,item)=> total + item.quantity,0));
	const createClerkPasskey = async () => {
		try {
			const response =await user?.createPasskey()
			console.log(response)
		} catch(err) {
			console.log("Error: ", JSON.stringify(err,null,2))
		}
	}

	return (
		<header className="flex px-4 py-2">
			<div className="flex flex-col md:flex-row flex-wrap w-full justify-between items-center space-x-6">
				<div className="flex flex-col md:flex-row md:flex-1 justify-center md:justify-between flex-wrap w-full items-center gap-2 p-2">
					<Link
					href="/"
					className="flex text-lg md:text-lg lg:text-xl font-bold text-green-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
				>
					GreatBazaar
					</Link>
				<Form action={"/search"} className="relative flex gap-2 flex-wrap flex-1 items-center justify-center text-xs sm:text-sm w-full md:max-w-full">
					<input name="query"
						type="text"
						placeholder="Search for products..."
						className="
						bg-gary-100
						text-gray-800
						px-1
						py-2
						rounded
						focus:outline-none
						focus:ring-2
						focus:ring-green-500
						focus:ring-opacity-50
						border
						w-full
						max-w-4xl"
					/>
				</Form>

				</div>
				<div className="flex justify-center md:justify-end gap-1 items-center  mt-4 sm:mt-0">
					<Link href="/basket" className="relative w-36 flex justify-center sm:justify-start sm:flex-none items-center  bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 rounded ">
						<TrolleyIcon className="w-6 h-6" />
						<span className="absolute -top-2 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{itemCount}</span>
					<span>My Basket</span>
					</Link>

					{/* User area */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-2 space-x-2">
						<ClerkLoaded>
							<div className="flex  items-center justify-center gap-2">
							<SignedIn>
								<Link href="/orders"
								className="w-36 flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
								>
									<PackageIcon className="w-6 h-6" />
									<span>My Orders</span>
								</Link>
							</SignedIn>
							<div className="flex justify-start items-center">
														{
							user ? (
								<div className="flex flex-col sm:flex-row items-center space-x-1">
									<UserButton />
									<div className="hidden sm:block text-xs">
										<p className="text-gray-400">Welcome Back!
										</p>
										<p className="font-bold">
											{user.fullName}
										</p>
									</div>

								</div>
							) : (
									<div className=" flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 rounded ">
										<SignInButton mode="modal" />
								</div>
							)
						}
						{
							user?.passkeys.length === 0 && (
								<Button onClick={createClerkPasskey}
									className="bg-white hover:bg-green-700 hover:text-white
								animate-pulse text-green-500 font-bold py-2 px-4 rounded border-green-300 border"
								>Create Passkey</Button>
							)
						}
							</div>
							</div>
						</ClerkLoaded>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
