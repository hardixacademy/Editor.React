import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Title } from '../components'

function ControlPanelName({ template }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (template) {
            setName(template.name)
        }
    }, [template]);

    const changeHandlerName = (e) => {
        setName(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/templates/${template.id}`,
                { ...template, name: e.target.name.value, modified: new Date().getTime() })
            alert('edited');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="panel">
            <Title text={'Edit template name'} />

            <form className="form" onSubmit={submitHandler}>
                <div className="form__row">
                    <label htmlFor="name">Type name: </label>
                    <input name='name' value={name} onChange={changeHandlerName} />
                </div>
                <button className="main__button" type="submit">save</button>
            </form>

        </div>
    )
}

export default ControlPanelName
