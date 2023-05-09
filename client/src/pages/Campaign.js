import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import APIURLContext from "contexts/APIURLContext";
import useToken from "hooks/useToken";

function Campaign() {
    let params = useParams();
    const [campaign, setCampaign] = useState({});
    const [loading, setLoading] = useState(false);
    const apiURL = useContext(APIURLContext);
    const {token, setToken} = useToken();

    useEffect(() => {
        const loadCampaign = async() => {
            try {
                const response = await axios.get(`${apiURL}/campaigns/${params.id}`);
                setCampaign(campaign => response.data);
                setLoading(false);
            } catch(err) {
                setLoading(false);
                console.error(err);
            }
        };
        setLoading(true);
        loadCampaign();
    }, []);
    
    return(
        <div className="container">
            { loading ?
            <span>Loading...</span>
            :
            <div className="container text-start">
                <h2>{campaign.name}</h2>
                <ul className="list-unstyled">
                    <li><strong>Description:</strong> {campaign.description}</li>
                    <li><strong>Funding:</strong> ${campaign.donations_sum} / ${campaign.goal} ({Math.floor(campaign.donations_sum / campaign.goal * 100)}%)</li>
                    <li><strong>Start date:</strong> {new Date(campaign.start_date).toDateString()}</li>
                    <li><strong>End date:</strong> {new Date(campaign.end_date).toDateString()}</li>
                </ul>
                <h3>Donations</h3>
                {token ?
                <div className="mb-3">
                    <form action={`${apiURL}/donations/create_checkout`} method="POST">
                        <input type="hidden" name="campaign_id" value={campaign._id}/>
                        <input type="hidden" name="user_id" value={localStorage.getItem('_id')}/>
                        <input type="hidden" name="campaign_name" value={campaign.name}/>
                        <input type="hidden" name="donation_amount" value={3000}/>
                        <button type="submit" className="btn btn-primary">Donate $30</button>
                    </form>
                </div>
                :
                <div></div>
                }
                <ul className="list-unstyled">
                    {campaign.donations?.map(donation =>
                        <li key={donation._id} className="mb-2">
                            <strong>{donation.user?.name.first || "Unknown"} {donation.user?.name.last || "User"}</strong> donated ${donation.amount} on {new Date(donation.date).toDateString()}:<br/>
                            <em>"{donation.message}"</em><br/>
                            (Payment ID: {donation.payment_id})
                        </li>
                    )}
                </ul>
            </div>
            }
        </div>
    );
}

export default Campaign;