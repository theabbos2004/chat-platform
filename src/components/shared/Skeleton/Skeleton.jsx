import React, { memo } from 'react'

function Skeleton({
    count=1,
    classNameBox,
    className,
    height="1rem",
    width="100%"
}) {
    let arr=[]
    for (let i = 0; i < count; i++) {
        arr.push('')
    }
  return (
    <ul className={`react-loading-skeleton-box ${classNameBox}`}>
        {   
            arr.map((item,index)=><li key={index} className={`react-loading-skeleton ${className}`} style={{height,width}}>
            </li>)
        }
    </ul>
  )
}
export default memo(Skeleton)