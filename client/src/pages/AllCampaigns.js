import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import './AllCampaigns.css';

function AllCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const url = process.env.REACT_APP_DEV_API_URL;

    useEffect(() => {
        const loadCampaigns = async() => {
            try {
                const response = await axios.get(`${url}/campaigns`);
                setCampaigns(campaigns => [...response.data]);
                setLoading(false);
            } catch(err) {
                setLoading(false);
                console.error(err);
            }
        };
        setLoading(true);
        loadCampaigns();
    }, []);

    return(
        <div className="container">
            <h2>Campaigns</h2>
            { loading ?
            <span>Loading...</span>
            :
            <div className="row row-cols-3 g-2">
                { campaigns.map(campaign =>
                    <div className="col card">
                        <div className="card-body">
                            <h3 className="card-title">{campaign.name}</h3>
                            <p>{campaign.description}</p>
                            <RouterLink to={`/campaigns/${campaign._id}`} className="card-link App-link">Read more</RouterLink>
                        </div>
                    </div>
                )}
            </div>
            }
        </div>
    );
}

export default AllCampaigns;