import React from 'react';
import './category.css'

import GetCategoryCom from './GetCategoryCom';
import AddCategoryCom from './AddCategoryCom';

import SearchCategoryCom from './SearchCategoryCom';
import PaginationCategory from './PaginationCategory';


export default function HomeaCategory() {


  return (
    <>
    <div className=' ms-5'>

      <h3 className=' my-2 text-center'>
        Dashboard Category
      </h3>
      {/* this section to search category*/}
      <SearchCategoryCom />

      {/* this section to get category */}
      <GetCategoryCom />

      {/* this section to add category */}
      <AddCategoryCom />
      {/* this section to pagination category */}
      <PaginationCategory />
    </div>


    </>
  )
}
