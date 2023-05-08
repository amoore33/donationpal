import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import APIURLContext from "contexts/APIURLContext";

function Campaign() {
    let params = useParams();
    const [campaign, setCampaign] = useState({});
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiURL = useContext(APIURLContext);

    useEffect(() => {
        const loadCampaign = async() => {
            try {
                const response = await axios.get(`${apiURL}/campaigns/${params.id}`);
                setCampaign(campaign => response.data);
                setDonations(donations => response.data.donations);
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
                    <li><strong>Goal:</strong> ${campaign.goal}</li>
                    <li><strong>Start date:</strong> {new Date(campaign.start_date).toDateString()}</li>
                    <li><strong>End date:</strong> {new Date(campaign.end_date).toDateString()}</li>
                </ul>
                <h3>Donations</h3>
                <ul className="list-unstyled">
                    {donations.map(donation =>
                        <li key={donation._id}><strong>{donation.user?.name.first || "Unknown"} {donation.user?.name.last || "User"}</strong> <em>donated ${donation.amount} on {new Date(donation.date).toDateString()}:</em> "{donation.message}"</li>
                    )}
                </ul>
            </div>
            }
        </div>
    );
}

export default Campaign;