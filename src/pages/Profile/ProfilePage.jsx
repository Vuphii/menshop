import React, { useEffect, useState } from "react";
import { WrapperContentHeader, WrapperContentProfile, WrapperInput, WrapperLabel, WrapperUploadFIle } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import { Button, message} from "antd";
import { updateUser } from "../../redux/slides/useSlide";
import {UploadOutlined} from '@ant-design/icons';
import { getBase64 } from "../../utils";

const Profile = () => {
    const user = useSelector((state) => state?.user);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    const mutation = useMutationHooks(
        (data) =>{
        const {id, access_token, ...rests} = data;
        console.log('data', data);
        return UserService.updateUser(id, rests, access_token)
    }
            
    )
    console.log('user', user);

    const {data, isSuccess, isError} = mutation

    const dispatch = useDispatch();
   
    useEffect(() => {
        if(isSuccess){
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token);

        }else if (isError){
            message.error()
        }

    }, [isSuccess, isError]);

    const handleGetDetailsUser =  async (id, token) => {
        const  res = await UserService.getDetailsUser(id, token);
        console.log('res.data', res.data); // Kiểm tra nội dung res.data
        if(res){
            dispatch(updateUser({...res.data, access_token: token}))
        }
    }


    useEffect(() => {
        if(user){
        setEmail(user.email || '');
            setName(user.name || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
            setAvatar(user.avatar || '');

        }
    }, [user])
    const handleOnChangeName = (value) => {
        setName(value);
    }
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    }
    const handleOnChangePhone = (value) => {
        setPhone(value);
    }
    const handleOnChangeAddress = (value) => {
        setAddress(value);
    }
    const handleOnChangeAvatar =  async ({fileList}) => {
        const file = fileList[0];
        if(!file.url && !file.preview){
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview); 
    }

    
    const handleUpdate = () => {
        mutation.mutate({id: user?.id, name, email, phone, address, avatar, access_token: user?.access_token})

    }

    return(

        <div style={{width: '1270px', padding:'10px 50px', height: '500px'}}>

            <WrapperContentHeader>Profile Page</WrapperContentHeader>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor="name">Name</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="name" value={name} onChange={handleOnChangeName}/>
                    <ButtonComponent
                                onClick = {handleUpdate}
                                size={40}
                                style={{ 
                                    background: '#212121',
                                    borderRadius: '5px',
                                    height: '30px',
                                    width: 'fit-content',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'cap nhap'}
                                styleTextButton={{
                                    color: '#fff', fontSize: '15px', fontWeight: '700px'}} >
                    </ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor="email">Email</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="email" value={email} onChange={handleOnChangeEmail}/>
                    <ButtonComponent
                                onClick = {handleUpdate}
                                size={40}
                                style={{ 
                                    background: '#212121',
                                    borderRadius: '5px',
                                    height: '30px',
                                    width: 'fit-content',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'cap nhap'}
                                styleTextButton={{
                                    color: '#fff', fontSize: '15px', fontWeight: '700px'}} >
                    </ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="phone" value={phone} onChange={handleOnChangePhone}/>
                    <ButtonComponent
                                onClick = {handleUpdate}
                                size={40}
                                style={{ 
                                    background: '#212121',
                                    borderRadius: '5px',
                                    height: '30px',
                                    width: 'fit-content',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'cap nhap'}
                                styleTextButton={{
                                    color: '#fff', fontSize: '15px', fontWeight: '700px'}} >
                    </ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor="address">Address</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="address" value={address} onChange={handleOnChangeAddress}/>
                    <ButtonComponent
                                onClick = {handleUpdate}
                                size={40}
                                style={{ 
                                    background: '#212121',
                                    borderRadius: '5px',
                                    height: '30px',
                                    width: 'fit-content',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'cap nhap'}
                                styleTextButton={{
                                    color: '#fff', fontSize: '15px', fontWeight: '700px'}} >
                    </ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                    <WrapperUploadFIle onChange={handleOnChangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined/>}>Select File</Button>

                    </WrapperUploadFIle>
                    {avatar && (
                        <img src={avatar}
                        style={{
                            width: '60px',
                            height: '100px',
                            borderRadius: '50%',
                            objectFit: 'cover',   
                
                        }} alt="avatar"/>
                    )}
                    <ButtonComponent
                                onClick = {handleUpdate}
                                size={40}
                                style={{ 
                                    background: '#212121',
                                    borderRadius: '5px',
                                    height: '30px',
                                    width: 'fit-content',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'cap nhap'}
                                styleTextButton={{
                                    color: '#fff', fontSize: '15px', fontWeight: '700px'}} >
                    </ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
        </div>
    )
}
export default Profile
