import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { signUp } from '../../Redux/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';

import styles from "../Login/login.module.css"



export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isLoading, errorMsg } = useSelector(({ auth }) => auth)

    const initialValues = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
        age: "",
        gender: ""
    };

    const schema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/, "INVALID NAME, name must include at least one upper case letter")
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
    const onSubmit = async (values) => {
        console.log(values);
        const { payload } = await dispatch(signUp(values))
        if (payload.user) {
            navigate("/")
        }
    };

    return (
        <>
            <div className={`container-fluid py-5 bg-main ${styles.login}`}>
                <div className={`${styles.login_form} py-5 px-3`}>
                    <h2 className={` text-white-50 d-flex  mb-3 me-auto border-bottom ${styles.login_title}`}>CREATE ACCOUNT</h2>
                    <h4 className='d-flex  mb-3 text-white-50'>Welcome onboard with us!</h4>
                    {errorMsg != '' && <div className='alert alert-danger'>{errorMsg}</div>}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={onSubmit}
                        onChange={handleChange}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {/* name */}
                                <div className="form-group position-relative mb-4">
                                    <label htmlFor="name" className={`d-flex me-auto mb-2 ${styles.login_lable}`}>Name</label>
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"

                                        className={errors.name && touched.name ? "form-control is-invalid" : "form-control"}
                                    />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback position-absolute" />
                                </div>
                                {/* email */}
                                <div className="form-group position-relative mb-4">
                                    <label htmlFor="email" className={`d-flex me-auto mb-2 ${styles.login_lable}`}>Email</label>
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
                                <div className="form-group position-relative mb-4">
                                    <label htmlFor="password" className={`d-flex me-auto mb-2 ${styles.login_lable}`}>Password</label>
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
                                <div className="form-group position-relative mb-4">
                                    <label htmlFor="rePassword" className={`d-flex me-auto mb-2 ${styles.login_lable}`}>Confirm Password</label>
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
                                <div className="form-group position-relative mb-4">
                                    <label htmlFor="phone" className={`d-flex me-auto mb-2 ${styles.login_lable}`}>Phone</label>
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
                                <div className="form-group position-relative mb-4">
                                    <label htmlFor="age" className={`d-flex me-auto mb-2 ${styles.login_lable}`}>age</label>
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
                                <div className="form-group position-relative mb-4">
                                    <label className={`d-flex me-auto mb-2 ${styles.login_lable}`} htmlFor='gender'>Gender
                                        {/* <label>Gender</label> */}
                                        <Field name="gender" as="select"
                                            className={
                                                errors.gender && touched.gender ? "form-control is-invalid" : "form-control"
                                            }>
                                            <option value="">Choose One</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Field>
                                    </label>
                                </div>
                                {isLoading ? <button className='btn btn-primary'><i className="fa-solid fa-spinner fa-spin"></i></button> :
                                    <button type="submit" className={styles.login_btn}>
                                        REGISTER
                                    </button>
                                }
                                <div className={styles.to_register}>New to Logo? <Link to="/login" className={styles.to_register_link}> Login</Link> Here</div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
