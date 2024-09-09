import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './Style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import imageLogo from '../../imgs/logo2.png';
import InputForm from '../../components/InputForm/InputForm';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'; // Import biểu tượng từ thư viện
import { useLocation, useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/MessageComponent/Message';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import {useDispatch} from 'react-redux';
import { updateUser } from '../../redux/slides/useSlide';



const SignInPage = () => {
    const location = useLocation();
    const dispatch = useDispatch(); 
    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
)
    console.log('mutation', mutation);
    const navigate = useNavigate();
    const handleNavigateSignUp = () => {
        navigate('/signup');
    }
    const [email, setEmail] = useState('');
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    }
    const [password, setPassword] = useState('');
    const handleOnChangePassword = (value) => {
        setPassword(value);
    }
    const [isShowPassword, setIsShowPassword] = useState(false)
    const handleSignIn = () => {
        mutation.mutate({ email, password });
        console.log('sign in', email, password);
    }

    const {data, isLoading, isSuccess, isError} = mutation;

    useEffect(() => {
        console.log('location', location);
        if(isSuccess){
            message.success()
            if (location?.state){
                navigate(location?.state);

            }else{
                navigate('/');
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            if(data?.access_token){
                const decode = jwtDecode(data?.access_token);
                console.log('decode', decode);
                if(decode?.id){
                    handleGetDetailsUser(decode?.id, data?.access_token);

                }

            }
        }
        else if(isError){ 
            message.error()
        }

    }, [isSuccess, isError])
    const handleGetDetailsUser =  async (id, token) => {
        const  res = await UserService.getDetailsUser(id, token);
        console.log('res.data', res.data); // Kiểm tra nội dung res.data
        if(res){
            dispatch(updateUser({...res.data, access_token: token}))
        }
    }

    return(
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53)', height: '100vh'}}>
            <div style={
                { width: '800px', height: '445px', borderRadius: '10px', background: '#fff', display: 'flex'}
            }>
                <WrapperContainerLeft>
                    < h1>SIGN IN</h1>
                    <p>Dang nhap hoac tao tai khoan</p>
                    <InputForm style={{ marginBottom: '10px'}} placeholder="abc@gmail.com" value={email} onChange={handleOnChangeEmail}/>
                    <div style={{position:'relative'}}>
                    <span 
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px',
                          
                        }}
                        >{
                            isShowPassword ? 
                            (<EyeFilled/>) : 
                            (<EyeInvisibleFilled/>)
                        }

                    </span>
                        <InputForm placeholder="Password" type={isShowPassword? "text":"password"} value={password} onChange={handleOnChangePassword}/>
                    </div>
                    {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
                        <ButtonComponent
                                disabled={!email.length || !password.length} 
                                onClick = {handleSignIn}
                                size={40}
                                style={{ 
                                    background: '#212121',
                                    borderRadius: '5px',
                                    height: '48px',
                                    width: '100%',
                                    borderRadius: '5px',
                                    margin: '26px 0 10px' 


                                
                                }}
                                textbutton={'SIGN IN'}
                                styleTextButton={{
                                    color: '#fff',
                                    
                                }}
                            >
                            
                        </ButtonComponent>
        
                        <WrapperTextLight>Quen mat khau</WrapperTextLight>
                        <p>Chua co tai khoan <WrapperTextLight onClick={handleNavigateSignUp}>Tao tai khoan</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt='image-logo' height="443px" width="290x"/>
                </WrapperContainerRight>

            </div>

        </div>
    )
}

export default SignInPage;