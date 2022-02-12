import axios from 'axios';
import React, { useState } from 'react';

const UploadToServer = () => {
	const [selectedFile, setSelectedFile] = useState(null);


	// On file select (from the pop up)
	const onFileChange = event => {

		// Update the state
		setSelectedFile(event.target.files[0]);

	};

	// On file upload (click the upload button)
	const onFileUpload = () => {

		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"myFile",
			selectedFile,
			selectedFile.name
		);

		// Details of the uploaded file
		console.log(selectedFile);

		// Request made to the backend api
		// Send formData object
		axios.post("http://localhost:4000/providers/image/file", formData);
	};

	// File content to be displayed after
	// file upload is complete
	const fileData = () => {

		if (this.state.selectedFile) {

			return (
				<div>
					<h2>File Details:</h2>
					<p>File Name: {this.state.selectedFile.name}</p>
					<p>File Type: {this.state.selectedFile.type}</p>
					<p>Last Modified:{" "}
						{this.state.selectedFile.lastModifiedDate.toDateString()}
					</p>

				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>Choose before Pressing the Upload button</h4>
				</div>
			);
		}
	};

	
		/*  */
		return (
			<div>
				<div>
					<input type="file" onChange={onFileChange} />
					<button onClick={onFileUpload}>
						Upload!
					</button>
				</div>
				{fileData}
			</div>
		);
	}


export default UploadToServer;