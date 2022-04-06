import React, { useEffect, useState } from 'react';
import * as fileActions from '../../actions/file';
import { connect } from "react-redux";
import { fetchAll } from '../../actions/businessServices';
import { Button } from '@material-ui/core';


function FileUpload(props) {
	const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [changeButton, setChangeButton] = useState("Upload");
	const [loaded, setLoaded] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		
	};

	const handleSubmission = (e) => {
		props.user.id && fileActions.postImage(selectedFile, props.type, props.user.id, props.providerId);
		window.location.reload();
	};

	useEffect(() => {
		console.log({ props })
		fetchAll();
		if (isFilePicked && !loaded) {
			handleSubmission();
			
		}
		if (props.exist) {
			setChangeButton("Change");
		}
		
	});



	return (
		<div className={'filePicker ' + props.class}>
			{console.log({props})}
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
	)
}


const mapStateToProps = state => ({
	user: state.authentication.user,

});



export default connect(mapStateToProps)(FileUpload);