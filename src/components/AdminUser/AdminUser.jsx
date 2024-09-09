import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFIle } from "./style";
import { Button, Form, Select } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerCompnent from "../DrawerComponent/DrawerComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import * as message from '../../components/MessageComponent/Message';
import { getBase64 } from "../../utils";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import { useQuery } from "@tanstack/react-query";
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';


const AdminUser = ()  => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const user = useSelector((state) => state?.user);
    const [rowSelected, setRowSelected] = useState('');
    const [stateUser, setStateUser] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
       
    });
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
    });

    const mutation = useMutationHooks((data) => {
        const res = UserService.signupUser(data);
        return res;
    });

    const mutationUpdate = useMutationHooks((data) => {
        console.log('data', data);
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, {...rests}, token);
        return res;
    });

    const mutationDelete = useMutationHooks((data) => {
        console.log('data', data);
        const { id, token} = data;
        const res = UserService.deleteUser(id, token);
        return res;

    });


    const { data, isLoading, isSuccess, isError } = mutation;
    const { data: dataUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate } = mutationUpdate;
    const { data: dataDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = mutationDelete;


    const {data: users, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: UserService.getAllUser,
        staleTime: 0, // Đảm bảo dữ liệu luôn được làm mới
    });



    useEffect(() => {
        if(users){
            console.log('users', users);
        }
    }, [users]);

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
            setIsOpenDrawer(false);
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
        setStateUser({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
            avatar: ''
           
        });
        form.resetFields();
    };

    const onFinish = () => {
        mutation.mutate(stateUser);
    };

    const onUpdateProduct = () => {
        mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateUserDetails});
    };

    const handleOnChange = (e) => {
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value
        });
    };

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        });
    };

    
    

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUser({
            ...stateUser,
            avatar: file.preview
        });
    };

    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview
        });
    };

    const fetchGetDetailProduct = async (rowSelected) => {
        console.log('rowSelected', rowSelected);
        const res = await UserService.getDetailsUser(rowSelected);
        console.log('res', res);
        if (res?.data) {
            setStateUserDetails({
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone,
                isAdmin: res.data.isAdmin,
                avatar: res.data.avatar,
               
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailProduct(rowSelected);
        }
    }, [rowSelected]);

    const handleDetailProduct = () => {
        if (rowSelected) {
            fetchGetDetailProduct(rowSelected);
        }
        setIsOpenDrawer(true);
    };

    console.log('stateUserDetails', stateUserDetails);

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
          title: 'Email',
          dataIndex: 'email',
          sorter: (a, b) => a.email - b.email
        },
        {
          title: 'IsAdmin',
          dataIndex: 'isAdmin',
          sorter: (a, b) => a.isAdmin - b.isAdmin
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          sorter: (a, b) => a.phone - b.phone
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        },
    ];

    const dataTable = users?.data?.length && users?.data?.map((user) => {
        return {...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' };
    });

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    }
    const handleDeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token})

    }
    return(
        <div>    
            <WrapperHeader>Quan ly nguoi dung</WrapperHeader>
            <div style={{marginTop: '10px'}}>
            <Button style={{
                height: '100px',
                width: '100px',
                borderRadius: '6px', 
                borderStyle: 'dashed'}}>
                    <PlusOutlined style={{fontSize: '60px'}}/>
            </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) => {
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
            >
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
                        <InputComponent value={stateUser.name} onChange={handleOnChange} name="name" />
                    </Form.Item>
                    <Form.Item
                        name="avatar"
                        label="Avatar User"
                        rules={[{ required: true, message: 'Please input the product image!' }]}
                    >
                        <WrapperUploadFIle onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                            {stateUser?.avatar && (
                                <img
                                    src={stateUser?.avatar}
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
                        name="email"
                        label="Email User"
                        rules={[{ required: true, message: 'Please input the type!' }]}
                    >
                        <InputComponent value={stateUser.email} onChange={handleOnChange} name="email" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <InputComponent value={stateUser.phone} onChange={handleOnChange} name="phone" />
                    </Form.Item>
                
                    <Form.Item
                        name="isAdmin"
                        label="IsAdmin"
                        rules={[{ required: true, message: 'Please input the rating!' }]}
                    >
                        <InputComponent value={stateUser.isAdmin} onChange={handleOnChange} name="isAdmin" />
                    </Form.Item>
                   
            
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </ModalComponent>
            <DrawerCompnent title="Chi tiet san pham" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="40%">
                <Form
                    form={form}
                    layout="vertical"
                    name="productForm"
                    labelCol={{span: 6}}
                    wrapperCol={{ span: 18 }}
                    onFinish={onUpdateProduct}
                    autoComplete="off"
                >
                   
                   <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[{ required: true, message: 'Please input the product name!' }]}
                    >
                        <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>
                    <Form.Item
                        name="avatar"
                        label="Avatar User"
                        rules={[{ required: true, message: 'Please input the product image!' }]}
                    >
                        <WrapperUploadFIle onChange={handleOnChangeAvatarDetails} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                            {stateUserDetails?.avatar && (
                                <img
                                    src={stateUserDetails?.avatar}
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
                        name="email"
                        label="Email User"
                        rules={[{ required: true, message: 'Please input the type!' }]}
                    >
                        <InputComponent value={stateUserDetails.email} onChange={handleOnChangeDetails} name="email" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                    </Form.Item>
                
                    <Form.Item
                        name="isAdmin"
                        label="IsAdmin"
                        rules={[{ required: true, message: 'Please input the rating!' }]}
                    >
                        <InputComponent value={stateUserDetails.isAdmin} onChange={handleOnChangeDetails} name="isAdmin" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>

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
    )

}

export default AdminUser;