import React, { useState, useEffect } from "react";
import FileUpload from "../../components/FormElements/FileUpload";
import HeroImage from "./HeroImage";
import ProfileImage from "./ProfileImage";
import UploadPage from "../FormElements/UploadPage";
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

        //
    });


    //const user = JSON.parse(localStorage.getItem("user"));
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    return (
        <>
        
        
            {coverImage === null && !props.frontEnd ? 
                <>
                    <h3 className="noCoverImage hidemobile">Upload your business cover image that will be visible on your business page</h3>

                  <UploadPage exist={false} class="noCoverImage hidemobile" width={1903} height={300}  user={user} type="businessInformationCover"  text="Add Cover Image"/>
                </> :
                <>
                    <HeroImage image={coverImage} />
                    
                        {!props.frontEnd && <UploadPage frontEnd={props.frontEnd} exist={true} user={user} width={1903} height={300} type="businessInformationCover" text="Change Cover Image" />}
                </>
            }
            {profileImage === null ? <><h3 className="noProfileImage hidemobile">Upload business logo</h3>
                <UploadPage exist={false} class="noCoverImage" user={user} type="businessInformationProfile" text="Add Profile Picture" width={200} height={200}  />
            </> :
                <>
                    <ProfileImage className="hidemobile" image={profileImage} />
{/*                     <FileUpload class="profileImage" type="businessInformationProfile" frontEnd={props.frontEnd} exist={true} user={props.user} />
 */}                    {!props.frontEnd && <UploadPage frontEnd={props.frontEnd} exist={true} user={user} type="businessInformationProfile" text="Change Profile Picture" width={200} height={200}  />}
                </>}

        </>
    );
}


const mapStateToProps = state => ({
    authentication: state.authentication,
});


export default connect(mapStateToProps)(MainImages);