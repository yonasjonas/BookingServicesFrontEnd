import React, { useEffect, useState } from 'react';
import * as fileActions from '../../actions/file';
import { connect } from "react-redux";
import { fetchAll } from '../../actions/businessServices';

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
		console.log({props})
		fetchAll();
	});



	return (
		<div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked && !loaded ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
						
					</p>
				</div>
			) : (
				<>
				<p>Select a file to show details</p>
				</>
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