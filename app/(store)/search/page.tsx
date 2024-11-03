const SearchPage = async ({
	searchParams
}: {
	searchParams: { query: string };
}) => {
	const { query } = await searchParams;
	return (
		<div>
			Search Params for {query}
		</div>
	);
};

export default SearchPage;
