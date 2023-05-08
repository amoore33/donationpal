import { Navigate } from "react-router-dom";
import useToken from "hooks/useToken";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { APIURLContext } from "contexts/APIURLContext";

function ProfilePage() {
    const {token, setToken} = useToken();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const apiURL = useContext(APIURLContext);
    
    useEffect(() => {
        const loadUser = async () => {
            try {
                if (!token) {
                    setLoading(false);
                } else {
                    const response = await axios.get(`${apiURL}/users/${localStorage.getItem('_id')}`);
                    setUser(response.data);
                    setLoading(false);
                }
            }
            catch (err) {
                setLoading(false);
                console.log(err);
            }
        };
        setLoading(true);
        loadUser();
    }, []);

    if (!token) {
        return(<Navigate replace to="/login" />);
    }
    
    return(
        <div className="container">
            <h2>My Profile</h2>
            {loading ? <span>Loading...</span> :
            <div className="row">
                <div className="col-6 text-start">
                    <p><strong>Name:</strong> {user.name?.first} {user.name?.last} <em>({user.gender})</em></p>
                    <p><strong>Date of birth:</strong> {new Date(user.dob?.date).toDateString()}</p>
                    <p><strong>Location:</strong> {user.location?.city}, {user.location?.state}, {user.location?.country}</p>
                    <p><strong>Email address:</strong> {user.email}</p>
                    <p><strong>Primary phone:</strong> {user.phone}</p>
                    <p><strong>Cell phone:</strong> {user.cell}</p>
                </div>
                <div className="col-6">
                    <img src={user.picture?.large} alt={`${user.name?.first} ${user.name?.last}`}/>
                </div>
                <div className="col-12">
                    <h3>My Donations</h3>
                    <ul className="list-unstyled text-start">
                        {user.donations?.map(donation =>
                            <li key={donation._id}><strong>{new Date(donation.date).toDateString()}:</strong> ${donation.amount} to <a href={`/campaigns/${donation.campaign_id}`}>{donation.campaign?.name}</a></li>
                        )}
                    </ul>
                </div>
            </div>
            }
        </div>
    );
}

export default ProfilePage;