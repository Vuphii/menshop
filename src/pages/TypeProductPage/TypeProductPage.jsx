import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../components/NavbarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { WrapperLabelText, WrapperProducts } from './style';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';

const TypeproductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    //const searchDebounce = useDebounce(searchProduct, 500);
    const {state} = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [panigate, SetPanigate] = useState({
        page: 1,
        limit: 10,
        total: 1,

    })
    const fetchProductType = async (type, page, limit) => {
        setLoading(true)
        const res = await ProductService.getProductType(type, page, limit)
        if(res.status === 'OK'){
            setLoading(false)
            setProducts(res.data)
            console.log('res',res)
            SetPanigate({...panigate, total: res?.total})
        }
        else{
            setLoading(false)
            console.log('Error')
        }
    }
    useEffect(() => {
        if(state){
            fetchProductType(state, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])

    const onChange = (current, pageSize) =>{
        console.log({current, pageSize})
        SetPanigate({...panigate, page: current-1, limit: pageSize})
    }
    return(
        <Loading isLoading={loading}>     
            <div style={{width: '100%', background: '#efefef', height: 'calc(100vh =64px)'}}>
                <div style={{width: '1270px', margin: '0 auto', display: 'flex', flexDirection: 'column', padding: '10px 0', height: '100%'}}>
                <Row style={{padding: '0 50px', background: '#e9e9e9', flexWrap: 'nowrap', paddingTop: '10px', height: '100%'}}>
                    <WrapperLabelText span={4}>
                        <NavbarComponent></NavbarComponent>
                    </WrapperLabelText>
                    <Col span={20} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <WrapperProducts>
                        {products?.map((product) =>{
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
                                id={product.id} />
                            )
                        })}
                    </WrapperProducts>
                    <Pagination defaultCurrent={panigate.page+1} total={100} onChange={onChange} style={{textAlign: 'center', marginTop: '10px'}}/>
                    </Col>

                </Row> 
                </div>
            </div>
        </Loading>
    )

}
export default TypeproductPage;