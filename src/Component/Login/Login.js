import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomePage from '../WelcomePage';
import AuthContext from '../../Context-Api/Auth-Context';



const Login = (props) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({});
    const [isSubmitted, seIsSubmitted] = useState(false);
    const [isLoding, setIsLoding] = useState(false)
    const [resData,setResData] = useState(null)

    const navigate =useNavigate();
    const authCtx = useContext(AuthContext);

    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        const validationErrors  = validateForm(formData);
        setErrors(validationErrors);


        if (Object.keys(validationErrors).length === 0) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJIu6aGwjR-5bcwn__FvbAWrA4_IeqGao', {
                method: "POST",
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"

                }
            })
            console.log(response)

            const data = await response.json();
            authCtx.login(data.idToken)
            setResData(data);

            if (data.registered === true) {
            localStorage.setItem("user", JSON.stringify(data));
             navigate('/welcome-page')
            }

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

        return errors;

    }

    return (
        <>
           <div className='signup-container'>
                <h2>Login Form</h2>
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

                    <button type='submit' className='submit-button'>
                        {isLoding ? 'Loding....' : 'Submit'}
                    </button>
                </form>

                {isSubmitted && <p className='success-message'>{resData && resData?.registered ? 'LoggedIn successfully' : resData.error.message}</p>}
            </div>

        </>

    )
}

export default Login;
