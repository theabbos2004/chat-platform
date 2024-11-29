import React, { memo } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {  useSelector } from "react-redux";
import { schemaUpdatePassword } from "../../../Hook/validation";
import { useMainContext } from "../../../contexts/AuthContext";
import { usePasswordUpdate } from "../../../lib/react-query/queries";

const PasswordUpdateForm = () => {
  const {user} = useSelector((store) => store?.authStore);
  const {setNotification}=useMainContext()
  const {mutateAsync:passwordUpdate}=usePasswordUpdate()

  const validate=(values)=>{
    try {
        schemaUpdatePassword.parse(values);
      return {};
    } catch (error) {
      const errors = {};
      if (error.errors) {
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
      }
      return errors;
    }
  }
  if (user) {
    return (
      <Formik
        validate={validate}
        initialValues={{
          oldPassword:"", 
          newPassword:""
        }}
        onSubmit={async (values,actions) => {
          try{
              let { oldPassword, newPassword } = values;
              const updatePasswordRes=await passwordUpdate({newPassword,oldPassword})
              if(updatePasswordRes.error){
                  throw new Error(updatePasswordRes.error)
              }
              actions.resetForm({ values: {oldPassword:"",newPassword:""}})
              setNotification({type:"success",desc:"successfull"})
          }
          catch(error){
              setNotification({type:"error",desc:`${error}`})
          }
      }}
      >
        {({ isSubmitting }) => (
          <Form
            className="p-3 w-100 card d-flex flex-column justify-content-center text-secondary"
            style={{ backgroundColor: "var(--form-bg-color)" }}
          >
              <label
                htmlFor="oldPassword"
                className="form-label mb-0 d-flex"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--input-label-color)",
                }}
              >
                <div>Old password </div>
              </label>
              <Field
                type="text"
                id="oldPassword"
                name="oldPassword"
                className={`mb-3 form-control text-light`}
                style={{
                  backgroundColor: "var(--form-input-bg-color)",
                  border: "none",
                }}
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className=" text-danger"
              />
              <label
                htmlFor="newPassword"
                className="form-label mb-0 d-flex"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--input-label-color)",
                }}
              >
                <div>New password </div>
              </label>
              <Field
                type="text"
                id="newPassword"
                name="newPassword"
                className={`mb-3 form-control text-light`}
                style={{
                  backgroundColor: "var(--form-input-bg-color)",
                  border: "none",
                }}
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className=" text-danger"
              />
              <button
                type="submit"
                className="w-100 btn fw-bold text-white"
                style={{background:"var(--blue-color)"}}
              >
                {isSubmitting
                  ? "we Send Email message"
                  : "Change password"}
              </button>
          </Form>
        )}
      </Formik>
    );
  }
};

export default memo(PasswordUpdateForm);
