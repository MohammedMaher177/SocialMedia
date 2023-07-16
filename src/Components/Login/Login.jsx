import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup'
export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const initialValues = {

        email: "",
        password: "",
    };
    // const [formData, setFormData] = useState(initialValues);
    // Define the validation schema
    const schema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });





    const handleChange = (event) => {
        const { name, value } = event.target;
        initialValues[name] = value
    }
    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <>
            <div className=' container py-5 bg-main'>
                <h2 className='p-4 bg-secondary text-white-50 rounded rounded-2 d-flex me-auto'>CREATE ACCOUNT</h2>
                {errorMessage != null && <div className='alert alert-danger'>{errorMessage}</div>}

                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={onSubmit}
                    onChange={handleChange}
                >
                    {({ errors, touched }) => (
                        <Form>
                            
                            {/* email */}
                            <div className="form-group position-relative mb-5">
                                <label htmlFor="email" className='text-info text-opacity-75 d-flex me-auto fs-4'>Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={
                                        errors.email && touched.email ? "form-control is-invalid" : "form-control"
                                    }
                                />
                                <ErrorMessage name="email" component="div" className="invalid-feedback position-absolute" />
                            </div>
                            {/* password */}
                            <div className="form-group position-relative mb-5">
                                <label htmlFor="password" className='text-info text-opacity-75 d-flex me-auto fs-4'>Password</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={
                                        errors.password && touched.password
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                />
                                <ErrorMessage name="password" component="div" className="invalid-feedback position-absolute" />
                            </div>
                           
                            {isLoading ? <button className='btn btn-primary'><i className="fa-solid fa-spinner fa-spin"></i></button> :
                                <button type="submit" className="btn btn-primary">
                                    LOG IN
                                </button>
                            }
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
