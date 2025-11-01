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
        console.log(data.msg);
        return{
            error: {
                status: response.status,
                statusText: response.statusText,
            }
        }

    }

    sessionStorage.setItem("token", data.access_token);

     dispatch({
            type: "SET_LOGIN_SUCCESS",
            payload: {
                token: data.access_token,
                isLoginSuccessful: true
            }
        });
    //add sessionStorage
    // add the dispatch to save token and update isLoginSuccessful
    return data;



}

//1. finish login function to save the token to the store, and update isLoginSuccessful as True to the store as wellf
//2. create a useEfcfect in /Login.jsx that will take the navigate the user to the /private Route
//3. create a /sign up page