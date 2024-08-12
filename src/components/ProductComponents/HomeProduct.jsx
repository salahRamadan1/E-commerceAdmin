import React from 'react'
import AddProduct from './AddProduct'
import './product.css'
import GetProduct from './GetProduct'
import SearchProduct from './SearchProduct'
import PaginationProduct from './PaginationProduct'
export default function HomeProduct() {
    return (
        <div className=' ms-5'>
            <h3 className=' my-2 text-center'>
                Dashboard Product
            </h3>
            <SearchProduct/>
            <AddProduct />
            <GetProduct />
            <PaginationProduct/>
        </div>
    )
}
