import settings from '../settings.json'
import { useEffect, useState } from 'react';
import facade from './apiFacade';

const AddSportForm = (props) => {
    const init = { sportName: "", sportDesc: "" }
    const [formData, setFormData] = useState(init);
    const doChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const doSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        const options = facade.makeOptions("POST", true, formData);
        fetch(settings.URL + "/api/admin/sport/add", options)
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }

    return (
        <form onChange={doChange}>
            <div className="form-row">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="name of the sport"
                        id="sportName"
                    />
                </div>
            </div>
            <div className="form-row mt-2">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="description"
                        id="sportDesc"
                    />
                </div>
            </div>
            <div className="form-row mt-2">
                <div className="col">
                    <button
                        className="btn btn-secondary w-100"
                        onClick={doSubmit}>Add new sport
                        </button>
                </div>
            </div>
        </form>
    );
}

export default AddSportForm;