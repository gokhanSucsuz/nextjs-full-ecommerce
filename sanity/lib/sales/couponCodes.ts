export const COUPON_CODES = {
    BIGFRIDAY: 'BIGFRIDAY',
    BLACKFRIDAY: 'BLACKFRIDAY',
    CHRISTMAS: 'CHRISTMAS'
} as const;
export type CouponCode = keyof typeof COUPON_CODES