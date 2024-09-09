import React from 'react';
import DetailProductComponent from '../../components/DetailProductComponent/DetailProductComponent';
import { useNavigate, useParams } from 'react-router-dom';

const DetailProductPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    return(
        <>
         <div style={{backgroundColor: '#e9e9e9', padding: '10px 50px'}}>
            <h2 style={{margin: '0'}}><span style={{cursor: 'pointer', fontWeight: 'bold', fontSize: '20px'}} onClick={() => {navigate('/')}}>Trang chu</span> - Chi tiết sản phẩm</h2>
        </div>
        <div style={{padding: '0 50px', background: '#e9e9e9'}}>
                <DetailProductComponent idProduct ={id}/>            
        </div>
        </>
    )
}

export default DetailProductPage;