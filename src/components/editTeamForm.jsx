import settings from '../settings.json'
import { useEffect, useState } from 'react';
import facade from './apiFacade';

const EditTeamForm = (props) => {
    const init = { teamName: "", pricePerYear: "", minAge: "", maxAge: "", sport: "" }
    const [formData, setFormData] = useState(init);
    const doChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
        console.log(formData);
    }
    const doSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        const options = facade.makeOptions("PUT", true, formData);
        fetch(settings.URL + "/api/admin/team/edit", options)
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }

    const initSelect = [];
    const [selectTeamData, setSelectTeamData] = useState(initSelect);
    const [selectTeamDataReady, setSelectTeamDataReady] = useState(false);

    const options = facade.makeOptions("GET", true);
    useEffect(() => {
        fetch(settings.URL + "/api/public/teams", options)
            .then(res => res.json())
            .then(data => setSelectTeamData(data))
            .then(setSelectTeamDataReady(true))
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }, [])

    const [selectSportData, setSelectSportData] = useState(initSelect);
    const [selectSportDataReady, setSelectSportDataReady] = useState(false);

    useEffect(() => {
        fetch(settings.URL + "/api/public/sports", options)
            .then(res => res.json())
            .then(data => setSelectSportData(data))
            .then(setSelectSportDataReady(true))
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }, [])

    return (
        <form onChange={doChange}>
            <div className="form-row mt-2">
                <div className="col">
                    <select className="custom-select" id="teamName">
                        {selectTeamDataReady ? selectTeamData.map(team => (
                            <option>{team.name}</option>
                        )) :
                            <option>N/A</option>
                        }
                    </select>
                </div>
            </div>
            <div className="form-row mt-2">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="price per year (DKK)"
                        id="pricePerYear"
                    />
                </div>
            </div>
            <div className="form-row mt-2">
                <div className="col">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="min. age"
                        id="minAge"
                    />
                </div>
                <div className="col">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="max. age"
                        id="maxAge"
                    />
                </div>
            </div>
            <div className="form-row mt-2">
                <div className="col">
                    <select className="custom-select" id="sport">
                        {selectSportDataReady ? selectSportData.map(sport => (
                            <option>{sport.name}</option>
                        )) :
                            <option>N/A</option>
                        }
                    </select>
                </div>
            </div>
            <div className="form-row mt-2">
                <div className="col">
                    <button
                        className="btn btn-primary w-100"
                        onClick={doSubmit}>Apply changes
                        </button>
                </div>
            </div>
        </form>
    );
}

export default EditTeamForm;