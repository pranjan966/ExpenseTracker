import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../../Context-Api/Auth-Context';

const UpdateProfile = (props) => {
    const [formData, setFormData] = useState({
        fullname: '',
        profilePhotoUrl: '',
    })
    // const [errors, setErrors] = useState({});
    const [isSubmitted, seIsSubmitted] = useState(false);
    const [isLoding, setIsLoding] = useState(false);
    

    const authCtx = useContext(AuthContext);


    useEffect(() => {
        fetchData();
        console.log('pp')
    }, [])

    const fetchData = async () => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAJIu6aGwjR-5bcwn__FvbAWrA4_IeqGao', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token
            })
        }
        )

        const data = await response.json();
        const profileData = data.users[0];
        setFormData({ ...formData, fullname: profileData.displayName, profilePhotoUrl: profileData.photoUrl })
        console.log(response)
        console.log(data)
    }


    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    }

    const handelSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAJIu6aGwjR-5bcwn__FvbAWrA4_IeqGao', {
            method: "POST",
            body: JSON.stringify({
                idToken: authCtx.token,
                displayName: formData.fullname,
                photoUrl: formData.profilePhotoUrl,
                returnSecureToken: authData.returnSecureToken
            }),
            headers: {
                "Content-Type": "application/json"

            }
        })
        console.log(response)

        const data = await response.json();
        setResData(data);
        console.log(data);



        if (data.registered === true) {
            setIsLoggedIn(true)
        }

        setIsLoding(false);
        seIsSubmitted(true);
        console.log('form submitted', formData);

    };


    return (
        <div className='update-profile-container'>
            <div className='update-profile'>
            <div className='inner' style={{ top: 0, right: 0, maxWidth: '30rem' }}>`Your Profile is 64% complited. A complite Profile has higher chance of landing job` <span><a>complete now</a></span></div>
            </div>
            <div>
                <div className='contact-detail-container'>
                    <h2>Contact Detail</h2>
                    <form className='signup-form' onSubmit={handelSubmit}>
                        <div className='form-group'>
                            <label>Full Name:</label>
                            <input
                                type='text'
                                name='fullname'
                                value={formData.fullname}
                                // className={errors.fullname ? 'error' : ''}
                                onChange={handelChange}
                            />
                            {/* {errors.fullname && <p className="error-message">{errors.fullname}</p>} */}

                        </div>
                        <div className='form-group'>
                            <label>Profile Photo Url:</label>
                            <input
                                type='text'
                                name='profilePhotoUrl'
                                value={formData.profilePhotoUrl}
                                onChange={handelChange}
                            // className={errors.profilePhotoUrl ? 'error' : ''}
                            />
                            {/* {errors.password && <p className="error-message">{errors.profilePhotoUrl}</p>} */}

                        </div>

                        <button type='submit' className='submit-button'>
                            {isLoding ? 'Loding....' : 'updata'}
                        </button>
                    </form>

                    {/* {isSubmitted && <p className='success-message'>{resData && resData?.registered ? 'LoggedIn successfully' : resData.error.message}</p>} */}
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile;
