import React, { memo } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useCreateUser, useLogin } from "../../../lib/react-query/queries";
import { useMainContext } from "../../../contexts/AuthContext";
import { schemaSignUp } from "../../../Hook/validation";
const SignUpForm = ({ setIsSignUp }) => {
  const {setNotification}=useMainContext()
  
  const {mutateAsync:login}=useLogin() 
  const {mutateAsync:createUser}=useCreateUser() 
  const navigate = useNavigate()
  const validate=(values)=>{
    try {
      schemaSignUp.parse(values);
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
        let {firstName,lastName,userName,email,password}=values            
        const createUserRes=await createUser({firstName,lastName,userName,email,password})
        if(createUserRes.error){
          throw new Error(createUserRes.error)
        }
        const siginInRes=await login({email,password})
        if(siginInRes.error){
          throw new Error(siginInRes.error)
        }
        actions.resetForm({ values: { firstName:"",lastName:"",userName: "", email: "", password: ""} })
        setNotification({type:"success",desc:"Welcome to platform"})
        navigate("/")
    }
    catch(error){
      setNotification({type:"error",desc:`${error}`})
    }
  }
  return (
    <Formik
      initialValues={{ firstName:"",lastName:"", userName: "", email: "", password: ""}}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({
        isSubmitting
      }) => (
        <Form
          className="p-3 card d-flex flex-column gap-3 align-items-center justify-content-center"
          style={{maxWidth:"20rem", backgroundColor:"var(--form-bg-color)"}}
        >
          <h3 className="text-light fw-bold">Sign Up</h3>
          <div className="mb-3 w-100 d-flex justify-content-between">
            <div className="col-5">
              <label htmlFor="firstName" className="form-label mb-0 d-flex text-secondary" style={{ fontSize: "0.8rem" }}>First name</label>
              <Field type="firstName" id="firstName" name="firstName" className={`form-control text-light`}
                style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }} />
              <ErrorMessage name="firstName" component="div" className=" text-danger"/>
            </div>
            <div className="col-5">
              <label htmlFor="lastName" className="form-label mb-0 d-flex text-secondary" style={{ fontSize: "0.8rem" }}>last name</label>
              <Field type="text" id="lastName" name="lastName" className={`form-control text-light`}
                style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }} />
              <ErrorMessage name="lastName" component="div" className=" text-danger"/>
            </div>
          </div>
          <div className="mb-3 w-100">
              <label htmlFor="userName" className="form-label mb-0 d-flex text-secondary" style={{ fontSize: "0.8rem" }}>user name</label>
              <Field type="text" id="userName" name="userName" className={`form-control text-light`}
                style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }} />
              <ErrorMessage name="userName" component="div" className=" text-danger"/>
          </div>
          <div className="mb-3 w-100">
              <label htmlFor="email" className="form-label mb-0 d-flex text-secondary" style={{ fontSize: "0.8rem" }}>Email</label>
              <Field type="text" id="email" name="email" className={`form-control text-light`}
                style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }} />
              <ErrorMessage name="email" component="div" className=" text-danger"/>
          </div>
          <div className="mb-3 w-100">
              <label htmlFor="password" className="form-label mb-0 d-flex text-secondary" style={{ fontSize: "0.8rem" }}>Password</label>
              <Field type="text" id="password" name="password" className={`form-control text-light`}
                style={{ backgroundColor: "var(--form-input-bg-color)", border: "none" }} />
              <ErrorMessage name="password" component="div" className=" text-danger"/>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-100 btn text-white" style={{backgroundColor:"var(--blue-color)"}}>
            {isSubmitting ? "... Loading" : "Sign Up"}
          </button>
          <div className="w-100 d-flex m-2" style={{ fontSize: "0.8rem" }}>
            <div className="fw-medium text-secondary">If you've account</div>
            <div
              className="ms-2 cursor-pointer text-primary"
              onClick={() => setIsSignUp(false)}
            >I've account</div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default memo(SignUpForm);
