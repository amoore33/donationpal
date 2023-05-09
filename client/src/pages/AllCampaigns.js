import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import './AllCampaigns.css';
import APIURLContext from 'contexts/APIURLContext';

function AllCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiURL = useContext(APIURLContext)

    useEffect(() => {
        const loadCampaigns = async() => {
            try {
                const response = await axios.get(`${apiURL}/campaigns`);
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

    const progress = campaign => Math.floor(campaign.donations_sum / campaign.goal * 100);

    return(
        <div className="container">
            <h2>Campaigns</h2>
            { loading ?
            <span>Loading...</span>
            :
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                { campaigns.map(campaign =>
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">{campaign.name}</h3>
                                <p>{campaign.description}</p>
                                <div>
                                    <div class="progress mb-2" role="progressbar" aria-label="Basic example" aria-valuenow={progress(campaign)} aria-valuemin="0" aria-valuemax="100" style={{height: "2em"}}>
                                        <div class="progress-bar progress-bar-striped" style={{width: `${progress(campaign)}%`}}>{progress(campaign)}% Funded</div>
                                    </div>
                                    <RouterLink to={`/campaigns/${campaign._id}`} className="card-link App-link">Read more</RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            }
        </div>
    );
}

export default AllCampaigns;