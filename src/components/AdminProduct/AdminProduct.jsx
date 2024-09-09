
import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFIle } from "./style";
import { Button, Form, Select} from "antd";
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductService from '../../services/ProductService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from '../../components/MessageComponent/Message';
import { useQuery } from "@tanstack/react-query";
import DrawerCompnent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import Loading from "../LoadingComponent/Loading";

const { Option } = Select;

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const user = useSelector((state) => state?.user);
    const [rowSelected, setRowSelected] = useState('');
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        color: [],
        size: [],
        type: '',
        countInStock: '',
        rating: '',
        images: '',
        discount: '',
        
    });
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        color: [],
        size: [],
        type: '',
        countInStock: '',
        rating: '',
        images: '',
        discount: '',
    });

    const mutation = useMutationHooks((data) => {
        const res = ProductService.createProduct(data);
        return res
    });

    const mutationUpdate = useMutationHooks((data) => {
        console.log('data', data);
        const { id, token, ...rests } = data;
        const res = ProductService.updateProduct(id, token, {...rests});
        return res

    });

    const mutationDelete = useMutationHooks((data) => {
        console.log('data', data);
        const { id, token} = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });

    const { data, isLoading, isSuccess, isError } = mutation;
    const { data: dataUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate } = mutationUpdate;
    const { data: dataDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = mutationDelete;


    const { isLoading: isLoadingProduct, data: products, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: ProductService.getAllProduct
    });

    useEffect(() => {
        if(products){
            console.log('products', products);
        }
    }, [products]);

    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                form.resetFields();
                setIsModalOpen(false);
            })
            .catch(info => {
                console.log('Validation Failed:', info);
            });
    };
    const openCreateProductModal = () => {
        setStateProduct({
            name: '',
            price: '',
            description: '',
            color: [],
            size: [],
            type: '',
            countInStock: '',
            rating: '',
            images: '',
            discount: '',
        });
        form.resetFields(); // Đặt lại trường của form
        setRowSelected(null); // Đặt lại ID sản phẩm cũ
        setIsModalOpen(true);
        setIsOpenDrawer(false); // Đóng drawer nếu đang mở
    };
    

    useEffect(() => {
        if(isSuccess && data?.status === 'OK'){
            message.success();
            refetch();  // Gọi lại API để lấy danh sách sản phẩm mới nhất
            handleCancel();
        } else if (isError){
            message.error();
        }
    }, [isSuccess, data, isError]);

    useEffect(() => {
        if (isSuccessUpdate) {
            message.success('Cập nhật sản phẩm thành công!');
            refetch();  // Gọi lại API để lấy danh sách sản phẩm mới nhất
            handleCancelDetail();
        } else if (isErrorUpdate) {
            message.error('Cập nhật sản phẩm thất bại!');
        }
    }, [isSuccessUpdate, isErrorUpdate]);
    
    useEffect(() => {
        if (isSuccessDelete) {
            message.success('Xoa sản phẩm thành công!');
            refetch();  // Gọi lại API để lấy danh sách sản phẩm mới nhất
            setIsModalOpenDelete(false);
        } else if (isErrorDelete) {
            message.error('Xoa sản phẩm thất bại!');
        }
    }, [isSuccessDelete, isErrorDelete]);


    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            color: [],
            size: [],
            type: '',
            countInStock: '',
            rating: '',
            images: '',
            discount: '',
        });
        form.resetFields();
    };
    const handleCancelDetail = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            color: [],
            size: [],
            type: '',
            countInStock: '',
            rating: '',
            images: '',
            discount: '',
        });
        form.resetFields();
    };

    const onFinish = () => {
        if (rowSelected) {
            // Nếu có ID sản phẩm cũ, đảm bảo rằng mutation sẽ không bị ảnh hưởng
            mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateProductDetails});
        
        } else {
            mutation.mutate(stateProduct); // Tạo sản phẩm mới
        }
    };

    const onUpdateProduct = () => {
        if(rowSelected){
            mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateProductDetails});
        }else{
            message.error('Vui lòng chọn sản phẩm để cập nhật.');
        }
    };

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (value, name) => {
        setStateProduct({
            ...stateProduct,
            [name]: value
        });
    };

    const handleSelectChangeDetails = (value, name) => {
        setStateProductDetails({
            ...stateProductDetails,
            [name]: value
        });
    };

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            images: file.preview
        });
    };

    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            images: file.preview
        });
    };

    const fetchGetDetailProduct = async (rowSelected) => {
        console.log('rowSelected', rowSelected);
        const res = await ProductService.getDetailProduct(rowSelected);
        if (res?.data) {
            setStateProductDetails({
                name: res.data.name,
                price: res.data.price,
                description: res.data.description,
                color: res.data.color,
                size: res.data.size,
                type: res.data.type,
                countInStock: res.data.countInStock,
                rating: res.data.rating,
                images: res.data.images,
                discount: res.data.discount,
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue(stateProductDetails);
    }, [form, stateProductDetails]);

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailProduct(rowSelected);
        }
    }, [rowSelected]);

    const handleDetailProduct = () => {
        if (rowSelected) {
            fetchGetDetailProduct(rowSelected);
            setIsOpenDrawer(true);
            setIsModalOpen(false);
        }
        else{
            message.error('Vui lòng chọn sản phẩm để xem chi tiết.');
        }
        
    };
    console.log('stateProduct:', stateProduct);
    console.log('rowSelected:', rowSelected);
    console.log('stateProductDetails', stateProductDetails);

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{fontSize: '30px', color: 'red', cursor: 'pointer'}} onClick={()=>setIsModalOpenDelete(true)}/>
                <EditOutlined style={{fontSize: '30px', color: 'green', cursor: 'pointer'}} onClick={handleDetailProduct}/>
            </div>
        );
    };

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: (a, b) => a.name.length - b.name.length
        },
        {
          title: 'Price',
          dataIndex: 'price',
          sorter: (a, b) => a.price - b.price
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          sorter: (a, b) => a.rating - b.rating
        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        },
    ];

    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {...product, key: product._id};
    });

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    }
    const handleDeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token})

    }

    return (
            <div>
                <WrapperHeader>Quan ly san pham</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button
                        style={{
                            height: '100px',
                            width: '100px',
                            borderRadius: '6px',
                            borderStyle: 'dashed'
                        }}
                        onClick={openCreateProductModal}
                    >
                        <PlusOutlined style={{ fontSize: '60px' }} />
                    </Button>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <TableComponent columns={columns} isLoading={isLoadingProduct} data={dataTable} onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                setRowSelected(record.id)

                            },
                        }
                    }} />
                </div>
                
                    <ModalComponent
                        title="Tao san pham"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer= {null}
                        form = {form}
                        onOk = {handleOk}
                        isLoading={isLoading} // Chắc chắn giá trị này được truyền đúng

                    >
                        <Loading isLoading={isLoadingProduct}>       
                            <Form
                                form={form}
                                layout="vertical"
                                name="productForm"
                                labelCol={{span: 6}}
                                wrapperCol={{ span: 18 }}
                                onFinish={onFinish}
                                autoComplete="off"

                            >
                                <Form.Item
                                    name="name"
                                    label="Product Name"
                                    rules={[{ required: true, message: 'Please input the product name!' }]}
                                >
                                    <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
                                </Form.Item>
                                <Form.Item
                                    name="images"
                                    label="Product Image"
                                    rules={[{ required: true, message: 'Please input the product image!' }]}
                                >
                                    <WrapperUploadFIle onChange={handleOnChangeAvatar} maxCount={1}>
                                        <Button icon={<UploadOutlined />}>Select File</Button>
                                        {stateProduct?.images && (
                                            <img
                                                src={stateProduct?.images}
                                                style={{
                                                    width: '60px',
                                                    height: '100px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    marginLeft: '10px',
                                                }}
                                                alt="avatar"
                                            />
                                        )}
                                    </WrapperUploadFIle>
                                </Form.Item>
                                <Form.Item
                                    name="type"
                                    label="Product Type"
                                    rules={[{ required: true, message: 'Please input the type!' }]}
                                >
                                    <Select placeholder="Chọn loai san pham" value={stateProduct.type} onChange={(value) => handleSelectChange(value, 'type')}>
                                        <Option value="T-shirt">T-shirt</Option>
                                        <Option value="so mi">Shirt</Option>
                                    </Select>
                                    {/*<InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" />*/}
                                </Form.Item>
                                <Form.Item
                                    name="price"
                                    label="Price"
                                    rules={[{ required: true, message: 'Please input the price!' }]}
                                >
                                <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
                                </Form.Item>
                                <Form.Item
                                    name="countInStock"
                                    label="CountInStock"
                                    rules={[{ required: true, message: 'Please input the count in stock!' }]}
                                >
                                    <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
                                </Form.Item>
                                <Form.Item
                                    name="rating"
                                    label="Rating"
                                    rules={[{ required: true, message: 'Please input the rating!' }]}
                                >
                                    <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                                </Form.Item>
                                <Form.Item
                                    name="discount"
                                    label="Discount"
                                    rules={[{ required: true, message: 'Please input the discount!' }]}
                                >
                                    <InputComponent value={stateProduct.discount} onChange={handleOnChange} name="discount" />
                                </Form.Item>
                                <Form.Item
                                    name="color"
                                    label="Màu sắc"
                                    rules={[{ required: true, message: 'Vui lòng chọn màu sắc!' }]}
                                >
                                    <Select mode="multiple" placeholder="Chọn màu sắc" value={stateProduct.color} onChange={(value) => handleSelectChange(value, 'color')}>
                                        <Option value="white">Trắng</Option>
                                        <Option value="black">Đen</Option>
                                        <Option value="gray">Xám</Option>
                                        <Option value="blue">Xanh</Option>
                                        <Option value="red">Đỏ</Option>
                                        <Option value="green">Xanh lá</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="size"
                                    label="Kích thước"
                                    rules={[{ required: true, message: 'Vui lòng chọn kích thước!' }]}
                                >
                                    <Select mode="multiple" placeholder="Chọn kích thước" value={stateProduct.size} onChange={(value) => handleSelectChange(value, 'size')}>
                                        <Option value="S">S</Option>
                                        <Option value="M">M</Option>
                                        <Option value="L">L</Option>
                                        <Option value="XL">XL</Option>
                                        <Option value="XXL">XXL</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                >
                                    <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Loading>
                    </ModalComponent>
                <DrawerCompnent 
                        title="Chi tiet san pham" 
                        isOpen={isOpenDrawer} 
                        onClose={handleCancelDetail} 
                        width="40%"
                        form = {form}
                    >
                    <Loading isLoading={isLoadingProduct}>
                        <Form
                            form={form}
                            layout="vertical"
                            name="productForm"
                            labelCol={{span: 6}}
                            wrapperCol={{ span: 18 }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="name"
                                label="Product Name"
                                rules={[{ required: true, message: 'Please input the product name!' }]}
                            >
                                <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
                            </Form.Item>
                            <Form.Item
                                name="images"
                                label="Product Image"
                                rules={[{ required: true, message: 'Please input the product image!' }]}
                            >
                                <WrapperUploadFIle onChange={handleOnChangeAvatarDetails} maxCount={1}>
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                    {stateProductDetails?.images && (
                                        <img
                                            src={stateProductDetails?.images}
                                            style={{
                                                width: '60px',
                                                height: '100px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                marginLeft: '10px',
                                            }}
                                            alt="avatar"
                                        />
                                    )}
                                </WrapperUploadFIle>
                            </Form.Item>
                            <Form.Item
                                name="type"
                                label="Product Type"
                                rules={[{ required: true, message: 'Please input the type!' }]}
                            >
                                <Select placeholder="Chọn loai san pham" value={stateProductDetails.type} onChange={(value) => handleSelectChangeDetails(value, 'type')}>
                                    <Option value="T-shirt">T-shirt</Option>
                                    <Option value="So mi">Shirt</Option>
                                    
                                </Select>
                                {/*<InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />*/}
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{ required: true, message: 'Please input the price!' }]}
                            >
                                <InputComponent value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price" />
                            </Form.Item>
                            <Form.Item
                                name="countInStock"
                                label="CountInStock"
                                rules={[{ required: true, message: 'Please input the count in stock!' }]}
                            >
                                <InputComponent value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock" />
                            </Form.Item>
                            <Form.Item
                                name="rating"
                                label="Rating"
                                rules={[{ required: true, message: 'Please input the rating!' }]}
                            >
                                <InputComponent value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating" />
                            </Form.Item>
                            <Form.Item
                                name="discount"
                                label="Discount"
                                rules={[{ required: true, message: 'Please input the discount!' }]}
                            >
                                <InputComponent value={stateProductDetails.discount} onChange={handleOnChangeDetails} name="discount" />
                            </Form.Item>
                            <Form.Item
                                name="color"
                                label="Màu sắc"
                                rules={[{ required: true, message: 'Vui lòng chọn màu sắc!' }]}
                            >
                                <Select mode="multiple" placeholder="Chọn màu sắc" value={stateProductDetails.color} onChange={(value) =>handleSelectChangeDetails(value, 'color')}>
                                    <Option value="white">Trắng</Option>
                                    <Option value="black">Đen</Option>
                                    <Option value="gray">Xám</Option>
                                    <Option value="blue">Xanh</Option>
                                    <Option value="red">Đỏ</Option>
                                    <Option value="green">Xanh lá</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="size"
                                label="Kích thước"
                                rules={[{ required: true, message: 'Vui lòng chọn kích thước!' }]}
                            >
                                <Select mode="multiple" placeholder="Chọn kích thước" value={stateProductDetails.size} onChange={(value) =>handleSelectChangeDetails(value, 'size')}>
                                    <Option value="S">S</Option>
                                    <Option value="M">M</Option>
                                    <Option value="L">L</Option>
                                    <Option value="XL">XL</Option>
                                    <Option value="XXL">XXL</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"
                            >
                                <InputComponent value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description" />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Apply
                                </Button>
                            </Form.Item>
                        </Form>
                    </Loading>
                </DrawerCompnent>
                <ModalComponent
                    title="xoa san pham"
                    open={isModalOpenDelete}
                    onCancel={handleCancelDelete}
                    onOk = {handleDeleteProduct}
                
                >
                    <div>Ban co chac muon xoa san pham nay khong </div>
                    
                </ModalComponent>
            </div>
    );
};

export default AdminProduct;
