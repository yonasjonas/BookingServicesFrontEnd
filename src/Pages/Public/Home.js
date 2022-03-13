import React from "react";
import HomepageCards from "../../components/HomepageCard";
import hero from '../../images/hero.jpg';


const Home = () => {
    return (
        <div>
            <img src={hero} alt="Image a girl managing booking on the go" />
            <div className="heroText"><h1>Manage your bookings from anywhere</h1></div>
            <HomepageCards/>
        </div>
        

    )
}

export default Home;