import settings from '../settings.json'
import { useEffect, useState } from 'react';
import facade from './apiFacade';

const EditSportForm = (props) => {
    const init = { sportName: "", description: "" }
    const [formData, setFormData] = useState(init);
    const doChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
        console.log(formData);
    }
    const doSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        const options = facade.makeOptions("PUT", true, formData);
        fetch(settings.URL + "/api/admin/sport/edit", options)
            .catch(err => {
                console.log("Fetch request failed: " + err.status);
            })
    }

    const initSelect = [];
    const [selectSportData, setSelectSportData] = useState(initSelect);
    const [selectSportDataReady, setSelectSportDataReady] = useState(false);

    const options = facade.makeOptions("GET", true);
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
                    <select className="custom-select" id="sportName">
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
                    <input
                        type="text"
                        className="form-control"
                        placeholder="description"
                        id="description"
                    />
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

export default EditSportForm;