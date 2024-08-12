import React from 'react'
import GetBrand from './GetBrand'
import './brand.css'
import AddBrand from './AddBrand'

import PaginationBrand from './PaginationBrand'
import SearchBrand from './SearchBrand'
export default function HomeBrand() {
    return (
        <div className=' mx-auto text-center ms-5'>
            <h3 className=' my-2 text-center'>
                Dashboard Brand
            </h3>
            <SearchBrand />
            <AddBrand />
            <GetBrand />
            <PaginationBrand />
        </div>
    )
}
