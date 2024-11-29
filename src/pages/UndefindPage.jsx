import React from 'react'
import bgImage from "../assets/img/undefind-page.png"
export default function UndefindPage() {
  return (
    <div className=' vw-100 vh-100 d-flex flex-column justify-content-center align-items-center text-light'>
        <div style={{width:"10rem",height:"10rem",backgroundPosition:"center",backgroundSize:"cover",backgroundImage:`url(${bgImage})`}}></div>
        <div>404. That’s an error</div>
    </div>
  )
}
