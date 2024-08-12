import React from 'react'
import './subCaregory.css'
import AddSubCom from './AddSubCom';
import GetSub from './GetSub';
import SearchSub from './SearchSub';
export default function HomeSubCategory() {
  return (
    <div className=' row  mx-auto text-center'>
      <h3 className=' my-2 text-center'>
        Dashboard SubCategory
      </h3>
      <AddSubCom />
      <SearchSub />
      <GetSub />
    </div>
  )
}
