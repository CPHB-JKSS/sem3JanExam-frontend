import { useEffect, useState } from 'react';
import facade from './apiFacade';

const UserPage = (props) => {
    const roles = props.roles;
    const [serverData, setServerData] = useState({});

    useEffect(() => {
        const role = roles.includes("admin") ? "admin" : "user";
        console.log(roles);
        facade.fetchUserData(role)
        .then(data => setServerData(data));
    },[])

    return (
        <div>
            <h2>Server says:</h2>
            <p>{serverData.msg}</p>
        </div>
    )
}

export default UserPage;