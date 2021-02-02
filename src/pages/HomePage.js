import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Title, Text } from '../components';
import '../scss/home.scss';

function HomePage() {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/templates')
            .then((data) => {
                setTemplates(data.data)
            })
            .catch((e) => console.err(e))
    }, []);

    const getDate = (milliseconds) => {
        const date = new Date(milliseconds).toLocaleString()
        return date
    }

    return (
        <Layout sectionClass={'templates'}>
            {templates.map(({ id, name, modified }) =>
                <Link to={`template/${id}`} key={id} className="templates__item">
                    <div className="templates__text">
                        <Title text={name} />
                        <Text text={`Last update: ${getDate(modified)}`} />
                    </div>
                    <img
                        className="templates__arrow"
                        alt="arrow"
                        src="https://img.icons8.com/ios/30/000000/circled-right-2.png" />
                </Link>
            )}
        </Layout>
    )
}

export default HomePage
