//create the login function
export const login = async (email, password, dispatch) => {

    const options ={
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,

        })
    }

    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/token`, options);

    if(!response.ok) {
        const data = await response.json();
        console.log(data.message);
        return{
            error: {
                status: response.status,
                statusText: response.statusText,
            }
        }

    }
        const data = await response.json() 
        sessionStorage.setItem("token", data.access_token);
        dispatch({
            type:"fetchedToken",
            payload:{
                token: data.access_token,
                isLoginSuccessful: true,

            }
        })

     
    return data;

}

export const signUp = async(email, password, dispatch)=>{
    
    const options ={
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,

        })
    }

    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/signup`, options);

    if(!response.ok) {
        const data = await response.json();
        console.log(data.message);
        return{
            error: {
                status: response.status,
                statusText: response.statusText,
            }
        }

    }

    const data = await response.json() 
        console.log(data)
        dispatch({
            type:'successfulSignUp',
            payload:{
                'message': data.message,
                'isSignUpSuccessful': true, 
            }
        })
        return data;

            }
        



//1. finish login function to save the token to the store, and update isLoginSuccessful as True to the store as well
//2. create a useEfcfect in /Login.jsx that will take the navigate the user to the /private Route
//3. create a /sign up page

//homework!! create logout button that clears the token from the store and the sessionSTorage
//logout needs to dispatch to the store to remove token and also handle clearing the sessionStorage item