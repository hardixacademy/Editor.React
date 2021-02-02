import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Layout, Title, ControlPanelChild, ControlPanelName } from '../components';
import '../scss/template.scss';

import ReactHtmlParser from 'react-html-parser';

function TemplatePage() {
    const [template, setTemplate] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [editableItem, setEditableItem] = useState(null);

    const [tab, setTab] = useState(1);

    useEffect(() => {
        const templateUrlId = window.location.pathname.slice('/template/'.length);

        axios.get(`http://localhost:3001/templates/${templateUrlId}`)
            .then((data) => {
                setTemplate(data.data)
                setLoaded(true)
            })
            .catch((e) => console.err(e))

        document.body.addEventListener('click', bodyListener)
        return () => document.body.removeEventListener('click', bodyListener)
    }, []);

    const bodyListener = (e) => {
        const editableBlocks = document.body.querySelectorAll('.editable');

        if (e.target.classList.contains('editable')) {
            editableBlocks.forEach(el => {
                el.classList.remove('active')
            })

            e.target.classList.add('active')
            setEditableItem(e.target)
            setTab(2)
        }
    }

    return (
        <Layout sectionClass={'template'}>
            {loaded ?
                <>
                    <Title text={`Template name: "${template.name}"`} />
                    <div className="template__html">
                        {ReactHtmlParser(template.template)}
                    </div>
                </>
                :
                <Title text={`Loading ...`} />
            }

            <div className="tabs">
                <div className="tabs__head">
                    <button className={tab === 1 ? 'main__button active' : 'main__button'} onClick={() => setTab(1)}>
                        Edit template name
                    </button>
                    <button className={tab === 2 ? 'main__button active' : 'main__button'} onClick={() => setTab(2)}>
                        Edit template child
                    </button>
                </div>
                <div className="tabs__content">
                    {tab === 1 && <ControlPanelName
                        template={template}
                    />}
                    {tab === 2 && <ControlPanelChild
                        editableItem={editableItem}
                        setEditableItem={setEditableItem}
                        template={template}
                    />}
                </div>
            </div>
        </Layout>
    )
}

export default TemplatePage
