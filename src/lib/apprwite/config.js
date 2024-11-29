import { Client, Account, Databases , Storage, Avatars} from 'appwrite';

export const appwriteConfig = {
    url: process.env.REACT_APP_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    databaseId: process.env.REACT_APP_DATABASE_ID,

    userCollectionId: process.env.REACT_APP_USER_COLECTION_ID,
    chatCollectionId: process.env.REACT_APP_CHAT_COLECTION_ID,
    messageCollectionId: process.env.REACT_APP_MESSAGE_COLECTION_ID,
  };

export const client = new Client();

client
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export { ID } from 'appwrite';