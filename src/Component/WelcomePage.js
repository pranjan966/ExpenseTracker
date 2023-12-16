import React, { useEffect , useContext} from 'react'
import UpdateProfile from './UpdataProfle/UpdateProfile';
import { useState } from 'react';
import AuthContext from '../Context-Api/Auth-Context';



const WelcomePage = (props) => {
    const [showUpdatedProfilePage, setShowUpdatedProfilePage] = useState(false);
   const authCtx = useContext(AuthContext)

    
    const verifyEmailHandler = async () => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAJIu6aGwjR-5bcwn__FvbAWrA4_IeqGao', {
            method: "POST",
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: authCtx.token
            })
        })
        if (!response.ok) {
            throw new Error("Failed to Verify Email")
        }

        const data = await response.json()
        console.log(data)


    }
    return (
        <div className='welcomepage'>
            {showUpdatedProfilePage && <UpdateProfile idToken={authCtx.token} />}
            <div className='welcomepage-group'>
                <div className='inner' style={{ top: 0, left: 0 }}>Welcome to Expense tracker!!!</div>
                <div className='inner' style={{ top: 0, right: 0 }}>your profile is Incomplite <span><button onClick={() => setShowUpdatedProfilePage(true)}>complete now</button></span></div>
                <div className='btn-group'>
                    <button onClick={verifyEmailHandler}>verify email </button>
            </div>
            </div>
            
        </div>
    )
}
export default WelcomePage;
