import React, { useEffect, useState } from 'react';
import * as fileActions from '../../actions/file';
import { connect } from "react-redux";
import { fetchAll } from '../../actions/businessServices';
import { Button } from '@material-ui/core';


function FileUpload(props) {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'))
	const [loaded, setLoaded] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		
	};

	const handleSubmission = () => {
		props.postImage(selectedFile);
	};

	useEffect(() => {
		console.log({ props })
		fetchAll();
	});



	return (
		<div className={'filePicker ' + props.class}>
			<Button
				variant="contained"
				component="label"
			>
				{props.type}
				<input
					type="file"
					name="file"
					hidden
					onChange={changeHandler}
				/>
			</Button>
			
			{isFilePicked && !loaded ? (
				<div>
					<p>Filetype: {props.type}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}

					</p>
				</div>
			) : (
				<></>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}


const mapStateToProps = state => ({
	file: state.fileReducer

});

//console.log({ mapStateToProps });

const mapActionsToProps = {
	fetchAll: fileActions.fetchAll,
	postImage: fileActions.postImage
}

export default connect(mapStateToProps, mapActionsToProps)(FileUpload);