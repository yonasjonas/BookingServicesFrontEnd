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
            checkProfileImage(`../../business/${user.id}/businessInformationProfile.png`);
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
            checkCoverImage(`../../business/${user.id}/businessInformationCover.png`);
        }

        //
    });


    const user = JSON.parse(localStorage.getItem("user"));
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    return (
        <>
            {coverImage === null ? <FileUpload type="Upload Cover image" /> :
                <>
                    <HeroImage image={coverImage} />
                    <FileUpload class="coverImage" type="businessInformationCover" frontEnd={props.frontEnd}/>
                </>}
            {profileImage === null ? <FileUpload type="Upload Profile image" /> :
                <>
                    <ProfileImage image={profileImage} />
                    <FileUpload class="profileImage" type="businessInformationProfile" frontEnd={props.frontEnd}/>
                </>}

        </>
    );
}