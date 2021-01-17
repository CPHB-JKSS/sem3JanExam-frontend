import settings from '../settings.json'
import { useEffect, useState } from 'react';
import facade from './apiFacade';

const AddTeamForm = (props) => {
    const init = { teamName: "", pricePerYear: "", minAge: "", maxAge: "", sport: "" }
    const [formData, setFormData] = useState(init);
    const doChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
        console.log(formData);
    }
    const doSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        const options = facade.makeOptions("POST", true, formData);
        fetch(settings.URL + "/api/admin/team/add", options)
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }

    const initSelect = [];
    const [selectData, setSelectData] = useState(initSelect);
    const [selectDataReady, setSelectDataReady] = useState(false);

    const options = facade.makeOptions("GET", true);
    useEffect(() => {
        fetch(settings.URL + "/api/public/sports", options)
            .then(res => res.json())
            .then(data => setSelectData(data))
            .then(setSelectDataReady(true))
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }, [])

    return (
        <form onChange={doChange}>
            <div className="form-row">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="name of the team"
                        id="teamName"
                    />
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
                        {selectDataReady ? selectData.map(sport => (
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
                        className="btn btn-secondary w-100"
                        onClick={doSubmit}>Add new team
                        </button>
                </div>
            </div>
        </form>
    );
}

export default AddTeamForm;