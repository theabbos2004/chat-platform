import { useMutation, useQuery, useQueryClient } from "react-query"
import { createChat, createMessage, createUser, deleteChat, deleteChatMessage, getChat, getChats, getCurrentAccount, getUser, getUsers, login, logOut, passwordUpdate, signOut, updateChat, updateChatMessage, updateUser } from "../apprwite/api"


export const useGetCurrentAccount=()=>{
    return useQuery({
        queryKey:["getCurrentAccount"],
        queryFn:getCurrentAccount
    })
}

export const usePasswordUpdate=()=>{
    return useMutation({
        mutationFn:({newPassword,oldPassword})=>passwordUpdate({newPassword,oldPassword})})
}

export const useLogOut=()=>{
    return useMutation({
        mutationFn:logOut
    })
}

export const useCreateUser=()=>{
    return useMutation({
        mutationFn:({firstName,lastName,email,password,userName})=>createUser({firstName,lastName,email,password,userName})})
}

export const useGetUser=()=>{
    return useMutation({
        mutationFn:({userId})=>getUser({userId})})
}

export const useGetUsers=()=>{
    return useQuery({
        queryKey:["getUsers"],
        queryFn:getUsers
    })
}
export const useLogin=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({email,password})=>login({email,password}),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: ["getCurrentAccount"],
            })
          },
    })
}

export const useSignOut=()=>{
    return useMutation({
        mutationFn:signOut
    })
}
export const useUpdateUser=()=>{
    return useMutation({
        mutationFn:({userId,data})=>updateUser({userId,data})
    })
}

// ==================== chat
export const useCreateChat=()=>{
    return useMutation({
        mutationFn:({creator,users,title})=>createChat({creator,users,title})
    })
}
export const useGetChats=()=>{
    return useMutation({
        mutationFn:getChats
    })
}
export const useGetChat=()=>{
    return useMutation({
        mutationFn:({chatId})=>getChat({chatId})
    })
}
export const useUpdateChat=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:({chatId,data})=>updateChat({chatId,data}),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:["getUsers",data?.$id]
            })
        }
    })
}
export const useDeleteChat=()=>{
    return useMutation({
        mutationFn:({chatId})=>deleteChat({chatId})
    })
}
// ==================== message
export const useCreateMesagge=()=>{
    return useMutation({
        mutationFn:({ creator, chat , text })=>createMessage({ creator, chat , text })
    })
}
export const useUpdateChatMessage=()=>{
    return useMutation({
        mutationFn:({messageId,text})=>updateChatMessage({messageId,text})
    })
}
export const useDeleteChatMessage=()=>{
    return useMutation({
        mutationFn:({messageId})=>deleteChatMessage({messageId})
    })
}
