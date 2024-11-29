import React, { memo } from "react";
import { useLogOut } from "../../../lib/react-query/queries";
import { useMainContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userReducer } from "../../../Reducer/authReducer";

const DangerZone = () => {
  const { mutateAsync: logOut } = useLogOut();
  const { setNotification } = useMainContext();
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const logOutFunc = async () => {
    try {
      const logOutRes = await logOut();
      if (logOutRes?.error) {
        throw new Error(logOutRes?.error);
      }
      dispatch(userReducer({}))
      setNotification({ type: "success", desc: `success` });
      navigate("/auth")
    } catch (error) {
      setNotification({ type: "error", desc: `${error}` });
    }
  };
  return (
    <div
      className="p-3 w-full flex-wrap rounded-2 gap-4 d-flex align-items-center justify-content-around text-secondary"
      style={{ backgroundColor: "var(--form-bg-color)" }}
    >
      <button
        className="btn btn-outline-warning border-2 fw-semibold text-decoration-none m-0 py-sm-1 px-sm-2 py-1 px-2"
        onClick={logOutFunc}
      >
        Log Out
      </button>
    </div>
  );
};

export default memo(DangerZone);
