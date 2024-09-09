import React, { useEffect } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import imageLogo from '../../imgs/logo2.png';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'; // Import biểu tượng từ thư viện
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as message from '../../components/MessageComponent/Message';

const SignUpPage = () => {
    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
)
    const navigate = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
    const handleNavigateSignIn = () => {
        navigate('/signin');



    }
    const [email, setEmail] = useState('');
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    }
    const [password, setPassword] = useState('');
    const handleOnChangePassword = (value) => {
        setPassword(value);
    }
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value);
    }
    const handleSignUp = () => {
        mutation.mutate({email, password, confirmPassword})
        console.log('Sign up:', email, password, confirmPassword)

    }
    const {data, isLoading, isSuccess, isError} = mutation;

    useEffect(() => {
        if(isSuccess){
            message.success()
            handleNavigateSignIn()
        }
        else if(isError){ 
            message.error()
        }

    }, [isSuccess, isError])

    return(
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53)', height: '100vh'}}>
        <div style={
            { width: '800px', height: '445px', borderRadius: '10px', background: '#fff', display: 'flex'}
        }>
            <WrapperContainerLeft>
                < h1>SIGN UP</h1>
                <p>Dang nhap hoac tao tai khoan</p>
                <InputForm style={{ marginBottom: '10px'}} placeholder="abc@gmail.com" value={email} onChange={handleOnChangeEmail}/>
                <div style={{position: 'relative'}}>
                    <span 
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px',
                          
                        }}
                        >{
                            isShowPassword ? (<EyeFilled/>) : (<EyeInvisibleFilled/>)
                        }
                    </span>
                    <InputForm placeholder="Password" style={{marginBottom: '10px'}} type={isShowPassword? "text":"password"} 
                    value={password} onChange={handleOnChangePassword}/>
                </div>
                <div style={{position: 'relative'}}>
                <span 
                        onClick={() => setIsShowPasswordConfirm(!isShowPasswordConfirm)}
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px',
                          
                        }}
                        >{
                            isShowPasswordConfirm ? (<EyeFilled/>) : (<EyeInvisibleFilled/>)
                        }
                </span>
                    <InputForm placeholder="Confirm Password" type={isShowPasswordConfirm? "text":"password"}
                    value={confirmPassword} onChange={handleOnChangeConfirmPassword}/>
                </div>
                <ButtonComponent
                        disabled={!email.length || !password.length || !confirmPassword.length} 
                        onClick = {handleSignUp}
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
                    <p>Ban da co tai khoan <WrapperTextLight onClick={handleNavigateSignIn}>Dang nhap</WrapperTextLight></p>
            </WrapperContainerLeft>
            <WrapperContainerRight>
                <Image src={imageLogo} preview={false} alt='image-logo' height="443px" width="290x"/>
            </WrapperContainerRight>

        </div>

    </div>
    )
}

export default SignUpPage;