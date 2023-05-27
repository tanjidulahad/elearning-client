import React, { useEffect, useState } from 'react';
import Signin from '../signIn/Signin';
import Signup from '../signUp/Signup';


const Auth = () => {
    const [isSignin, setIsSignin] = useState(true)

    
    return (
        <>
        <div>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-blue-300 dura">
                {isSignin ?
                    <Signin setIsSignin={setIsSignin} />
                    :
                    <Signup setIsSignin={setIsSignin} />}

            </div>
        </div>
        </>
    );
};

export default Auth;