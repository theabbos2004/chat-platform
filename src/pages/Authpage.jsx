import React, { useCallback, useEffect } from 'react'
import { AuthSection } from '../components'
import { useSignOut } from '../lib/react-query/queries'

export default function Authpage() {
  const {mutateAsync:signOut}=useSignOut()
  const signOutFunc=useCallback( async ()=>await signOut(),[signOut])
  useEffect(()=>{
    signOutFunc()
  },[signOutFunc])
  return (<AuthSection/>)
}
