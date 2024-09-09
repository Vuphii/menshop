import { axiosJWT } from "./UserService";

export const createOrder = async(data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL_BACKEND}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
        return res.data;
} 
export const getOrderbyUserId = async(id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/order/get-order-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
        return res.data;
}