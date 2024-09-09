import { Col, Image, InputNumber, Row, Radio, Select, Rate } from "antd";
import React, { useState } from "react";
import product1 from '../../imgs/product1.png'
import { WrapperAddressProduct, WrapperColorSelect, ColorSwatch, WrapperBtQualityProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperDescriptionProduct, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperSizeSelect, SizeButton} from "./style";
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService';
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { converPrice } from "../../utils";

const DetailProductPage = ({idProduct})=>{
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [numProduct, setNumProduct] = useState(1);
    const user = useSelector((state) => state.user);
    const fetchGetDetailProduct = async (context) => {
        const id = context.queryKey && context.queryKey[1]
        if (id){
            const res = await ProductService.getDetailProduct(id);
            return res.data;
        }
    };
    const { isLoading, data: productDetails} = 
    useQuery({
        queryKey: ['products-details', idProduct],
        queryFn: fetchGetDetailProduct,
        enabled: !! idProduct
    });
    console.log ('productDetails', productDetails)
   

    const [selectedColor, setSelectedColor] = useState('black');
    const [selectedSize, setSelectedSize] = useState('M');
    
    const sizes = productDetails?.size || ['S', 'M', 'L'];

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };
    const colors = productDetails?.color || ['white', 'black']; 

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    
    const onChange = (value) => {
        setNumProduct(Number(value));

    }
    const handlChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1);
        } else if (type ==='decrease' && numProduct > 1){
            setNumProduct(numProduct - 1);
        }
    }
    const handleAddOrderProduct = () => {
        if(!user?.id){
            navigate('/signin', {state: location?.pathname});
        }else{
        
            dispatch(addOrderProduct({
                orderItems: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.images,
                    price: productDetails?.price,
                    color: selectedColor,
                    size: selectedSize,
                    product: productDetails?.id
                }
            }))
        }
    }
    console.log('productDetails', productDetails, user)

    return (
        <Loading isLoading={isLoading}>
            <div style={{padding: '20px 50px', background: 'white', borderRadius: '20px'}}>
                <Row style={{padding: '15px'}}>
                    <Col span={8}>
                        <Image src={productDetails?.images} alt="image product" preview={false} style={{padding: '0px 0px', justifyContent: 'space-between'}} />
                        <Row style={{paddingTop: '10px', justifyContent: 'space-between'}}>
                            <WrapperStyleColImage span={4}>
                                <WrapperStyleImageSmall src={productDetails?.images} alt="image" preview={false} />
                            </WrapperStyleColImage>
                            <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={productDetails?.images} alt="image" preview={false} />
                            </WrapperStyleColImage>
                            <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={productDetails?.images} alt="image" preview={false} />
                            </WrapperStyleColImage>
                            <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={productDetails?.images} alt="image" preview={false} />
                            </WrapperStyleColImage>
                            <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={productDetails?.images} alt="image" preview={false} />
                            </WrapperStyleColImage>
                            <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={productDetails?.images} alt="image" preview={false} />
                            </WrapperStyleColImage>
                        </Row>
                        
                    </Col>
                    <Col span={16} style={{paddingLeft:'50px'}}>
                        <WrapperStyleNameProduct>
                            {productDetails?.name}
                        </WrapperStyleNameProduct>
                        <WrapperPriceProduct>
                            <WrapperPriceTextProduct>{converPrice(productDetails?.price)}</WrapperPriceTextProduct>
                        </WrapperPriceProduct>
                        <div style={{background: '#d9d9d9', borderRadius: '10px', padding: '10px 20px'}}>
                            <WrapperStyleTextSell>
                                {/*{renderStar(productDetails?.rating)}*/}
                                <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}/>
                                <span className="sell"> | Da ban 1000+</span>
                            </WrapperStyleTextSell>
                            <WrapperAddressProduct>
                                <span className="diachi">Adress: </span>
                                <span className="adress">{user?.address}</span>
                                <span className="change-address"> doi dia chi</span>
                            </WrapperAddressProduct>
                            <WrapperDescriptionProduct>
                                <span className='description'>Description</span>
                                <br></br>
                                <span className="mota">{productDetails?.description}</span>
                            </WrapperDescriptionProduct>
                            <WrapperColorSelect>
                                <span>Select Color:</span>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    {colors.map(color => (
                                        <ColorSwatch
                                            key = {color}
                                            color={color}
                                            isSelected={selectedColor === color}
                                            onClick={() => handleColorChange(color)}
                                        />
                                    ))}
                                </div>
                            </WrapperColorSelect>
                            <WrapperSizeSelect>
                                <span>Select Size:</span>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    {sizes.map(size => (
                                        <SizeButton
                                            key = {size}
                                            isSelected={selectedSize === size}
                                            onClick={() => handleSizeChange(size)}
                                            >{size}</SizeButton>
                                    ))}
                                </div>
                            </WrapperSizeSelect>
                            <div style={{margin: '10px 0 20px'}}>
                                <div style={{margin: '10px 0', fontSize: '18px', fontWeight: '500'}}>So luong</div>
                                <WrapperQualityProduct>
                                    <button style={{border: 'none', background: 'transparent',}}>
                                        <MinusOutlined style={{color: '#000', fontSize: '20px',  cursor: 'pointer'}} onClick={()=> handlChangeCount('decrease')}/>
                                    </button>
                                    <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct}/>
                                    <button style={{border: 'none', background: 'transparent',}}>
                                        <PlusOutlined style={{color: '#000', fontSize: '20px',  cursor: 'pointer'}} onClick={()=> handlChangeCount('increase')} />     
                                    </button>
                                </WrapperQualityProduct>
                            </div>            
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                                <ButtonComponent
                                    size={40}
                                    style={{ 
                                        background: '#212121',
                                        borderRadius: '5px',
                                        height: '48px',
                                        width: '220px',
                                        marginTop: '10px',

                                    
                                    }}
                                    onClick={handleAddOrderProduct}
                                    textbutton={'Add to cart'}
                                    styleTextButton={{
                                        color: '#fff',
                                        
                                    }}
                                >
                                
                                </ButtonComponent>
                        </div>

                    
                    </Col>
                </Row>
            </div>
        </Loading>
    );
};

export default DetailProductPage;