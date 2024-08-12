import React from 'react'
import CouponAdd from './CouponAdd'
import CouponGet from './CouponGet'
import './coupon.css'
import CouponSearch from './CouponSearch'
import CouponPagination from './CouponPagination'
export default function CouponMain() {
  return (
    <div className=' ms-5'>
      <CouponSearch />
      <CouponAdd />
      <CouponGet />
      <CouponPagination />
    </div>
  )
}
