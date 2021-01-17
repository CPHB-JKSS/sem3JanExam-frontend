import settings from '../settings.json'
import { useEffect, useState } from 'react';
import facade from './apiFacade';

const SportsList = (props) => {
    const init = [];
    const [tableData, setTableData] = useState(init);
    const [tableReady, setTableReady] = useState(false);

    const options = facade.makeOptions("GET", true);
    useEffect(() => {
        fetch(settings.URL + "/api/public/sports", options)
            .then(res => res.json())
            .then(data => setTableData(data))
            .then(setTableReady(true))
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }, [])

    return (
        <table className="table table-bordered" style={{ border: "solid white" }}>
            <thead>
                <tr>
                    <th>name</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                {tableReady ?
                    tableData.map(sport => (
                        <tr>
                            <td>{sport.name}</td>
                            <td>{sport.description}</td>
                        </tr>
                    ))
                    :
                    <tr></tr>
                }
            </tbody>
        </table>
    );
}

export default SportsList;