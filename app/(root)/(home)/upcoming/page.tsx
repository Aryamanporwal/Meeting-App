import React from 'react'
import CallList from '@/components/ui/callList'
const upcoming = () => {
  return (
    <section className = "flex size-full flex-col gap-10 text-white">
      <h1 className = 'text-3xl font-bold'>
        Upcoming
      </h1>
      <CallList type={'upcoming'}/>
    </section>
  )
}

export default upcoming