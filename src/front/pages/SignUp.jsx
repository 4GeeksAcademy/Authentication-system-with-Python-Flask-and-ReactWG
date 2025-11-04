import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer, { StoreProvider } from "../hooks/useGlobalReducer";
import {signUp} from "../fetch";





export const SignUp = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalReducer();

    const handleLoginClick = ()=>{
        signUp(email, password, dispatch)

    };

    //create useEffect to send user to login page
    //useEffect to redirect when login is successful
    useEffect(() => {
        if (store.isSignUpSuccessful){
            navigate('/login');
        }
        
    }, [store.isSignUpSuccessful]); 

    return(

        <>
        <div className="signUp-page text-center mt-5">
            {
                

                    <>
                    <h1>SignUp</h1>

                    <div>
                        <input
                            type="text"
                            placeholder =" Enter email"
                            value = {email}
                            onChange={e => setEmail(e.target.value)}
                        
                        />
                    </div>
                        <div>
                        <input
                            type="text"
                            placeholder =" Enter password"
                            value = {password}
                            onChange={e => setPassword(e.target.value)}
                        
                        />
                    </div>
                      </>
            }
                <div>
                     <button 
                         onClick={handleLoginClick}
                            >Sign Up
                    </button>
                </div>


        </div>
        
        </>
    );

}