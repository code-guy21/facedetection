import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img
					id="inputimage"
					src={
						imageUrl ||
						'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
					}
					alt="faceimage"
					width="500px"
					height="auto"
				/>
				<div
					className="bounding-box"
					style={{
						top: box.topRow,
						right: box.rightCol,
						bottom: box.bottomRow,
						left: box.leftCol
					}}
				/>
			</div>
		</div>
	);
};

export default FaceRecognition;
