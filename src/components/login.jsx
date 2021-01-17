import { useState, useEffect } from 'react';
import facade from './apiFacade';

const Login = (props) => {
    const setIsLoggedIn = props.setIsLoggedIn;
    const setRoles = props.setRoles;
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const [loginError, setLoginError] = useState("");

    const doChange = (event) => {
        setLoginCredentials({ ...loginCredentials, [event.target.id]: event.target.value })
    }

    const doLogin = (event) => {
        event.preventDefault();
        facade.doLogin(loginCredentials.username, loginCredentials.password, setIsLoggedIn, setRoles, setLoginError);
    }

    return (
        <div>
            <p>{loginError}</p>

            <form onChange={doChange} style={{ maxWidth: "300px" }}>
                <div className="form-row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Username" id="username" />
                    </div>
                </div>
                <div className="form-row mt-2">
                    <div className="col">
                        <input type="password" className="form-control" placeholder="password" id="password" />
                    </div>
                </div>
                <div className="form-row mt-2">
                    <div className="col">
                        <button className="btn btn-success w-100" onClick={doLogin}>Login</button>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default Login;