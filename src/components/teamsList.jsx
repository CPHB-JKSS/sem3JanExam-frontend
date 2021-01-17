import settings from '../settings.json'
import { useEffect, useState } from 'react';
import facade from './apiFacade';

const TeamsList = (props) => {
    const init = [];
    const [tableData, setTableData] = useState(init);
    const [tableReady, setTableReady] = useState(false);

    const options = facade.makeOptions("GET", true);
    useEffect(() => {
        fetch(settings.URL + "/api/public/teams", options)
            .then(res => res.json())
            .then(data => setTableData(data))
            .then(setTableReady(true))
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }, [])
    console.log(tableData);
    return (
        <table className="table table-bordered" style={{ border: "solid white" }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Sport</th>
                    <th>Minimum age</th>
                    <th>Maximum age</th>
                    <th>Price /year</th>
                </tr>
            </thead>
            <tbody>
                {tableReady ?
                    tableData.map(team => (
                        <tr>
                            <td>{team.name}</td>
                            <td>{team.sport.sportName}</td>
                            <td>{team.minAge}</td>
                            <td>{team.maxAge}</td>
                            <td>{team.pricePerYear / 100},-</td>
                        </tr>
                    ))
                    :
                    <tr></tr>
                }
            </tbody>
        </table>
    );
}

export default TeamsList;