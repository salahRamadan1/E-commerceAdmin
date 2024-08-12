import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneProduct } from '../../../service/Product/actionProduct';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

import { Alert, Stack } from '@mui/material';
import UpdateImageCoverAndImages from './UpdateImageCoverAndImages';
import UpdateValue from './UpdateValue';
export default function GetOneProduct() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {
        loadingGetOneProduct, errorGetOneProduct, errorGetOneProductApi, dataOneProduct

    } = useSelector((state) => state.product)
    useEffect(() => {
        dispatch(getOneProduct(id))
    }, [])

    return (
        <div>
            {loadingGetOneProduct ? <div className=' loading d-flex justify-content-center  mt-5'>
                <div className="loader d-flex "></div>
            </div> : <>

                {dataOneProduct && <>
                    {/* section get image cover */}
                    <div className='divImageCover'>
                        <img src={`http://localhost:5001/product/${dataOneProduct.image}`} alt={dataOneProduct.name} className=' imageCoverOneProduct' />
                        <div className=' updateImageCover bg-success text-white rounded-5'>
                            <UpdateImageCoverAndImages id={dataOneProduct._id} imageCover={`http://localhost:5001/product/${dataOneProduct.image}`} />
                        </div>
                    </div>
                    {/* section to get images */}
                    <div className=' row text-center justify-content-center mt-3 '>
                        {dataOneProduct.images ? dataOneProduct.images.map((elm, i) => (
                            <div className=' col-md-4 divImages ' key={i}>
                                <img src={`http://localhost:5001/product/${elm}`} alt={dataOneProduct.name} className=' imagesOneProduct' />

                                <div className=' updateImagesOfOneproduct bg-success text-white rounded-5'  >
                                    <UpdateImageCoverAndImages index={i} id={dataOneProduct._id} images={`http://localhost:5001/product/${elm}`} />
                                </div>
                            </div>


                        )) : ""}
                        {/* section value */}
                        <div className=' row  my-2 border border-2 rounded-2'>

                            <div className=' col-sm-12 d-flex justify-content-between'>
                                <p><span className=' fw-bolder'>Name :</span> {dataOneProduct.name}</p>
                                <p><span className=' fw-bolder'>quantity :</span>    :{dataOneProduct.quantity}</p>
                                <p><span className=' fw-bolder'>sold :</span>  :{dataOneProduct.sold}</p>
                            </div>
                            <div className=' col-sm-12 d-flex justify-content-between  text-break'>
                                <p><span className=' fw-bolder'>price :</span>  :{dataOneProduct.price}</p>
                                <p><span className=' fw-bolder'>discount :</span>  :{dataOneProduct.discount}</p>
                                <p><span className=' fw-bolder'>rateCount :</span>  :{dataOneProduct.rateCount}</p>
                            </div>
                            <p><span className=' fw-bolder'>priceAfterDiscount :</span>  :{dataOneProduct.priceAfterDiscount}</p>
                            <p className=' text-break text-start'><span className=' fw-bolder'>Description :</span>  : {dataOneProduct.description}</p>
                            <div className='    text-white rounded-5 float-end'>
                                <UpdateValue id={dataOneProduct._id} />


                            </div>
                        </div>



                    </div>
                </>
                }
            </>}

            {!errorGetOneProduct && <h3 className=' text-center'> {errorGetOneProduct}</h3>}
            {errorGetOneProductApi && <h3 className=' text-center'>{errorGetOneProductApi}</h3>}
            {/* message  errorr and success */}
            <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                {/* error api get Product */}
                {errorGetOneProduct && <Alert severity="error">{errorGetOneProduct}</Alert>}
                {/* error get Product */}
                {errorGetOneProductApi && <Alert severity="error">{errorGetOneProductApi}</Alert>}
                {/* if Product deleted */}
            </Stack>


        </div>
    )
}
