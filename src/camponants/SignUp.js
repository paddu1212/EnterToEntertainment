// Import necessary React components and hooks
import React, { useState } from 'react'
import { ErrorMessage, Form, Field, Formik } from 'formik'
import { RxCross2 } from "react-icons/rx";
import { SignUpSchema } from './schema';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";


// Share component for displaying sharing options
const Share = ({ isvisible, onClose }) => {
    // Function to close the Share modal
    const [isLoading, setIsLoading] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);
    const [rePasswordShow, setRePasswordShow] = useState(false);
    const handleClose = (e) => {
        if(e.target.id === 'wrapper') return onClose();
    }
    // Return null if the modal is not visible
    if (!isvisible) return null

    const handleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }
    const handleConfirmShowPassword = () => {
        setRePasswordShow(!rePasswordShow);
    }

    // JSX for the Share component
    return (
        <div 
            className='fixed inset-0 bg-black text-black bg-opacity-25 backdrop-blur-sm h-full w-full z-50'
            id='wrapper'
            onClick={(e)=>handleClose(e)}
        >
            <div className='w-[50%] border-2 ml-96 mt-10 max-lg:m-28 max-md:m-32 max-sm:m-2 max-sm:w-[96%] rounded-md'>

                {/* Close button with RxCross2 icon*/}
                <button 
                    className='text-black text-xl float-end mr-5 mt-3'
                    onClick={()=> onClose()}
                ><RxCross2 className='font-bold size-6 hover:text-red-600 hover:size-8 hover:-mt-1 hover:-mr-1 hover:font-extrabold'/></button>

                
                <div className='bg-white p-5 font-bold'>Sign Up</div>
                <hr className='h-1 bg-black'/>

                <Formik
                    initialValues={{
                        Name : '',
                        Email : '',
                        DOB : '',
                        Password : '',
                        RePassword : ''
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={(values) => {
                        setIsLoading(true);
                        try{
                            axios.post(`${process.env.REACT_APP_INVOKE}/signUp`, values)
                            setTimeout(() => {
                                alert('Your Account created Successful...') 
                                setIsLoading(false);
                                onClose();
                            }, 1000)
                        } 
                        catch(error){
                            console.log(error)
                            setIsLoading(false);
                        }
                        // console.log(values) 
                    }}
                >
                    <Form className='bg-white'>
                        <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                            <label htmlFor='Name' className='font-bold'>Enter your Name</label>
                            <Field type='text' 
                                name='Name'
                                id='Name'
                                className='px-2 border-2 border-gray-400 h-10 rounded-md' />
                            <div className='text-red-600'>
                                <ErrorMessage name='Name' />
                            </div>
                        </div>
                        
                        <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                            <label htmlFor='Email' className='font-bold'>Enter your Email</label>
                            <Field 
                                type='text'
                                name='Email'
                                id='Email'
                                className='px-2 border-2 border-gray-400 h-10 rounded-md' />
                            <div className='text-red-600'>
                                <ErrorMessage name='Email' />
                            </div>
                        </div>

                        <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                            <label htmlFor='DOB' className='font-bold'>Enter your Date Of Birth</label>
                            <Field 
                                type='date'
                                name='DOB'
                                id='DOB'
                                className='px-2 border-2 border-gray-400 h-10 rounded-md' />
                            <div className='text-red-600'>
                                <ErrorMessage name='DOB' />
                            </div>
                        </div>

                        <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                            <label htmlFor='Password' className='font-bold'>Set Password</label>
                            <Field 
                                type={passwordShow ? 'text' : 'password'}
                                name='Password'
                                id='Password'
                                className='px-2 border-2 border-gray-400 h-10 rounded-md' 
                            />
                            <div className='relative'>
                                <span 
                                    class="absolute text-2xl toggle-password -top-8 right-2 cursor-pointer"
                                    onClick={()=>handleShowPassword()}
                                >{passwordShow ? <FaEye /> : <FaEyeSlash />}</span>
                            </div>
                            <div className='text-red-600'>
                                <ErrorMessage name='Password' />
                            </div>
                        </div>

                        <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                            <label 
                                htmlFor='RePassword' className='font-bold'>ReEnter Password</label>
                            <Field 
                                type={rePasswordShow ? 'text' : 'password'}
                                id='RePassword'
                                name='RePassword'
                                className='px-2 border-2 border-gray-400 h-10 rounded-md'
                            />
                            <div className='relative'>
                                <span 
                                    class="absolute text-2xl toggle-password -top-8 right-2 cursor-pointer"
                                    onClick={()=>handleConfirmShowPassword()}
                                >{rePasswordShow ? <FaEye /> : <FaEyeSlash />}</span>
                            </div>
                            <div className='text-red-600'>
                                <ErrorMessage name='RePassword' />
                            </div>
                        </div>
                        <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                            <button 
                                type='submit'
                                className=' h-10 bg-gray-600 hover:bg-gray-700 rounded-md text-white'
                                disabled = {isLoading}
                            >{(isLoading) ? 'Submitting...' : 'Submit'}</button>
                        </div>
                        <div className='flex flex-col mx-10 p-2 max-sm:mx-2'>
                            <p onClick={()=> onClose()}> Do You have account  
                                <snan className='text-blue-600 cursor-pointer'> Click here</snan> 
                            </p>
                        </div>
                    </Form>
                </Formik>
            </div>
        
        </div>
    )
}

// Export the Share component as the default export
export default Share
