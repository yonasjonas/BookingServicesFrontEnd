import React from 'react'



const UploadToServer = ({ ...props}) => {

	const handleFileInput = (e) => {
		const file = e.target.files[0];
		props.parentCallback(file)
	};

	return (
		<div className="file-uploader">
			<input type="file" onChange={handleFileInput} />
		</div>
	)
}




export default UploadToServer;