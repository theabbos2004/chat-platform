import React, { memo,  useCallback,  useEffect,  useState } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "../shared";
import { useGetUsers, useUpdateChat } from "../../lib/react-query/queries";
import { useMainContext } from "../../contexts/AuthContext";
import { appwriteConfig, client } from "../../lib/apprwite/config";
function Members() {
  const {$id } = useSelector((store) => store?.authStore?.user);
  const {chat} = useSelector((store) => store?.chatStore);
  const {data:getUsers,isLoading:getUsersIsLoading}=useGetUsers()
  const [users,setUsers]=useState()
  const {mutateAsync:updateChat}=useUpdateChat()
  const {setNotification}=useMainContext()

  const getUsersFunc=useCallback(async (getUsers)=>{
    setUsers(getUsers?.data?.documents)
  },[setUsers]) 
  
  useEffect(()=>{
    if(getUsers?.data){
      getUsersFunc(getUsers)
      const unSubscribe = client.subscribe([`databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.chatCollectionId}.documents`,`databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.userCollectionId}.documents`], () => {
          getUsersFunc()
      });
      return () => {
          unSubscribe()
      }
    }
  },[getUsers,getUsersFunc])


  const setUsersFunc=async (user)=>{
    const newUser=users.map(userEvent=>{
      if(user?.$id===userEvent?.$id){
        return {...userEvent,...user}
      }
      else {
        return userEvent
      }
    })
    setUsers(newUser)
  }
  const addUserToChat=async (user)=>{
    try{
      setUsersFunc({...user,isLoading:true})
      const newUser=[...chat?.users,user?.$id]
      const updateChatRes=await updateChat({chatId:chat?.$id,data:{users:newUser}})
      if(updateChatRes.error){
        throw new Error(updateChatRes.error)
      }
    }
    catch(error){
      setNotification({type:"error",desc:`${error}`})
    }
    finally{
      setUsersFunc({...user,isLoading:false})
    }
  }
  const delUserToChat=async (user)=>{
    try{
      setUsersFunc({...user,isLoading:true})
      const newUser=chat?.users?.filter(chatUser=>chatUser?.$id!==user?.$id && chatUser)
      const updateChatRes=await updateChat({chatId:chat?.$id,data:{users:newUser}})
      if(updateChatRes.error){
        throw new Error(updateChatRes.error)
      }
    }
    catch(error){
      setNotification({type:"error",desc:`${error}`})
    }
    finally{
      setUsersFunc({...user,isLoading:false})
    }
  }
  return (
    <ul className="h-100 py-2 col container text-light overflow-y-scroll">
      {
        !chat || getUsersIsLoading ? (
          <li className="row">
            <Skeleton count={4} height="2.8rem" classNameBox="m-0 my-2" />
          </li>
        )
        : !chat?.$id ? (
        <li
          className="row m-0 px-1 my-2 text-center d-flex justify-content-center align-content-center"
          style={{ height: "2.8rem" }}
        >
          group not selected
        </li>
      )  : chat?.users?.length <= 0 ? (
        <li
          className="row m-0 px-1 my-2 text-center d-flex justify-content-center align-content-center"
          style={{ height: "2.8rem" }}
        >
          members are not available
        </li>
      ) : (
        users?.map((item, index) => (
          item?.$id !== $id && chat?.creator?.$id !== item?.$id && <li
            key={index}
            className="row m-0 my-2 py-3 rounded-3"
            style={{ backgroundColor: "var(--chat-btn-color)" }}
          >
            <div className="col-3 m-0 d-flex justify-content-center align-items-center">
              <div
                className="bg-secondary rounded-5 position-relative"
                style={{ width: "2rem", height: "2rem" }}
              >
                <img
                  src={
                    item?.avatar
                      ? item?.avatar
                      : require("../../assets/img/profile-anonim.png")
                  }
                  alt="profile"
                  className="w-100 h-100 rounded-5 object-fit-cover"
                />
                <div
                  className={`rounded-5 ${
                    item?.is_online ? "d-block" : "d-none"
                  }`}
                  style={{
                    position: "absolute",
                    top: "0rem",
                    left: "0rem",
                    width: "0.6rem",
                    height: "0.6rem",
                    backgroundColor: "var(--online-green-color)",
                    border: "0.1rem solid var(--chat-btn-color)",
                  }}
                ></div>
              </div>
            </div>
            <div className="col-7 d-flex justify-content-between align-items-center">
              <div className="text-light text-capitalize">{item?.userName}</div>
            </div>
            <div className="col-2 d-flex justify-content-between align-items-center">
              {item?.isLoading ? (
                <div
                  className="spinner-border row"
                  role="status"
                  style={{ width: "1.25rem", height: "1.25rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : chat?.creator?.$id === $id && chat?.users?.filter(user=>user?.$id===item?.$id && item)[0] ? (
                <i
                  className="row bi bi-dash-circle-fill fs-5 text-danger cursor-pointer"
                  onClick={async () => {
                    await delUserToChat(item)
                  }}
                ></i>
              ) :!chat?.users?.filter(user=>user?.$id===item?.$id && item)[0]? (
                <i
                  className="row bi bi-plus-circle-fill fs-5 text-success cursor-pointer"
                  onClick={async () => {
                    await addUserToChat(item)
                  }}
                ></i>
              ):""}
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
export default memo(Members)