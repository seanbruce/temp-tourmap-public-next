const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEV_MODE = process.env.NODE_ENV === "development";
const PROD_MODE = process.env.NODE_ENV === "production";

export { NEXT_PUBLIC_API_URL, DEV_MODE, PROD_MODE };
