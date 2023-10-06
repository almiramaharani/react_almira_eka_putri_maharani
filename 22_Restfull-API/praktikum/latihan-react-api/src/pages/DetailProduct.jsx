import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import { detailProduct } from "../store/detailProductSlice";
import { useDispatch, useSelector } from 'react-redux';


export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const defaultImage = 'https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iphone/iphone-14-pro-max-colors.png';

    const dispatch = useDispatch();
    const { detailData } = useSelector((state) => state.detail);
    
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(detailProduct(id));
        };
        fetchData();
    }, [id, dispatch]);

    console.log(detailData);
    
    const {
        productName,
        category,
        image,
        freshness,
        price,
        addDesc
    } = detailData;

    const handleBack = () => {
        navigate(-1);
    }    
    return (
        <>
            <Button style={{marginTop: '30px', marginLeft: '10px'}} onClick={handleBack}>Back</Button>
            <div className="container" style={{ marginTop: '10%', minWidth: '100%' }}>
                <div className="row">
                    <div className="col-1">
                        <img 
                            src={image||defaultImage} 
                            alt={productName} 
                            onError={(e) => {
                                e.target.src = defaultImage;
                            }}
                            style={{width: '10em', height: '200px'}}
                            />
                    </div>
                    <div className="col" style={{ marginLeft: '130px', textAlign: 'left' }}>
                        <h2>{productName}</h2>
                        <div className="row mb-2">
                            <div className="col-4">
                                <Badge bg='info'>{category}</Badge>
                            </div>
                            <div className="col">
                                <Badge bg='secondary'>{freshness}</Badge>
                            </div>
                        </div>
                        <p>Price: ${price}</p>
                        <p style={{ color: '#575A5E' }}>{addDesc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}