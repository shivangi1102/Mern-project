import React, {useState} from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { authenticate, isauthenticate, signin } from '../auth/helper';

const Signin = () => {
    const [values, setValues] =useState({
        email: "abcd@gmail.com",
        password:"1234",
        error:"",
        loading:false,
        didRedirect:false
       });

    const  {email,password,error,loading,didRedirect} = values;
    const {user} = isauthenticate();

    const handleChange = name => event => {
        setValues({...values,error:false, [name]: event.target.value})
    }

    const onSubmit = event =>{
        event.preventDefault()
        setValues({...values,error:false, loading:true})
        signin({email,password})
        .then(data => {
            if(data.error){
                setValues({...values,error: data.error,loading:false})
            }
            else{
                authenticate(data,() =>{
                    setValues({
                        ...values,
                        didRedirect:true
                    })
                }) 
            }
        })
        .catch(console.log("Error in signin"));
    }

    const performRedirect =() => {
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }
            else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isauthenticate()){
            return <Redirect to="/"/>
        }
    }
    
       const loadingMessage =() =>{
        return (
          loading && (
            <div className="alert alert-info">
                Loading....
            </div>
          )
       )}

       const errorMessage =() =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                    style={{display: error ? "": "none"}}
                    >
                        {error}
                    </div>
                 </div>
            </div>
       )}



    const signInForm =() =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                        <label  className="text-light" >Email</label>
                                <input className="form-control" 
                                 onChange={handleChange("email")}
                                 type="email"
                                 value ={email} />
                        </div>
                        <div className="form-group">
                        <label  className="text-light" >Passowrd</label>
                                <input className="form-control" 
                                onChange={handleChange("password")}
                                type="password"
                                value ={password} />
                        </div>
                        <div className="d-grid mt-3">
                        <button onClick={onSubmit} type='button' className="btn btn-success">Submit</button>
                        </div>
                       
                    </form>
                </div>
            </div>
        )
    }

  return (
    <Base title='Sign In ' description='This is signin for user'>
       {errorMessage()}
       {loadingMessage()}
       {signInForm()}
       {performRedirect()}
    
    </Base>
  )
}

export default Signin