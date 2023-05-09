import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import APIURLContext from "contexts/APIURLContext";

function Campaign() {
    let params = useParams();
    const [campaign, setCampaign] = useState({});
    const [loading, setLoading] = useState(false);
    const apiURL = useContext(APIURLContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const campaign_id = searchParams.get('campaign_id');
    const donation_amount = searchParams.get('donation_amount');

    useEffect(() => {
        const loadCampaign = async() => {
            try {
                const response = await axios.get(`${apiURL}/campaigns/${campaign_id}`);
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
                <h2>Donation Success!</h2>
                <p>Thanks for donating <strong>${donation_amount}</strong> to <strong>{campaign.name}</strong>. Your support is greatly appreciated!</p>
            </div>
            }
        </div>
    );
}

export default Campaign;