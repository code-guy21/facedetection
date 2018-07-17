import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit, value }) => {
	return (
		<div>
			<p className=" center f3">
				{'This Magic Brain will detect faces in your pictures. Give it a try'}
			</p>
			<form onSubmit={onSubmit} className="center">
				<div className="center form pa4 br3 shadow-5">
					<input
						value={value}
						onChange={onInputChange}
						className="f4 pa2 w-70 center"
						type="text"
					/>
					<button className=" w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
						Detect
					</button>
				</div>
			</form>
		</div>
	);
};

export default ImageLinkForm;
