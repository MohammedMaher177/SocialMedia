import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { signin } from '../../Redux/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./login.module.css"
export default function Login() {
    // const [isLoading, setIsLoading] = useState(false)
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


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, errorMsg } = useSelector(({ auth }) => auth)
    const handleChange = (event) => {
        const { name, value } = event.target;
        initialValues[name] = value
    }
    const onSubmit = async (values) => {
        const { payload } = await dispatch(signin(values))
        if (payload.message == 'success')
            navigate("/")
    };

    return (
        <>
            <div className={`container-fluid py-5 bg-main ${styles.login}`}>
                <div className={`${styles.login_form} py-5 px-3`}>

                    <h2 className={` text-white-50 d-flex  mb-3 me-auto border-bottom ${styles.login_title}`}>LOG IN</h2>
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

                                {/* email */}
                                <div className="form-group position-relative mb-5">
                                    <label htmlFor="email" className={`d-flex me-auto mb-2 ${styles.login_lable}`}>Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={styles.login_input + errors.email && touched.email ? "form-control is-invalid" : "form-control"}
                                    />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback position-absolute" />
                                </div>
                                {/* password */}
                                <div className="form-group position-relative mb-5">
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
                                    <div className={styles.login_forgot}>Forgot Password</div>
                                </div>

                                {isLoading ? <button className='btn btn-primary'><i className="fa-solid fa-spinner fa-spin"></i></button> :
                                    <button type="submit" className={styles.login_btn}>
                                        LOG IN
                                    </button>
                                }
                                <div className={styles.to_register}>New to Logo? <Link to="/signup" className={styles.to_register_link}> Register</Link> Here</div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
