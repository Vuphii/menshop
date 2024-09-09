import { Col, Form, Radio } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { converPrice } from "../../utils";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from '../../components/MessageComponent/Message';
import { updateUser } from "../../redux/slides/useSlide";
import { LAble, WrapperInfo, WrapperContainer, WrapperValue, WrapperRight } from "./style";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";

const OrderSuccessPage = () => {
    const order = useSelector((state) => state.order);
    const location = useLocation();
    const {state} = location
    console.log('location', location);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [delivery, setDelivery] = useState('fast');
    const [payment, setPayment] = useState('later_money');
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
                city: user?.city,
            });
        }
    }, [isOpenModalUpdateInfo]);

    const handleChangeAddress = (() => {
        setIsOpenModalUpdateInfo(true);
    })

    const priceMemo = useMemo(() => {
        return order?.selectedOrderItems?.reduce((total, cur) => {
            return total + ((cur?.price * cur?.amount));
        }, 0);
    }, [order]);

    const priceDiscountMemo = useMemo(() => {
        const result = order?.selectedOrderItems?.reduce((total, cur) => {
            return total + ((cur?.discount * cur?.amount));
        }, 0);
        return Number(result) || 0;
    }, [order]);

    const deliveryMemo = useMemo(() => {
        if (priceMemo > 1000000) {
            return 10000;
        } else if (priceMemo === 0) {
            return 0;
        }
        return 20000;
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) * ((100 - Number(priceDiscountMemo)) / 100) + Number(deliveryMemo);
    }, [priceMemo, priceDiscountMemo, deliveryMemo]);

    const handleAddOrder = () => {
        if (user?.access_token && order?.selectedOrderItems && user?.name &&
            user?.address && user?.phone && user?.city && priceMemo && user?.id) {
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.selectedOrderItems,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethod: payment,
                itemPrice: priceMemo,
                shippingPrice: deliveryMemo,
                totalPrice: totalPriceMemo,
                userId: user?.id,
            }, {
                onSuccess: () => {
                    message.success('Đặt hàng thành công');
                }
            });
        }
    };

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        return UserService.updateUser(id, { ...rests }, token);
    });

    const mutationAddOrder = useMutationHooks((data) => {
        const { token, ...rests } = data;
        return OrderService.createOrder({ ...rests }, token);
    });

    const {isLoading, data} = mutationUpdate;
    const {isLoading: isLoadingAddOrder, data: dataOrder, isSuccess, isError} = mutationAddOrder;

    useEffect(()=>{
        if(isSuccess && dataOrder?.status === 'OK'){
            message.success('dat hang thanh cong');
        }
         else if(isError){
            message.error('dat hang thất bại');
        }
    }, [isSuccess, isError])


    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            phone: '',
            address: '',
            city: ''
        });
        form.resetFields();
        setIsOpenModalUpdateInfo(false);
    };

    const handleUpdateUserInfo = () => {
        const { name, phone, city, address } = stateUserDetails;
        if (name && phone && city && address) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    dispatch(updateUser({ name, phone, city, address }));
                    setIsOpenModalUpdateInfo(false);
                }
            });
        }
    };

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleDilivery = (e) => {
        setDelivery(e.target.value);
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
    };
    console.log('order', order, user)


    return (
        <div style={{ padding: '10px 50px', background: '#f5f5f5', width: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0' }}>
                <h3>Don hang dat thanh cong</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <WrapperInfo>
                            <LAble>Phương thức giao hàng</LAble>
                            <WrapperValue>
                                <span style={{ color: '#ea85500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                            </WrapperValue>
                        </WrapperInfo>
                        <WrapperInfo>
                                <LAble>Phương thức thanh toán</LAble>
                                <WrapperValue>
                                    {orderContant.payment[state?.payment]}
                                </WrapperValue>                       
                        </WrapperInfo>
                        <WrapperInfo>
                            {state.orders?.map((order) => {
                                return (
                                    <div key={order?.product} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', background: '#fff', borderBottom: '1px solid #ddd' }}>
                                {/* Thông tin sản phẩm */}
                                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <img
                                        alt="product"
                                        src={order.image}
                                        style={{ width: '77px', height: '79px', objectFit: 'cover', marginLeft: '10px' }}
                                    /> 
                                    <div style={{ flex: 1, marginLeft: '10px' }}>
                                        <div style={{ fontWeight: 'bold', marginBottom: '5px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                            {order.name}
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#888' }}>
                                            <span style={{ display: 'block' }}>Color: {order?.color}</span>
                                            <span>Size: {order?.size}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Đơn giá, số lượng, tổng giá */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                    <span style={{ fontSize: '13px', color: '#242424' }}>price: {converPrice(order?.price)}</span>
                                    <span style={{ fontSize: '13px', color: '#242424' }}>amount: {converPrice(order?.amount)}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    </div>
                                    <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: '500' }}>
                                       tong iten: {converPrice(order?.totalPrice)}
                                    </span>
                                    
                                </div>
                                    </div>

                                )
                            })}
                        </WrapperInfo>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;