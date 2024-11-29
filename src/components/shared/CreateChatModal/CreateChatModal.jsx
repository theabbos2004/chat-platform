import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddChatModal } from '../../../Reducer/ChatReducer'
import { useCreateChat } from '../../../lib/react-query/queries'
import { schemaChat } from '../../../Hook/validation'
import { useMainContext } from '../../../contexts/AuthContext'

function CreateChatModal() {
  const {user:userStore}=useSelector(store=>store?.authStore)
  const dispatch=useDispatch()
  const {mutateAsync:createChat}=useCreateChat()
  const {setNotification}=useMainContext()

  const validate=(values)=>{
    try {
      schemaChat.parse(values);
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
  
  const onSubmit= async (values,{resetForm}) => {
    try{
      const {title}=values
      const users=[userStore?.$id]
      const createChatRes=await createChat({creator:userStore,users,title})
      if(createChatRes.error){
        throw new Error(createChatRes.error)
      }
      dispatch(AddChatModal(false))
      resetForm({
        values: { title:""},
      });
    }
    catch(error){
      setNotification({type:"success",desc:error})
    }
  }
  return (
    <div 
    className={`modal d-flex justify-content-center align-items-center `} 
    style={{backgroundColor:"rgba(0,0,0,0.8)"}}
  >
    <div className="modal-dialog" style={{minWidth:"25%"}}>
      <div className="modal-content" style={{backgroundColor:"rgba(173, 173, 173, 0.8)"}}>
        <div className="modal-header">
          <h5 className="modal-title text-light">Chat add</h5>
          <button type="button" className="btn-close" onClick={()=>dispatch(AddChatModal(false))}></button>
        </div>
        <Formik
          initialValues={{ title: '' }}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({
            isSubmitting
          }) => (
              <Form>
                <div className="modal-body d-flex flex-column gap-1">
                  <label htmlFor="title" className="form-label mb-0 d-flex" style={{ fontSize: "1rem" , color:"rgb(200,200,200)"}}>title</label>
                  <Field type="text" id="title" name="title" className="form-control text-black" style={{backgroundColor:"rgb(200,200,200)",border:"none"}} />
                  <ErrorMessage name="title" component="div" className="text-danger"/>
                </div>
              <div className="modal-footer d-flex justify-content-end align-items-center">
                <button type="submit" disabled={isSubmitting} className="btn text-white bg-success" style={{backgroundColor:"var(--chat-bg-color)",border:"none"}}>Create chat</button>
              </div>
              </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>
  )
}
export default memo(CreateChatModal)