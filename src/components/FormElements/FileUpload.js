import React, { useEffect, useState, useCallback } from 'react';
import * as fileActions from '../../actions/file';
import { connect } from "react-redux";
import { fetchAll } from '../../actions/businessServices';
import { Button } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";


function FileUpload(props) {
	const [selectedFile, setSelectedFile] = useState(null);
	const [selectedFileURL, setSelectedFileURL] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [changeButton, setChangeButton] = useState("Upload");
	const [loaded, setLoaded] = useState(false);
	const { addToast } = useToasts();

	const [crop, setCrop] = useState({
		unit: 'px', // Can be 'px' or '%'
		x: 0,
		y: 0,
		width: 1900,
		height: 300,
		minHeight:300,
		minWidth:1920,
		locked: true, 
		
	  })
	let fileUrl = null;

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		
	};

	/* const onUploadCrop = useCallback(async () => {
		if (updateRequest && (crop?.height || crop?.width)) {
		  const { blob: croppedBlob, blobUrl, revokeUrl } = await cropImage(
			cropRef.current,
			requestData.items[0].file,
			crop,
			true
		  );
	
		  requestData.items[0].file = croppedBlob;
	
		  updateRequest({ items: requestData.items });
		  setCroppedUrl({ blobUrl, revokeUrl });
		}
	  }, [requestData, updateRequest, crop]);
 */
	const handleSubmission = (e) => {
		const onSuccess = () => {
			addToast("Submitted successfully", { appearance: 'success' });
			window.location.reload();
			//resetForm();
			//updateAfterSave();
		}
		props.businessInfo && props.businessInfo.list.length > 0 ? 
			fileActions.postImage(selectedFile, props.type, props.businessInfo.list[0].id, props.providerId, onSuccess)
			:
			fileActions.postImage(selectedFile, props.type, props.user.id, props.providerId)		
		;
		//
	};

	useEffect(() => {
		fetchAll();
		if (isFilePicked && !loaded) {
			 !selectedFileURL && setSelectedFileURL(URL.createObjectURL(selectedFile));

			handleSubmission();
			
		}
		if (props.exist) {
			setChangeButton("Change");
		}
		
	});



	return (
		<div>
			{/*selectedFileURL && <ReactCrop aspect={16 / 9} crop={crop} onChange={c => setCrop(c)}><img width="1920px" src={selectedFileURL} alt="upload" /></ReactCrop>*/}
			<div data-tour={props.type === "businessInformationProfile" ? 'tour-3' : 'tour-4'} className={'filePicker ' + props.class}>
			
				{ !props.frontEnd &&
				<Button
					variant="contained"
					component="label"
				>
					{changeButton}
					<input
						type="file"
						name="file"
						hidden
						onChange={changeHandler}
					/>
				</Button>}
			
				{isFilePicked && !loaded ? (
					<div>
						{/* <p>Filetype: {props.type}</p>
						<p>
							lastModifiedDate:{' '}
							{selectedFile.lastModifiedDate.toLocaleDateString()}
						</p> */}
						{}
					</div>
				) : (
					<></>
				)}
			
			</div>
		</div>
	)
}


const mapStateToProps = state => ({
	user: state.authentication.user,
	businessInfo: state.businesses
});



export default connect(mapStateToProps)(FileUpload);