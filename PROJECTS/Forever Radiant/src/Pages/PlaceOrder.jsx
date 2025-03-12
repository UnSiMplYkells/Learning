import React from 'react'
import OrderSummary from "../Features/Order/OrderSummary"
import OrderDelivery from "../Features/Order/OrderDelivery"

export default function PlaceOrder() {
  return (
    <>
      <OrderSummary />
      <OrderDelivery />
    </>
  )
}
