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
		<header className="flex flex-wrap justify-between items-center px-4 py-2">
			<div className="flex flex-wrap flex-1 w-full justify-between items-center gap-2">
				<div className="flex flex-wrap  justify-between items-center gap-2">
					<Link
					href="/"
					className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
				>
					GreatBazaar
				</Link>
				<form action={"/search"} className="relative flex gap-2 flex-wrap sm:flex-nowrap items-center justify-center text-xs sm:text-sm min-w-36">
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
				<div className="flex justify-center gap-1 items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none flex-wrap">
					<Link href="/basket" className="flex-1 flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
						<TrolleyIcon className="w-6 h-6"/>
					<span>My Basket</span>
					</Link>

					{/* User area */}
					<ClerkLoaded>
						<SignedIn>
							<Link href="/orders"
								className="flex-1 flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
								>
									<PackageIcon className="w-6 h-6" />
									<span>My Orders</span>
								</Link>
						</SignedIn>

						{
							user ? (
								<div className="flex items-center space-x-2">
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
									<div className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
					</ClerkLoaded>
				</div>
			</div>
		</header>
	);
};

export default Header;
