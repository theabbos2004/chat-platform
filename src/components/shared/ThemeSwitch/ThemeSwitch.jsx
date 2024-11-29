import React, { memo, useEffect, useState } from 'react'
import style from "./index.module.scss"
function ThemeSwitch() {
    const [dark,setDark]=useState(true)
    const lightTheme=()=>{
        setDark(false)
        document.querySelector("body").setAttribute("data-theme","light")
        localStorage.setItem("data-theme","light")
    }
    const darkTheme=()=>{
        setDark(true)
        document.querySelector("body").setAttribute("data-theme","dark")
        localStorage.setItem("data-theme","dark")
    }
    useEffect(()=>{
        const themeMode=localStorage.getItem("data-theme")
        if(themeMode==="light"){
            setDark(false)
        }
    },[])
  return (
    <div className={`${style.input_box} cursor-pointer d-flex align-items-center`}>
        {
            dark ? 
                <i 
                    onClick={()=>lightTheme()}
                    className="fs-5 bi bi-moon text-light">
                </i> :
                <i 
                    onClick={()=>darkTheme()}
                    className="fs-5 bi bi-brightness-high text-light">
                </i>
        }
    </div>
  )
}
export default memo(ThemeSwitch)