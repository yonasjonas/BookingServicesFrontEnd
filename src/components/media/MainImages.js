import React, { useState, useEffect } from "react";
import FileUpload from "../../components/FormElements/FileUpload";
import HeroImage from "./HeroImage";
import ProfileImage from "./ProfileImage";
import { connect } from "react-redux";


function MainImages(props) {

    const img = new Image();
    const [user, setUser] = useState(null);

    const checkCoverImage = (path) => {
        new Promise((resolve) => {
            img.onload = () => resolve({ path, status: "ok" });
            img.onerror = () => resolve({ path, status: "error" });
            img.src = path;
        }).then((result) => {
            if (result.status === "ok") setCoverImage(img.src);
            else {
                setCoverImage("https://www.fg-a.com/wallpapers/magnetic-field-1920.jpg");
                checkProfileImage(`https://nixerwebapi.azurewebsites.net/images/business/${user}/businessInformationProfile.jpg`);

        }
            
        }).then(() => {
            checkProfileImage(`https://nixerwebapi.azurewebsites.net/images/business/${user}/businessInformationProfile.jpg`);
        })

    };

    const checkProfileImage = (path) => {
        new Promise((resolve) => {
            img.onload = () => resolve({ path, status: "ok" });
            img.onerror = () => resolve({ path, status: "error" });
            img.src = path;
        }).then((result) => {
            if (result.status === "ok") setProfileImage(img.src);
            else{setProfileImage("https://altissia.org/wp-content/uploads/2020/09/Your-Logo-1.jpg")}
        });
    };

    useEffect(() => {

        let localUser = props ? (props.user || (props.authentication && props.authentication.user && props.authentication.user.id)) : null;

        setUser(localUser);

        const coverImage = localUser && `https://nixerwebapi.azurewebsites.net/images/business/${localUser}/businessInformationCover.jpg`;
        checkCoverImage(coverImage);
        console.log({ props })

        //
    });


    //const user = JSON.parse(localStorage.getItem("user"));
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    return (
        <>
            {coverImage === null ?
                <>
                    <h3 className="noCoverImage">Upload your business cover image that will be visible on your business page</h3>
                    <FileUpload type="businessInformationCover" exist={false} class="noCoverImage" user={props.user} />
                </> :
                <>
                    <HeroImage image={coverImage} />
                    <FileUpload class="coverImage" type="businessInformationCover" frontEnd={props.frontEnd} exist={true} user={props.user} />
                </>
            }
            {profileImage === null ? <><h3 className="noProfileImage">Upload business logo</h3> <FileUpload type="businessInformationProfile" exist={false} class="noProfileImage" user={props.user} /></> :
                <>
                    <ProfileImage image={profileImage} />
                    <FileUpload class="profileImage" type="businessInformationProfile" frontEnd={props.frontEnd} exist={true} user={props.user} />
                </>}

        </>
    );
}


const mapStateToProps = state => ({
    authentication: state.authentication,
});


export default connect(mapStateToProps)(MainImages);