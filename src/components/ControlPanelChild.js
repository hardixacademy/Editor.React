import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Title, Text } from '../components'
import '../scss/panel.scss';

function ControlPanelChild({ editableItem, setEditableItem, template }) {
    const [value, setValue] = useState('');
    const [font, setFont] = useState('');

    useEffect(() => {
        if (editableItem) {
            setValue(editableItem.innerText);
            setFont(getComputedStyle(editableItem).fontSize);
        }
    }, [editableItem]);

    const changeHandler = (type, e) => {
        switch (type) {
            case 'CHANGE_FONT':
                setFont(e.target.value)
                break;

            case 'CHANGE_TEXT':
                setValue(e.target.value)
                break;

            default: break;
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        editableItem.innerText = e.target.text.value;
        editableItem.style.fontSize = e.target.font.value;
        editableItem.classList.remove('active')

        try {
            await axios.put(`http://localhost:3001/templates/${template.id}`,
                { ...template, template: document.querySelector('.template_box').outerHTML, modified: new Date().getTime() })
            alert('edited');
        } catch (error) {
            console.log(error);
        }

        setEditableItem(null);
    }

    return (
        <div className="panel">
            <Title text={'Edit template child'} />

            {editableItem ?
                <form className="form" onSubmit={submitHandler}>
                    <div className="form__row">
                        <label htmlFor="text">Edit text: </label>
                        <textarea name='text' value={value} onChange={(e) => changeHandler('CHANGE_TEXT', e)} />
                    </div>
                    <div className="form__row">
                        <label htmlFor="font">Edit font-size:</label>
                        <input name='font' value={font} onChange={(e) => changeHandler('CHANGE_FONT', e)} />
                    </div>
                    <button className="main__button" type="submit">save</button>
                </form>
                :
                <Text text={'Choose item to edit'} />}
        </div>
    )
}

export default ControlPanelChild
