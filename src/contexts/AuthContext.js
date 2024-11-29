import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetChat,
  useGetCurrentAccount,
  useGetUser,
} from "../lib/react-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "../Reducer/authReducer";
import { appwriteConfig, client } from "../lib/apprwite/config";
import { setChatRr, setChatsRr } from "../Reducer/ChatReducer";
const MainContext = createContext();
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: getCurrentAccount } = useGetCurrentAccount();
  const { mutateAsync: getUser } = useGetUser();
  const { mutateAsync: getChat } = useGetChat();
  const [notification, setNotification] = useState();
  const { chats } = useSelector((store) => store?.chatStore);

    
  const getChatFunc = useCallback(
    async (chatId, chats) => {
      const chatsRes = chats?.filter((chat) => chat?.active && chat);
      const getChatRes = await getChat({ chatId: chatId || chatsRes[0]?.$id });
      if (getChatRes.data) dispatch(setChatRr(getChatRes.data));
    },
    [getChat, dispatch]
  );  
  const getUserFunc = useCallback(async () => {
    if(getCurrentAccount?.error?.code === 401) {
      navigate("/auth")
      dispatch(userReducer({}));
      dispatch(setChatsRr([]));
    }
    else if (getCurrentAccount?.data) {
      const useGetUserRes = await getUser({
        userId: getCurrentAccount?.data?.$id,
      });
      if (useGetUserRes.data)
        dispatch(userReducer(useGetUserRes?.data?.documents[0]));
    }
  }, [getCurrentAccount, getUser, dispatch]);

  useEffect(() => {
    const handleOnline = () => navigate("/");
    const handleOffline = () => navigate("/ofline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate]);

  useEffect(() => {
      getUserFunc();
      const unSubscribe = client.subscribe(
        [
          `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.userCollectionId}.documents`,
          `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.chatCollectionId}.documents`,
        ],
        () => {
          getUserFunc();
        }
      );
      return () => unSubscribe();
  }, [getUserFunc,getCurrentAccount,dispatch]);

  useEffect(() => {
    if (chats && getCurrentAccount?.data) {
      getChatFunc(null, chats);
      const unSubscribeMessage = client.subscribe(
        [
          `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents`,
        ],
        (e) => {
          console.log("render subs");
          getChatFunc(e?.payload?.chat?.$id, chats);
        }
      );
      return () => unSubscribeMessage();
    }
  }, [chats, getChatFunc,getCurrentAccount]);

  useEffect(() => {
    var time = 0;
    const notInterval = setInterval(() => {
      time++;
      if (time >= 3) {
        setNotification(null);
        clearInterval(notInterval);
      }
    }, 1000);
    return () => {
      clearInterval(notInterval);
    };
  }, [notification]);

  const value = {
    notification,
    setNotification,
  };
  return (
    <MainContext.Provider value={value}>
      <div
        className={`position-absolute text-dark ${
          notification ? "alert" : "hidden"
        } ${
          notification?.type === "error"
            ? "alert-danger"
            : notification?.type === "success"
            ? "alert-success"
            : ""
        }`}
        style={{zIndex:100, top: "1rem", left: "1rem" }}
        role="alert"
      >
        {notification?.desc}
      </div>
      {children}
    </MainContext.Provider>
  );
};
export default AuthProvider;
export const useMainContext = () => useContext(MainContext);
