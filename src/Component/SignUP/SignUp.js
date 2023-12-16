import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {dashboardAction} from '../../Store/dashboardSlice'


const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const data = useSelector(state => state.dashboard);
    console.log(data)
    const dispatch = useDispatch()

    const [errors, setErrors] = useState({});
    const [isSubmitted, seIsSubmitted] = useState(false);
    const [isLoding, setIsLoding] = useState(false)

    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);


        if (Object.keys(validationErrors).length === 0) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJIu6aGwjR-5bcwn__FvbAWrA4_IeqGao', {
                method: "POST",
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log(response)

            if (response.status === 200) {
                console.log('thanks');
                alert('Sign-up successfully!!!')
            }

            const data = await response.json();
            dispatch(dashboardAction.setData(data))
            setIsLoding(false);
            seIsSubmitted(true);
            console.log('form submitted', formData);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email must be valid"
        }

        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'password must be at least 6 characters long'
        }

        if (!data.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        }
        else if (data.confirmPassword !== data.password) {
            errors.confirmPassword = 'Passwords do not match'
        }

        return errors;

    }

    return (
        <div className='signup-container'>
            <h2>SignUp Form</h2>
            <form className='signup-form' onSubmit={handelSubmit}>
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        className={errors.email ? 'error' : ''}
                        onChange={handelChange}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}

                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handelChange}
                        className={errors.password ? 'error' : ''}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}

                </div>
                <div className='form-group'>
                    <label>Confirm Password:</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handelChange}
                        className={errors.confirmPassword ? 'error' : ''}
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

                </div>

                <button type='submit' className='submit-button'>
                    {isLoding ? 'Loding....' : 'Submit'}
                </button>
            </form>

            {isSubmitted && <p className='success-message'>Form Submitted Successfully!</p>}
        </div>
    )
}

export default SignUp;
