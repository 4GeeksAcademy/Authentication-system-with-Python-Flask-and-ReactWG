import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../fetch";




export const Login = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalReducer();

    const handleLoginClick = ()=>{
        login(email, password, dispatch)

    };

    //create useEffect to send user to private route when login is succesful and token is received
    //useEffect to redirect when login is successful
    useEffect(() => {
        if (store.token && store.token !== undefined && store.token !== "") {
            navigate("/private");
        }
    }, [store.token, navigate]); 

    return(

        <>
        <div className="login-page text-center mt-5">
            {
                (store.token && store.token !== undefined && store.token !== "")
                    ?
                    <>
                    <h1>Hello! You are logged in</h1>
                    <div>{store.token}</div>
                    
                    </>
                    :

                    <>
                    <h1>Login</h1>

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
                            >Login
                    </button>
                </div>


        </div>
        
        </>
    );

}