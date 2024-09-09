import { Checkbox, Col, Form} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined, MinusOutlined } from '@ant-design/icons';
import { WrapperInputNumber, WrapperQualityProduct } from "../../components/DetailProductComponent/style";
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from "../../redux/slides/orderSlide";
import { converPrice } from "../../utils";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import * as UserService from '../../services/UserService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/MessageComponent/Message';
import { updateUser } from "../../redux/slides/useSlide";
import { useNavigate } from "react-router-dom";
import StepComponent from "../../components/StepComponents/StepComponent";
import { WrapperStyleHeaderDilivery } from "./style";

const OrderPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [listChecked, setListChecked] = useState([])
    const [isOpenModalUpdateInfo, setisOpenModalUpdateInfo] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });

    const [form] = Form.useForm();


    const onChange = (e) => {
        console.log(`checked = ${e.target.value}`);
        if(listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value);
                setListChecked(newListChecked)
        }else {
                setListChecked([...listChecked, e.target.value])
            }


    }
    console.log('listCheck', listChecked);
    const handleonchangeCheckAll = (e) => {
        if(e.target.checked){
            const newListChecked = [];
            order?.orderItems?.forEach((item) =>{
                newListChecked.push(item?.product)
            })
            setListChecked(newListChecked)
        }else {
            setListChecked([])
        }
    }

    const handlChangeCount = (type, idProduct) => {
        if(type === 'increase'){
            dispatch(increaseAmount({idProduct}));

        }else if (type === 'decrease'){
            dispatch(decreaseAmount({idProduct}));
        }
    }
    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({idProduct}));
    }
    const handleremoveAllOrder = () => {
        if(listChecked?.length > 1){
            dispatch(removeAllOrderProduct({listChecked}));
        }
    }

    useEffect(() => {
        dispatch(selectedOrder({listChecked}));
 
    }, [listChecked])

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);
    useEffect(()=> {
        if(isOpenModalUpdateInfo){
            setStateUserDetails({
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
                city: user?.city,
            })
        }
    }, [isOpenModalUpdateInfo])

    const handleChangeAddress = (() => {
        setisOpenModalUpdateInfo(true);
    })

    const priceMemo = useMemo(() => {
        const result = order?.selectedOrderItems?.reduce((total, cur) => {
            return total + ((cur?.price * cur?.amount));
        }, 0);
        return result;
    }, [order]);
    const priceDiscountMemo = useMemo(() => {
        const result = order?.selectedOrderItems?.reduce((total, cur) => {
            return total + ((cur?.discount * cur?.amount));
        }, 0);
        if(Number(result)){
            return result
        }
        return 0
    }, [order]);
    const deliveryMemo = useMemo(() => {
       if(priceMemo >= 200000 && priceMemo < 500000){
        return 10000;
       }else if(priceMemo >= 500000 || order?.selectedOrderItems?.length === 0) {
        return 0;
        }else if (order?.selectedOrderItems === 0){
        return 0;
        }else{
        return 20000;
        }
    }, [priceMemo]);
    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) * ((100-Number(priceDiscountMemo))/100) + Number(deliveryMemo);
    }, [priceMemo, priceDiscountMemo, deliveryMemo]);

   const handleAddCart = () => {
    console.log('use', user)
    if(!order?.selectedOrderItems?.length){
        message.error('vui long chon san pham');
    }else if(!user?.phone || !user?.address || !user?.name || !user?.city){
        setisOpenModalUpdateInfo(true)
    }else {
        navigate('/payment')
    }
   }

   const mutationUpdate = useMutationHooks
   ((data) => {
    const { id,
         token,
        ...rests } = data;
    const res = UserService.updateUser(id, {...rests}, token);
    return res;
   } 
 );

    const {isLoading, data} = mutationUpdate;

   const handleCancelUpdate =() => {
    setStateUserDetails({
        name: '',
        phone: '',
        address:'',
        city: ''
    });
    form.resetFields();
    setisOpenModalUpdateInfo(false)
   }

   console.log('data', data)
   const handleUpdateUserInfo =() =>{
    const {name, phone, city, address} = stateUserDetails;
    if(name && phone && city&& address){
        mutationUpdate.mutate({id: user?.id, token: user?.access_token, ...stateUserDetails}, {
            onSuccess: () => {
                dispatch(updateUser({name, phone, city, address}))
                setisOpenModalUpdateInfo(false)
            }
        });
    }
}
   const handleOnChangeDetails = (e) => {
    setStateUserDetails({
        ...stateUserDetails,
        [e.target.name]: e.target.value
    });
};
    

    console.log('order', order);
    console.log('stateUserDetails', stateUserDetails);

      const items = [
        {
            title: '20.000 VND',
            description: 'Duoi 200.000 VND'
          },
          {
            title: '10.000 VND',
            description: 'Tu 200.000 VND den duoi 500.000 VND',
            subTitle: 'Left 00:00:08',
          },
          {
            title: '0 VND',
            description: 'Tren 500.000 VND'
          }
      ]


    return(
        <div style={{ padding: '10px 50px', background: '#f5f5f5', width: '100%', height: '100vh'}}>
            <div style={{height: '100%', width: '1270px', margin: '0'}}>
                <h3>Gio hang</h3>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <Col span={18}> 
                <WrapperStyleHeaderDilivery>
                    <StepComponent items={items} current={deliveryMemo === 10000
                    ? 2 : deliveryMemo === 20000 ? 1 : order?.selectedOrderItems.length === 0 ? 0: 3} />
                </WrapperStyleHeaderDilivery>           
    <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0', background: '#fff', borderBottom: '1px solid #ddd' }}>
        {/* Tiêu đề cột */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            {/* Checkbox chọn tất cả */}
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                    onChange={handleonchangeCheckAll}
                    checked={listChecked?.length === order?.orderItems?.length}
                />
                <span style={{ marginLeft: '10px' }}>
                    Tất cả ({order?.orderItems?.length} sản phẩm)
                </span>
            </span>
            {/* Tiêu đề cột và biểu tượng xóa */}
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                <span style={{ flex: 1, textAlign: 'center' }}>Đơn giá</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Số lượng</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Tổng giá</span>
                <DeleteOutlined
                    style={{ cursor: 'pointer', color: '#ff4d4f' }}
                    onClick={handleremoveAllOrder}
                />
            </div>
        </div>
        {/* Danh sách sản phẩm */}
        <div>
            {order?.orderItems?.map((item) => (
                <div key={item?.product} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', background: '#fff', borderBottom: '1px solid #ddd' }}>
                    {/* Thông tin sản phẩm */}
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <Checkbox
                            onChange={onChange}
                            value={item?.product}
                            checked={listChecked.includes(item?.product)}
                        />
                        <img
                            alt="product"
                            src={item?.image}
                            style={{ width: '77px', height: '79px', objectFit: 'cover', marginLeft: '10px' }}
                        />
                        <div style={{ flex: 1, marginLeft: '10px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {item?.name}
                            </div>
                            <div style={{ fontSize: '14px', color: '#888' }}>
                                <span style={{ display: 'block' }}>Color: {item?.color}</span>
                                <span>Size: {item?.size}</span>
                            </div>
                        </div>
                    </div>
                    {/* Đơn giá, số lượng, tổng giá */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{converPrice(item?.price)}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <button
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                onClick={() => handlChangeCount('decrease', item?.product)}
                            >
                                <MinusOutlined style={{ color: '#000', fontSize: '14px' }} />
                            </button>
                            <WrapperInputNumber defaultValue={item?.amount} value={item?.amount} size="small" />
                            <button
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                onClick={() => handlChangeCount('increase', item?.product)}
                            >
                                <PlusOutlined style={{ color: '#000', fontSize: '14px' }} />
                            </button>
                        </div>
                        <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: '500' }}>
                            {converPrice(item?.price * item?.amount)}
                        </span>
                        <DeleteOutlined
                            style={{ cursor: 'pointer', color: '#ff4d4f' }}
                            onClick={() => handleDeleteOrder(item?.product)}
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
</Col>
<Col span={6} style={{ paddingLeft: '50px' }}> 
    <div style={{width: '100%'}}>
        <div>
            <div>
                <span>Dia chi: </span>
                <span style={{fontWeight: 'bold'}}>{user?.address} {user?.city}</span>
                <span onClick={() => handleChangeAddress} style={{color: 'blue', cursor: 'pointer'}}> Thay doi</span>

            </div>
        </div>
        <div>
            <div style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between'}}>
                <span>Tam tinh</span>
                <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{converPrice(priceMemo)}</span>
            </div>
            
            <div style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between'}}>
                <span>Giam gia</span>
                <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{`${priceDiscountMemo} %`}</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between'}}>
                <span>Phi giao hang</span>
                <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{converPrice(deliveryMemo)}</span>
            </div>
        </div>
        <div>
            <span>Tong tien</span>
            <span style={{ display: 'flex', flexDirection: 'column'}}>
                <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{converPrice(totalPriceMemo)}</span>
                <span style={{color: '#000', fontSize: '11px',}}>(Da bao gom VAT neu co)</span>
            </span>
        </div>
    </div> 
    <ButtonComponent
        onClick ={() => handleAddCart()}
        size={40}
        style ={{
            background: '#212121',
            borderRadius: '5px',
            height: '48px',
            width: '320px',
            border: 'none',
        }}
        textbutton={'Mua hang'}
        styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: 'bold'}}
    ></ButtonComponent>
</Col>

                </div>
            </div>

            <ModalComponent
                title="cap nhap thong tin giao hang"
                open={isOpenModalUpdateInfo}
                onCancel={handleCancelUpdate}
                onOk = {handleUpdateUserInfo} 
            
            >
                
                    <Form
                        form={form}
                        layout="vertical"
                        name="basic"
                        labelCol={{span: 6}}
                        wrapperCol={{ span: 18 }}
                        //onFinish={onUpdateProduct}
                        autoComplete="off"
                    >
                    
                    <Form.Item
                            name="name"
                            label="Product Name"
                            rules={[{ required: true, message: 'Please input the product name!' }]}
                        >
                            <InputComponent value={stateUserDetails['name']} onChange={handleOnChangeDetails} name="name" />
                        </Form.Item>
                    
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <InputComponent value={stateUserDetails['phone']} onChange={handleOnChangeDetails} name="phone" />
                        </Form.Item>
                    
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, message: 'Please input the address!' }]}
                        >
                            <InputComponent value={stateUserDetails['address']} onChange={handleOnChangeDetails} name="address" />
                        </Form.Item>

                        <Form.Item
                            name="city"
                            label="City"
                            rules={[{ required: true, message: 'Please input the City!' }]}
                        >
                            <InputComponent value={stateUserDetails['city']} onChange={handleOnChangeDetails} name="city" />
                        </Form.Item>
                    </Form>
            
                
            </ModalComponent>
        </div>
    )
}
export default OrderPage