import settings from '../settings.json'
import { useEffect, useState } from 'react';
import facade from './apiFacade';

const RemoveTeamForm = (props) => {
    const init = { teamName: "" }
    const [formData, setFormData] = useState(init);
    const doChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
        console.log(formData);
    }
    const doSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        const options = facade.makeOptions("POST", true, formData);
        fetch(settings.URL + "/api/admin/team/remove", options)
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }

    const initSelect = [];
    const [selectData, setSelectData] = useState(initSelect);
    const [selectDataReady, setSelectDataReady] = useState(false);

    const options = facade.makeOptions("GET", true);
    useEffect(() => {
        fetch(settings.URL + "/api/public/teams", options)
            .then(res => res.json())
            .then(data => setSelectData(data))
            .then(setSelectDataReady(true))
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }, [])

    return (
        <form onChange={doChange}>
            <div className="form-row mt-2">
                <div className="col">
                    <select className="custom-select" id="teamName">
                        {selectDataReady ? selectData.map(team => (
                            <option>{team.name}</option>
                        )) :
                            <option>N/A</option>
                        }
                    </select>
                </div>
            </div>

            <div className="form-row mt-2">
                <div className="col">
                    <button
                        className="btn btn-danger w-100"
                        onClick={doSubmit}>Remove team
                        </button>
                </div>
            </div>
        </form>
    );
}

export default RemoveTeamForm;