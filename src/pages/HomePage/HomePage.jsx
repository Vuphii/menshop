import React, { useEffect, useState } from 'react';
import TypeProducts from '../../components/TypeProducts/TypeProducts';
import { WrapperButtonMore, WrapperProducts, WrapperType } from './style';
import SlidesComponent from '../../components/SlidesComponent/SlidesComponent';
import slides1 from '../../imgs/slides1.png';
import slides2 from '../../imgs/slides2.png'
import slides3 from '../../imgs/slides3.png'
import CardComponent from '../../components/CardComponent/CardComponent';
import NavbarComponent from '../../components/NavbarComponent/NavBarComponent';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';

const HomePage = () => {
    
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 1000);
    const [limit, setLimit] = useState(6);
    const [typeProduct, setTypeProduct] = useState([]);
    const fetchProductAll = async (context) => {
        console.log('context', context)
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
        console.log('res', res);
        return res;
        
    }


    const fetchAllTypeProduct = async() => {
        const res = await ProductService.getAllTypeProduct();
        if(res?.status === 'OK'){
            setTypeProduct(res.data);
        }
    }

    const { isLoading, data: products, isPreviousData} = useQuery({
        queryKey: ['products', limit, searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        staleTime: 5000,  // Đặt thời gian tươi (5 giây), điều này sẽ giữ dữ liệu cũ trong 5 giây
        cacheTime: 10000,
    });

    useEffect(()=>{
        fetchAllTypeProduct();
    }, [])
    return (
       <>
         <div style={{backgroundColor:'#e9e9e9', padding: '0 50px'}}>
            <WrapperType>
            {
                typeProduct.map((item, index) => {
                    console.log('item', item)
                    return(
                        <TypeProducts name = {item} key={index}/>
                    )
                })
            }
            
            </WrapperType>
        </div>

        <div id="container" style={{backgroundColor:'#e9e9e9', padding:'0 120px',}}>
                <SlidesComponent arrImages = {[slides1, slides2, slides3]}/>
        </div>
        <div style={{backgroundColor:'#e9e9e9', padding:'5px 120px', width: '100%'}}>
            <h1>PRODUCTS</h1>
        
            <br/>
            <WrapperProducts>
                {products?.data?.map((product) => {
                    return (
                        <CardComponent 
                        key={product.id} 
                        countInStock={product.countInStock}
                        description={product.description}
                        images={product.images}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        colors={product.colors} // Assuming colors is an array
                        sizes={product.sizes}
                        selled={product.selled}
                        discount={product.discount}
                        id={product.id} 
                        />
                    )
                })}
            </WrapperProducts>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            <WrapperButtonMore 
            disabled={products?.total === products?.data?.length}
            textbutton="xem them" 
            type="out" 
            style={{
                border: '1px solid rgb(11, 116, 229)',
                color: 'black',
                width: '240px',
                height: '30px',
                borderRadius: '4px'
            }}
            styleTextButton={{fontWeight: '500'}}
            onClick={() => setLimit((prev) => prev + 6)}
            /> 
        </div>
        </div>
        <div><NavbarComponent/>
        </div>
            
       
       </>

    )
}

export default HomePage;
/*
    width: 'fit-content',
    height: 'fit-content',

}}*/