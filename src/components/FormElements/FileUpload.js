import React, { useEffect, useState } from 'react';
import * as fileActions from '../../actions/file';
import { connect } from "react-redux";
import { fetchAll } from '../../actions/businessServices';
import { Button } from '@material-ui/core';


function FileUpload(props) {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		
	};

	const handleSubmission = (e) => {
		//e.preventDefault();
		props.user.id && props.postImage(selectedFile, props.type, props.user.id, props.providerId);
	};

	useEffect(() => {
		//console.log({ props })
		fetchAll();
		if (isFilePicked && !loaded) {
			handleSubmission();
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
				Change
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
	file: state.fileReducer,
	user: state.authentication.user,

});

//console.log({ mapStateToProps });

const mapActionsToProps = {
	fetchAll: fileActions.fetchAll,
	postImage: fileActions.postImage
}

export default connect(mapStateToProps, mapActionsToProps)(FileUpload);