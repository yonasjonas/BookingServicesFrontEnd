import React, { forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const StyledCropper = styled(Cropper)`
  min-width:200px;
  margin: 20px 0;
`;

const cropImage = (cropper, type, name) =>
	new Promise((resolve) => {
		cropper
			.getCroppedCanvas()
			.toBlob((blob) => {
				blob.name = name;
				resolve(blob);
			}, type);
	});

const UploadCropper = forwardRef(({ url, type, name, width, height, setCropped }, ref) => {
	const cropperRef = useRef(null);

    if (type === "businessInformationCover"){
        width = 1920;
        height = 300;
    }
    else if (type === "businessInformationProfile"){
        width = 200;
        height = 200;
    }

    console.log("dddddddddddddddddddddddddddddddddddddddddddd",{width})

	useImperativeHandle(ref, () => ({
		cropImage: () => cropImage(cropperRef.current.cropper, type, name),
		removeCrop: () => {
			cropperRef.current.cropper.clear();
			setCropped?.(false);
		},
		getDataUrl: () =>
			cropperRef.current.cropper.getCroppedCanvas().toDataURL(),
	}));

	const onCropEnd = () => {
		setCropped?.(true);
	};

	return <StyledCropper
        className={type + "_div"}
		src={url}
        style={{ width: width + "px", height: height + "px" }}
		autoCrop={true}
        initialAspectRatio={width / height}
        //zoomTo={.7}
		background={true}
        //aspectRatio={(width - (width / 10)) / ( height - (height / 10))}
        autoCropArea={1}
        dragMode={'move'}
		modal={true}
		viewMode={3}
		zoomable={true}
		cropend={onCropEnd}
		ref={cropperRef}
        locked={true}
	/>;
});

export default UploadCropper;