import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';

import { Snipper } from './components';

const Profilepage=React.lazy(()=>import("./pages/Profilepage"))
const ChatPage=React.lazy(()=>import("./pages/Chatpage"))
const Authpage=React.lazy(()=>import("./pages/Authpage"))
const UndefindPage=React.lazy(()=>import("./pages/UndefindPage"))


function App() {
  useEffect(()=>{
    const localTheme=localStorage.getItem("data-theme")
    if(localTheme==="light"){
      document.querySelector("body").setAttribute("data-theme","light")
    }
  },[])

  return (
          <Routes>
              <Route path='/' element={<React.Suspense fallback={<Snipper/>}><ChatPage/></React.Suspense>}/>
              <Route path='/profile' element={<React.Suspense fallback={<Snipper/>}><Profilepage/></React.Suspense>}/>
              <Route path='/auth' element={<React.Suspense fallback={<Snipper/>}><Authpage/></React.Suspense>}/>
              <Route path='*' element={<React.Suspense fallback={<Snipper/>}><UndefindPage/></React.Suspense>}/>
          </Routes>
  );
}

export default App;
