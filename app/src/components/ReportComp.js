import React from 'react'

const ReportComp = ({heading , desc}) => {
  return (
    <div className='mt-10'>
      <h2 className="text-lg font-bold">{heading} : </h2>
      <p className="text-gray-700">{desc}</p>
    </div>
  )
}

export default ReportComp
