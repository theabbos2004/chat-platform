import React, { memo } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../lib/react-query/queries";
import { useMainContext } from "../../../contexts/AuthContext";
import {schemaSignIn} from "../../../Hook/validation";
const SignInForm = ({ setIsSignUp }) => {
  const {mutateAsync:login}=useLogin() 
  const navigate = useNavigate()
  const {setNotification}=useMainContext()
  const validate=(values)=>{
      try {
        schemaSignIn.parse(values);
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
  const onSubmit=async (values, actions) => {
    try{
      const {email,password}=values
      let auth = await login({email,password})
      if(auth?.error){ 
        throw new Error(auth?.error)
      }
      actions.resetForm({ values: {email: "", password: "" } });
      setNotification({type:"success",desc:"Welcome to platform"})
      navigate("/")
    }
    catch(error){
      setNotification({type:"error",desc:`${error}`})
    }
  }
  return (
    <Formik
      initialValues={{email: "azam@gmail.com", password: "aaaaaaaa" }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({
        isSubmitting
      }) => (
        <Form
          className="p-3 card d-flex flex-column gap-3 align-items-center justify-content-center"
          style={{maxWidth:"15rem", backgroundColor:"var(--form-bg-color)"}}
        >
           <h3 className="text-light fw-bold">Sign In</h3>
          <div>
            <label htmlFor="email" className="form-label mb-0 d-flex text-secondary" style={{ fontSize: "0.8rem" }}>Email:</label>
            <Field type="email" id="email" name="email" className={`form-control text-light`}
              style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }} />
            <ErrorMessage name="email" component="div" className=" text-danger"/>
          </div>

          <div>
            <label htmlFor="password" className="form-label mb-0 d-flex text-secondary" style={{ fontSize: "0.8rem" }}>Password:</label>
            <Field type="password" id="password" name="password" 
              className={`form-control text-light`}
              style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }}/>
            <ErrorMessage name="password" component="div" className=" text-danger"/>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-100 btn text-white" style={{ backgroundColor: "var(--blue-color)" }} >
            {isSubmitting ? "... Loading" : "Sign In"}
          </button>
          <div className="w-100 d-flex mt-2" style={{ fontSize: "0.8rem" }}>
            <div className="fw-medium text-secondary">Not yet account</div>
            <div
              className="mx-1 cursor-pointer text-primary"
              onClick={() => setIsSignUp(true)}
            >Create an account</div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default memo(SignInForm);
