import settings from '../settings.json'

const URL = settings.URL;

const handleHttpErrors = (res) => {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() })
    }

    return res.json();
}


function apiFacade(){

    const makeOptions = (method,addToken,body) =>{
        var opts = {
          method: method,
          headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
          }
        }
        if (addToken && getToken != null){
          opts.headers["x-access-token"] = getToken();
        }
        if (body) {
          opts.body = JSON.stringify(body);
        }
        return opts;
      }

    const setToken = (token) => {
        localStorage.setItem("jwtToken", token)
    }
    
    const getToken = () => {
        return localStorage.getItem("jwtToken")
    }

    const doLogin = (user, pass, setIsLoggedIn, setRoles, setLoginError) => {
        const handleHttpErrorsForLogin = (res) => {
            if (!res.ok) {
                return Promise.reject({ status: res.status, fullError: res.json() })
            }
            setIsLoggedIn(true);
            return res.json();
        }

        const options = makeOptions("POST",true,{username: user, password: pass});
        fetch(URL + "/api/login", options)
        .then(handleHttpErrorsForLogin)
        .then(res => {
            setToken(res.token);
            setRoles(res.roles);
        })
        .catch(err => {
            console.log(err);
            setLoginError("Failed to login");
        });
    }

    const logOut = (setIsLoggedIn) => {
      localStorage.removeItem("jwtToken");
      setIsLoggedIn(false);
    }

    return{
        doLogin,
        setToken,
        getToken,
        logOut
    }
        
    
}
const facade = apiFacade();
export default facade;