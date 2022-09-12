import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { isauthenticate } from '../auth/helper'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'


const AddCategory = () => {
   const [name,setName] = useState("")
   const [error,setError] =useState(false)
   const [success, setSuccess] = useState(false)

   const { user, token } = isauthenticate();

   const goBack =() =>(
    <div className="mt-5">
        <Link className='btn rounded btn-sm btn-info mb-3' to="/admin/dashboard">
            Admin Home
        </Link>
    </div>
   )


   const handleChange = event =>{
    setError("");
    setName(event.target.value)

   }

   const onSubmit= (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false)
    createCategory(user._id,token,{name})
        .then(data => {
        if(data.error){
            setError(true);
        }
        else {
            setName("")
            setError("");
            setSuccess(true)
        }
    })
   }

   const successMessage =() =>{
    if (success) {
        return <h4 className="text-success">
            Category created successfully
        </h4>
    }
    }

   const errorMessage =() =>{
    if (error) {
        return <h4 className="text-danger">
            Category creation failed!!
        </h4>
    }
   }



   const myCategoryForm = () => (
    <form>
        <div className="form-group">
            <p className="lead fs-4">
                Enter the categogy
            </p>
            <input type="text"
            className="form-control my-3"
            autoFocus
            onChange={handleChange}
            value={name}
            required
            placeholder="for ex. summer"
            />
            <button onClick={onSubmit}
            type='button' className="btn btn-outline-info">Create category</button>
          
        </div>
    </form>
   )


  return (
    <Base title='Create a categogy' 
    description='Add a new category'
    className='container bg-info p-4'
    >
        <div className="row bg-white rounded py-4">
            <div className="col-md-8 offset-md-2">
            {successMessage()}
            {errorMessage()}
            {myCategoryForm()}
            {goBack()}
            </div>
        </div>
    
    </Base>
  )
}

export default AddCategory