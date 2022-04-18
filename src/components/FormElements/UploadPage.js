import React, { memo, useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Grid } from '@material-ui/core';
import Uploady, {
    useBatchAddListener,
    useBatchFinalizeListener,
    useBatchProgressListener,
    useItemFinalizeListener,
    useItemProgressListener,
    withBatchStartUpdate,
    withRequestPreSendUpdate,
} from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import { Line } from "rc-progress";
import UploadCropper from "./UploadCropper";
import SaveIcon from '@mui/icons-material/Save';

const SingleCropContainer = styled.div`
    width: 100%;
    display: flex;  
    flex-direction: column;
    align-items: center;
`;

const PreviewImage = styled.img`
  margin: 5px;
  max-width: ${props => props.width}
  max-height:  ${props => props.height}
  height: auto;
`;

const StyledProgressLine = styled(Line)`
  width: 100%;
  margin: 10px 0;
`;

const UploadProgress = ({ progress }) => {
    return <StyledProgressLine
        strokeWidth={1}
        percent={progress}
        trailColor={"rgba(54,56,56)"}
        strokeColor={"rgb(41,117,169)"}
    />;
};

const ItemUploadProgress = memo(({ id, show = false }) => {
    const { completed: progress, state: itemState } =
        useItemProgressListener(id) || { completed: 0 };

    return (show || itemState === "uploading") &&
        <UploadProgress progress={progress} />;
});

const ItemPreviewWithCrop = withRequestPreSendUpdate(({
    id,
    url,
    type,
    name,
    updateRequest,
    requestData,
}) => {
    const croppingRef = useRef(null);
    const [isCropped, setCropped] = useState(null);
    const [croppedImg, setCroppedImg] = useState(null);
    const [uploadedImage, setUploaded] = useState(false);

    const onUpload = useCallback(async () => {
        //console.log("onUpload: ", localprops);
        requestData.items[0].file = await croppingRef.current.cropImage();
        updateRequest({ items: requestData.items});
        setCroppedImg(croppingRef.current.getDataUrl());
        setUploaded(true)
    }, [requestData, updateRequest]);

    return (<SingleCropContainer>
        {!croppedImg ?
            <UploadCropper
                ref={croppingRef}
                url={url}
                type={type}
                name={name}
                setCropped={setCropped}
                width={requestData && requestData.options && requestData.options.params && requestData.options.params.width && requestData.options.params.width}
                height={requestData && requestData.options && requestData.options.params && requestData.options.params.width && requestData.options.params.height}
            /> :
            <PreviewImage width={requestData.options.params.width} height={requestData.options.params.height} className={requestData.options.params.Type + "_div"} src={croppedImg} alt="cropped img to upload" />
        }

        {isCropped && !croppedImg ?
            <div >
                <button className={requestData.options.params.Type + "_upload buttonBlue"} onClick={onUpload}>
                    <SaveIcon className="saveIcon"/><span>Confirm and Save new Image</span>
                </button>
                <p className={"businessInformationProfile_explanation"}>
                    <Grid className="floatLeft" md="2"><HelpOutlineIcon style={{fontSize:'81px', marginRight: '10px'}}/></Grid> 
                    <Grid md="10">You can drag the image to adjust it the way that you will want it to appear once uploaded. <br/>
                                You can also use mouse wheel to zoom the image. <br/> 
                                Once you are finished click Upload Selection button!
                    </Grid>
                </p>

            </div> : !uploadedImage && <>
            <p className={"businessInformationProfile_explanation"}><Grid className="floatLeft" md="2"><HelpOutlineIcon style={{fontSize:'81px', marginRight: '10px'}}/></Grid> <Grid md="10">You can drag the image to adjust it the way that you will want it to appear once uploaded. <br/>
                You can also use mouse wheel to zoom the image. <br/> 
                Once you are finished click Upload Selection button!</Grid></p></>}

        {/* {isCropped && <ItemUploadProgress id={id} />} */}
    </SingleCropContainer>);
});

export const UploadPage = (...props) => {

    //console.log({ props });

    /* if (providerId) {
        'ProviderId', providerId
    }

    'File': selectedFile
    'Type': type
    'FileName': selectedFile.name
    'BusinessId': userId */


    //setProps(props);
    //console.log("UploadPage", process.env.UPLOAD_URL);
    return (<Uploady
        destination={{ url: 'http://localhost:4000/api/upload/image/file' }}
        multiple={false}
        sendWithFormData={true}
        params={{
            'Type': props[0].type,
            'BusinessId': props[0].user,
            'ProviderId': props[0].providerId && props[0].providerId,
            'width': props[0].width,
            'height': props[0].height,
        }}

    >
        <h4></h4>
        <UploadButton className={props[0].type + " buttonBlue"}>{props[0].text}</UploadButton>
        <UploadPreview
            previewComponentProps={props[0]}
            PreviewComponent={ItemPreviewWithCrop}
        />
    </Uploady>);
};

export default UploadPage;   