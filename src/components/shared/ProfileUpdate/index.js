import React, { memo } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {  useSelector } from "react-redux";
import { schemaUpdateUser } from "../../../Hook/validation";
import { useUpdateUser } from "../../../lib/react-query/queries";
import { useMainContext } from "../../../contexts/AuthContext";

const ProfileUpdate = () => {
  const {user} = useSelector((store) => store?.authStore);
  const {mutateAsync:updateUser}=useUpdateUser()
  const {setNotification}=useMainContext()
  const validate=(values)=>{
    try {
      schemaUpdateUser.parse(values);
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
    return (
      <Formik
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
        }}
        validate={validate}
        onSubmit={async (values) => {
            try{
                let { firstName, lastName , email } = values;
                const updateUserRes=await updateUser({userId:user?.$id,data:{firstName,lastName,email}})
                if(updateUserRes.error){
                    throw new Error(updateUserRes.error)
                }
                setNotification({type:"success",desc:"successfull"})
            }
            catch(error){
                setNotification({type:"error",desc:`${error}`})
            }
        }}
      >
        {({ isSubmitting }) => (
          <Form
            className="p-3 w-full card d-flex flex-column align-items-center justify-content-center text-secondary"
            style={{ backgroundColor: "var(--form-bg-color)" }}
          >
            <div className="mb-3 w-100 d-flex justify-content-between">
              <div className="col-5">
                <label
                  htmlFor="firstName"
                  className="form-label mb-0 d-flex"
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--input-label-color)",
                  }}
                >
                  First name
                </label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`form-control text-light`}
                  style={{
                    backgroundColor: "var(--form-input-bg-color)",
                    border: "none",
                  }}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className=" text-danger"
                />
              </div>
              <div className="col-5">
                <label
                  htmlFor="lastName"
                  className="form-label mb-0 d-flex"
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--input-label-color)",
                  }}
                >
                  <div>Last name</div>
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`form-control text-light`}
                  style={{
                    backgroundColor: "var(--form-input-bg-color)",
                    border: "none",
                  }}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className=" text-danger"
                />
              </div>
            </div>
            <div className="mb-3 w-100">
              <label
                htmlFor="email"
                className="form-label mb-0 d-flex"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--input-label-color)",
                }}
              >
                <div>Email address </div>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`form-control text-light`}
                style={{
                  backgroundColor: "var(--form-input-bg-color)",
                  border: "none",
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className=" text-danger"
              />
            </div>
            <div className="mb-3 w-100 d-flex justify-content-between pb-3">
              <button
                type="submit"
                className="w-100 btn fw-bold text-white text-wrap"
                style={{background:"var(--blue-color)"}}
                disabled={isSubmitting}
              >{isSubmitting ? "... Loading" : "Change Profile"}</button>
            </div>
          </Form>
        )}
      </Formik>
    );
};

export default memo(ProfileUpdate);
