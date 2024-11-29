import { Query ,ID} from "appwrite";
import { account, appwriteConfig, database } from "./config";
// ======================= account
export async function getCurrentAccount() {
  try {
    const accountRes = await account.get()
    if (!accountRes) throw Error()
    return { data: accountRes };
  } catch (error) {
    return { error };
  }
}

export async function createAccount({ email, password ,name}) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name,
  );
  if(!newAccount) throw Error
  return {data:newAccount};
  } catch (error) {
    return { error };
  }
}
export async function passwordUpdate({newPassword,oldPassword}) {
  try {
    const updatePasswordRes = await account.updatePassword(
      newPassword,
      oldPassword
    );
  if(!updatePasswordRes) throw Error
  return {data:updatePasswordRes};
  } catch (error) {
    return { error };
  }
}
export async function logOut() {
  try {
    const deleteSession = await account.deleteSession("current");
  if(!deleteSession) throw Error
  return {data:deleteSession};
  } catch (error) {
    return { error };
  }
}

// ======================= user
export async function createUser({ firstName,lastName,email,password,userName}) {
  try {
    const createAccountRes = await createAccount({
      email,
      password,
      name:userName,
    });
    if(createAccountRes.error){
       throw new Error(createAccountRes.error)
    }
    const createUserRes = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        userId:createAccountRes?.data?.$id,
        userName,
        firstName,
        lastName,
        email
      }
    );
    if(!createUserRes) throw Error

    return {data:createUserRes};
  } 
  catch (error) {
    return { error };
  }
}

export  const getUser=async ({userId})=>{
  try{
      const getUserRes = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          [Query.equal("userId", userId)]
      );
      if (!getUserRes) throw Error;
      return {data:getUserRes};
  }
  catch(error){
    return { error }
  }
}

export  const getUsers=async ()=>{
  try{
      const getUsersRes = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId
      );
      if (!getUsersRes) throw Error;
      return {data:getUsersRes};
  }
  catch(error){
    return { error }
  }
}
export  const updateUser=async ({userId,data})=>{
  try{
      const updateUserRes = await database.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          userId,
          data
      );
      if (!updateUserRes) throw Error;
      return {data:updateUserRes};
  }
  catch(error){
    return { error }
  }
}

//  ============================ Auth

export async function login({ email, password }) {
  try {
    const loginRes = await account.createEmailPasswordSession(email, password);
    if (!loginRes) throw Error()
      return { data: loginRes };
  } catch (error) {
    return { error };
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return {data:session};
  }
  catch(error){
      return {error}
}
}

//  ============================ chat

export async function createChat({ creator,users, title }) {
  try {
    const createChatRes = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.chatCollectionId,
      ID.unique(),
      {
        creator:creator.$id,
        users,
        title
      }
    );
    if (!createChatRes) throw Error()
      return { data: createChatRes };
  } catch (error) {
    return { error };
  }
}

export  const getChats=async ()=>{
  try{
      const getChatsRes = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.chatCollectionId
      );
      if (!getChatsRes) throw Error;
      return {data:getChatsRes};
  }
  catch(error){
    return { error }
  }
}

export  const getChat=async ({chatId})=>{
  try{
      const getChatsRes = await database.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.chatCollectionId,
          chatId
      );
      if (!getChatsRes) throw Error;
      return {data:getChatsRes};
  }
  catch(error){
    return { error }
  }
}

export  const updateChat=async ({chatId,data})=>{
  try{
      const updateChatsRes = await database.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.chatCollectionId,
          chatId,
          data
      );
      if (!updateChatsRes) throw Error;
      return {data:updateChatsRes};
  }
  catch(error){
    return { error }
  }
}

export  const deleteChat=async ({chatId})=>{
  try{
      const deleteChatsRes = await database.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.chatCollectionId,
          chatId
      );
      if (!deleteChatsRes) throw Error;
      return {data:deleteChatsRes};
  }
  catch(error){
    return { error }
  }
}

//  ============================ message

export async function createMessage({ creator, chat , text }) {
  try {
    const createChatRes = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      ID.unique(),
      {
        creator:creator?.$id,
        chat:chat?.$id,
        text
      }
    );
    if (!createChatRes) throw Error()
      return { data: createChatRes };
  } catch (error) {
    return { error };
  }
}

export  const updateChatMessage=async ({messageId,text})=>{
  try{
      const updateChatsRes = await database.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.messageCollectionId,
          messageId,
          {text}
      );
      if (!updateChatsRes) throw Error;
      return {data:updateChatsRes};
  }
  catch(error){
    return { error }
  }
}

export  const deleteChatMessage=async ({messageId})=>{
  try{
      const deleteChatsRes = await database.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.messageCollectionId,
          messageId
      );
      if (!deleteChatsRes) throw Error;
      return {data:deleteChatsRes};
  }
  catch(error){
    return { error }
  }
}