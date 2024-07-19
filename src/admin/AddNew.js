import React from 'react'
import { Field, Form, Formik } from 'formik'
import { MdKeyboardBackspace } from "react-icons/md";
import axios from 'axios'
import { Link } from 'react-router-dom';

function AddNew() {
    // console.log(action.setFieldValue);
  return (
    <div className='py-28 h-auto bg-gray-900'>
        <Link to='/admin'>
            <MdKeyboardBackspace className='ml-28 size-10 cursor-pointer' />
        </Link>
        
      <Formik
        initialValues={{
            type: '',
            tittle: '',
            desc: '',
            language : '',
            year: '',
            grade: '',
            genre : '',
            actors: '',
            image: '',
            video: '',
        }} 
        validationSchema=''
        onSubmit={(values, action) => {
            try {
            const response =  axios.post('http://localhost:3001/videos', values, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
            // console.log(values);        
        }}
    >
        {({ setFieldValue, isSubmitting }) => (
            <Form className='mx-52'>
                <div className='flex flex-col p-2'>
                    <label htmlFor='tittle'>Enter Tittle</label>
                    <Field 
                        type='text'
                        id='tittle'
                        name='tittle'
                        className='h-10 text-black'
                    />
                </div>
                
                <div className='flex flex-row'>
                    <div className='flex flex-col p-2 w-full'>
                        <label htmlFor='type'>Select Type of Movie</label>
                        <Field 
                            as='select'
                            id='type'
                            name='type'
                            className='h-10 text-black'
                            // className='hover:bg-gray-700 hover:text-white'
                        >
                            <option value='' disabled>Select Type</option>
                            <option value='movie'>Movie</option>
                            <option value='web'>Web Series</option>
                            <option value='tv'>Tv Serial</option>
                        </Field>
                    </div>
                    <div className='flex flex-col p-2'>
                        <label htmlFor='language'>Language</label>
                        <Field 
                            type='text'
                            id='language'
                            name='language'
                            className='h-10 text-black'
                        />
                    </div>
                    <div className='flex flex-col p-2'>
                        <label htmlFor='year'>Released Year</label>
                        <Field 
                            type='number'
                            id='year'
                            name='year'
                            className='h-10 text-black'
                        />
                    </div>
                    <div className='flex flex-col p-2'>
                        <label htmlFor='grade'>Above able to see</label>
                        <Field 
                            type='number'
                            id='grade'
                            name='grade'
                            className='h-10 text-black'
                        />
                    </div>
                </div>

                <div className='flex flex-col p-2'>
                    <label htmlFor='genre'>Enter Genre</label>
                    <Field 
                        as='textarea'
                        type='text'
                        id='genre'
                        name='genre'
                        className='h-16 text-black'
                    />
                </div>
                
                <div className='flex flex-col p-2'>
                    <label htmlFor='desc'>Enter Description</label>
                    <Field 
                        as='textarea'
                        type='text'
                        id='desc'
                        name='desc'
                        className='h-20 text-black'
                    />
                </div>
                
                <div className='flex flex-col p-2'>
                    <label htmlFor='actors'>Actors</label>
                    <Field 
                        as='textarea'
                        type='text'
                        id='actors'
                        name='actors'
                        className='h-16 text-black'
                    />
                </div>
                <div className='flex flex-col p-2'>
                    <label htmlFor='image'>Image</label>
                    <input
                        type="file"
                        onChange={(event) => {
                            setFieldValue("image", event.currentTarget.files[0]);
                        }}
                    />
                </div>
                
                <div className='p-2'>
                    <button 
                        type='submit'
                        className='bg-gray-800 p-1 px-2 rounded-md text-xl hover:bg-gray-950'
                    >Submit</button>
                </div>
            </Form>
        )}
    </Formik>

    </div>
  )
}

export default AddNew
