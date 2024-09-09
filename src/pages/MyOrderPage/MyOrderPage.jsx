import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';


const MyOrderPage = () => {
    const user = useSelector((state) => state.user)
    const fetchMyorder = async () => {
        const res = await OrderService.getOrderbyUserId(user?.id, user?.access_token)
        console.log('res', res);
        return res.data;
    }
    const queryOrder = useQuery({queryKey: ['orders'], queryFn: fetchMyorder})
    const { isLoading, data} = queryOrder
    console.log('data', data)

    return(
       <div>
        MyOrder
       </div>
    )

}
export default MyOrderPage;