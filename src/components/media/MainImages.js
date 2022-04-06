import React, { useState, useEffect } from "react";
import FileUpload from "../../components/FormElements/FileUpload";
import HeroImage from "./HeroImage";
import ProfileImage from "./ProfileImage";

export default function MainImages(props) {

    const img = new Image();

    const checkCoverImage = (path) => {
        new Promise((resolve) => {
            img.onload = () => resolve({ path, status: "ok" });
            img.onerror = () => resolve({ path, status: "error" });
            img.src = path;
        }).then((result) => {
            if (result.status === "ok") setCoverImage(img.src);
        }).then(() => {
            checkProfileImage(`https://nixerwebapi.azurewebsites.net/images/business/${user.id}/businessInformationProfile.jpg`);
        });

    };

    const checkProfileImage = (path) => {
        new Promise((resolve) => {
            img.onload = () => resolve({ path, status: "ok" });
            img.onerror = () => resolve({ path, status: "error" });
            img.src = path;
        }).then((result) => {
            if (result.status === "ok") setProfileImage(img.src);
        });
    };

    useEffect(() => {
        if (user) {
            checkCoverImage(`https://nixerwebapi.azurewebsites.net/images/business/${user.id}/businessInformationCover.jpg`);
        }

        //
    });


    const user = JSON.parse(localStorage.getItem("user"));
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    return (
        <>
            {coverImage === null ? <><h3 className="noCoverImage">Upload your business cover image that will be visible on your business page</h3>   <FileUpload type="businessInformationCover" exist={false} class="noCoverImage" /> </>:
                <>
                    <HeroImage image={coverImage} />
                    <FileUpload class="coverImage" type="businessInformationCover" frontEnd={props.frontEnd} exist={true}/>
                </>}
            {profileImage === null ? <><h3 className="noProfileImage">Upload business logo</h3> <FileUpload type="businessInformationProfile" exist={false} class="noProfileImage" /></> :
                <>
                    <ProfileImage image={profileImage} />
                    <FileUpload class="profileImage" type="businessInformationProfile" frontEnd={props.frontEnd} exist={true}/>
                </>}

        </>
    );
}