import { createSlice } from '@reduxjs/toolkit'

const initialState = {

       orderItems: [
       ],
       selectedOrderItems: [],
       shippingAddress: [

       ],
        paymentMethod: '',
        itemPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
        userId: '',
        isPaid: false,
        paidAt: '',
        isDelivered: false,
        deliveredAt: '',
}

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
        const {orderItems} = action.payload;
        const itemOrder = state?.orderItems?.find((item) => item?.product === orderItems.product)
        if(itemOrder){
            itemOrder.amount += orderItems?.amount
        }else{
            state.orderItems.push(orderItems)
        }
    }, 
    increaseAmount: (state, action) => {
        const {idProduct} = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
        const itemOrderSelected = state?.selectedOrderItems?.find((item) => item?.product === idProduct)
        itemOrder.amount++;
        if(itemOrderSelected){
            itemOrderSelected.amount++;
        }
    },
    decreaseAmount: (state, action) => {
        const {idProduct} = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
        const itemOrderSelected = state?.selectedOrderItems?.find((item) => item?.product === idProduct)
        itemOrder.amount--;
        if(itemOrderSelected){
            itemOrderSelected.amount--;
        }
    },
    removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.filter(item => item.product !== idProduct);
            const itemOrderSelected = state.orderItems.filter(item => item.product !== idProduct);
            state.orderItems = itemOrder;
            state.selectedOrderItems = itemOrderSelected;
    },
    removeAllOrderProduct: (state, action) => {
        const {listChecked} = action.payload;
        const itemOrder = state?.orderItems?.filter(item => !listChecked.includes(item.product));
        state.orderItems = itemOrder;
    },
    selectedOrder: (state, action) => {
        const {listChecked} = action.payload;
        const orderSelected = []
        state.orderItems.forEach((order) => {
            if(listChecked.includes(order.product)){
                orderSelected.push(order)
            }
        });
        state.selectedOrderItems = orderSelected;
    }          
  },
});

// Action creators are generated for each case reducer function
export const { addOrderProduct, removeOrderProduct, increaseAmount, decreaseAmount, removeAllOrderProduct, selectedOrder} = orderSlide.actions

export default orderSlide.reducer