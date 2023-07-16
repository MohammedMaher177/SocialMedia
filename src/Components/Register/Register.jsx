import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup'
export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const initialValues = {
        userName: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
        age: "",
        gender: ""
    };
    // const [formData, setFormData] = useState(initialValues);
    // Define the validation schema
    const schema = Yup.object().shape({
        userName: Yup.string()
            .matches(/^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/, "INVALID NAME, username must include at least one upper case letter")
            .required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        rePassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
        phone: Yup.string()
            .matches(/^[0-9]+$/, "Phone must be a number")
            .min(10, "Phone must be at least 10 digits")
            .max(15, "Phone must be at most 15 digits")
            .required("Phone is required"),
        age: Yup.string().matches(/^(1[0-9]{1,2}|[1-9][0-9]?)$/, "Invalid age").required("Required"),
        gender: Yup.string().required("please enter you gender")
    });





    const handleChange = (event) => {
        const { name, value } = event.target;
        initialValues[name] = value
    }
    const onSubmit = (values) => {
        console.log(values);
        // console.log(formData);
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
                            {/* userName */}
                            <div className="form-group position-relative mb-5">
                                <label htmlFor="userName" className='text-info text-opacity-75 d-flex me-auto fs-4'>Name</label>
                                <Field
                                    type="text"
                                    id="userName"
                                    name="userName"

                                    className={errors.userName && touched.userName ? "form-control is-invalid" : "form-control"}
                                />
                                <ErrorMessage name="userName" component="div" className="invalid-feedback position-absolute" />
                            </div>
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
                            {/* re pasword */}
                            <div className="form-group position-relative mb-5">
                                <label htmlFor="rePassword" className='text-info text-opacity-75 d-flex me-auto fs-4'>Confirm Password</label>
                                <Field
                                    type="password"
                                    id="rePassword"
                                    name="rePassword"
                                    className={
                                        errors.rePassword && touched.rePassword
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                />
                                <ErrorMessage name="rePassword" component="div" className="invalid-feedback position-absolute" />
                            </div>
                            {/* phone */}
                            <div className="form-group position-relative mb-5">
                                <label htmlFor="phone" className='text-info text-opacity-75 d-flex me-auto fs-4'>Phone</label>
                                <Field
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className={
                                        errors.phone && touched.phone ? "form-control is-invalid" : "form-control"
                                    }
                                />
                                <ErrorMessage name="phone" component="div" className="invalid-feedback position-absolute" />
                            </div>
                            {/* age */}
                            <div className="form-group position-relative mb-5">
                                <label htmlFor="age" className='text-info text-opacity-75 d-flex me-auto fs-4'>age</label>
                                <Field
                                    type="text"
                                    id="age"
                                    name="age"
                                    className={
                                        errors.age && touched.age ? "form-control is-invalid" : "form-control"
                                    }
                                />
                                <ErrorMessage name="age" component="div" className="invalid-feedback position-absolute" />
                            </div>
                            {/* gender */}
                            <div className="form-group position-relative mb-5">
                                <label className='text-info text-opacity-75 d-flex me-auto fs-4' htmlFor='gender'>Gender
                                    {/* <label>Gender</label> */}
                                    <Field name="gender" as="select"
                                        className={
                                            errors.gender && touched.gender ? "form-control is-invalid" : "form-control"
                                        }>
                                        <option value=""></option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Field>
                                </label>
                            </div>

                            {isLoading ? <button className='btn btn-primary'><i className="fa-solid fa-spinner fa-spin"></i></button> :
                                <button type="submit" className="btn btn-primary">
                                    REGISTER
                                </button>
                            }
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
