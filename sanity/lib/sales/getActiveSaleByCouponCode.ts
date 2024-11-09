import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { CouponCode } from "./couponCodes";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
	const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
        *[
        _type == "sales"
         && isActive == true
         && couponCode == $couponCode
         ] | order(validForm desc)[0]
          `);
	try {
		const activeSale = await sanityFetch({
			query: ACTIVE_SALE_BY_COUPON_QUERY,
			params: {
				couponCode
			}
		});
		return activeSale ? activeSale.data : null;
	} catch (error) {
		console.log("Error fetching sales: ", error);
		return null;
	}
};
