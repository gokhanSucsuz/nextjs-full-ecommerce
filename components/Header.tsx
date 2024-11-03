"use client";

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";

const Header = () => {
	const { user } = useUser();
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
					className="flex text-lg md:text-lg lg:text-xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
				>
					GreatBazaar
				</Link>
				<form action={"/search"} className="relative flex gap-2 flex-wrap sm:flex-1 items-center justify-center text-xs sm:text-sm max-w-96 sm:w-full md:max-w-full">
					<input name="query"
						type="text"
						placeholder="Search..."
						className="
						bg-gary-100
						text-gray-800
						px-1
						py-2
						rounded
						focus:outline-none
						focus:ring-2
						focus:ring-blue-500
						focus:ring-opacity-50
						border
						w-full
						max-w-4xl"
					/>
					<Button  type="submit" className="absolute top-0 right-0 sm:w-auto h-full p-2 ">Search</Button>
				</form>
				</div>
				<div className="flex flex-col sm:flex-row justify-center md:justify-end gap-1 items-center  mt-4 sm:mt-0">
					<Link href="/basket" className="w-36 flex justify-center sm:justify-start sm:flex-none items-center  bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
						<TrolleyIcon className="w-6 h-6"/>
					<span>My Basket</span>
					</Link>

					{/* User area */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-2 space-x-2 ">
						<ClerkLoaded>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-2">
							<SignedIn>
								<Link href="/orders"
								className="w-36 flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								>
									<PackageIcon className="w-6 h-6" />
									<span>My Orders</span>
								</Link>
							</SignedIn>
						

							<div className="flex w-36 justify-center items-center">
														{
							user ? (
								<div className="flex flex-col sm:flex-row items-center space-x-2">
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
									<div className=" flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
										<SignInButton mode="modal" />
								</div>
							)
						}
						{
							user?.passkeys.length === 0 && (
								<Button onClick={createClerkPasskey}
									className="bg-white hover:bg-blue-700 hover:text-white
								animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
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
