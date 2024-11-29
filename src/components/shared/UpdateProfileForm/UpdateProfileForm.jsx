import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PasswordUpdate from "../PasswordUpdate";
import ProfileUpdate from "../ProfileUpdate";
import DangerZone from "../DangerZone";

const UpdateProfileForm = () => {
  const {user} = useSelector((store) => store?.authStore);
  const [navLink, setNavLink] = useState([
    {
      id:0,
      title:'Main',
      element:<ProfileUpdate/>,
      active:true
    },
    {
      id:1,
      title:'Password',
      element:<PasswordUpdate/>,
    },
    {
      id:2,
      title:'Danger',
      element:<DangerZone/>,
    },
  ]);
  const activeNav=(nav)=>{
    setNavLink(IState=>{
      return IState?.map((item,index)=>{
        if(item?.id===nav?.id){
          return {...item,active:true}
        }
        else{
          return {...item,active:false}
        }
      })
    })
  }
  if (user) {
    return (
      <div 
        className="p-3 col-8 col-sm-6 col-md-4 card d-flex flex-column align-items-center "
        style={{minHeight:"20rem", backgroundColor: "var(--form-bg-color)"}}>
        <div className="w-100 d-flex gap-2 align-items-center">
                <Link to="/" className="text-decoration-none fs-4">
                  <i className="bi bi-chevron-left text-light"></i>
                </Link>
                 <img
                    src={
                      user?.avatar
                        ? user?.avatar
                        : require("../../../assets/img/profile-anonim.png")
                    }
                    title="profile"
                    className="rounded-5 object-fit-cover"
                    style={{ width: "2rem", height: "2rem"}}
                    alt="img"
                  />
        </div>
           <nav className="w-100 navbar">
              <ul className="navbar-nav flex flex-row gap-2  me-auto py-2 mb-lg-0">
                {
                  navLink?.map((nav,navIndx)=>
                    <li 
                      className={`nav-item active cursor-pointer ${nav?.active ? "text-light" : "text-secondary"}`} 
                      key={navIndx}
                      onClick={()=>activeNav(nav)}
                      >
                      {nav?.title}
                    </li>
                  )
                }
              </ul>
          </nav>
          {
            navLink?.map((nav,navIndx)=>nav?.active && <div key={navIndx}>{nav?.element}</div>)
          }
      </div>
    )
  }
};

export default memo(UpdateProfileForm);
