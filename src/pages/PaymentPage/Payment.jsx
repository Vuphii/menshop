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
import { LAble, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight } from "./style";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";

const PaymentPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
            const arrayOrdered = [];
            order?.selectedOrderItems?.forEach(element => {
                arrayOrdered.push(element.product)
            });
            dispatch(removeAllOrderProduct({listChecked: arrayOrdered}));
            message.success('dat hang thanh cong');
            navigate('/orderSuccess', { 
                state: {
                    delivery,
                    payment,
                    orders: order?.selectedOrderItems,
                    totalPrice: totalPriceMemo
                }
            })
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
                <h3>Thanh toán</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperInfo>
                            <LAble>Chọn phương thức giao hàng</LAble>
                            <WrapperRadio onChange={handleDilivery} value={delivery}>
                                <Radio value="fast"><span style={{ color: '#ea85500', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm</Radio>
                                <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_jEK</span> Giao hàng tiết kiệm</Radio>
                            </WrapperRadio>
                        </WrapperInfo>
                        <WrapperInfo>
                            <div>
                                <div>Chọn phương thức thanh toán</div>
                                <Radio.Group onChange={handlePayment} value={payment}>
                                    <Radio value="later_money">Thanh toán bằng tiền mặt</Radio>
                                </Radio.Group>
                            </div>
                        </WrapperInfo>
                    </WrapperLeft>

                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <div>
                                <div>
                                    <span>Địa chỉ: </span>
                                    <span style={{ fontWeight: 'bold' }}>{user?.address} {user?.city}</span>
                                    <span onClick={() => handleChangeAddress()} style={{ color: 'blue', cursor: 'pointer' }}> Thay đổi</span>
                                </div>
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{converPrice(priceMemo)}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{`${priceDiscountMemo} %`}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Thuế</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{converPrice(deliveryMemo)}</span>
                                </div>
                            </div>
                            <div>
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{converPrice(totalPriceMemo)}</span>
                                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                </span>
                            </div>
                        </div>
                        <ButtonComponent
                            onClick={handleAddOrder}
                            size={40}
                            style={{
                                background: '#212121',
                                borderRadius: '5px',
                                height: '48px',
                                width: '320px',
                                border: 'none',
                            }}
                            textbutton={'Đặt hàng'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 'bold' }}
                        ></ButtonComponent>
                    </WrapperRight>
                </div>
            </div>

            <ModalComponent
                title="Cập nhật thông tin giao hàng"
                open={isOpenModalUpdateInfo}
                onCancel={handleCancelUpdate}
                onOk={handleUpdateUserInfo}
            >
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    autoComplete="off"
                >
                    <InputComponent
                        label='Họ và tên'
                        name='name'
                        value={stateUserDetails.name}
                        onChange={handleOnChangeDetails}
                        required={false}
                    />
                    <InputComponent
                        label='Số điện thoại'
                        name='phone'
                        value={stateUserDetails.phone}
                        onChange={handleOnChangeDetails}
                        required={false}
                    />
                    <InputComponent
                        label='Địa chỉ'
                        name='address'
                        value={stateUserDetails.address}
                        onChange={handleOnChangeDetails}
                        required={false}
                    />
                    <InputComponent
                        label='Thành phố'
                        name='city'
                        value={stateUserDetails.city}
                        onChange={handleOnChangeDetails}
                        required={false}
                    />
                </Form>
            </ModalComponent>
        </div>
    );
};

export default PaymentPage;

