import React, { Component } from 'react';
import FaceRecognition from '../../features/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../../features/ImageLinkForm/ImageLinkForm';
import Logo from '../../features/Logo/Logo';
import Navigation from '../../features/Navigation/Navigation';
import Rank from '../../features/Rank/Rank';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Clarifai from 'clarifai';
import { signOut } from '../../features/Signin/authActions';
import { updateEntries } from '../../features/FaceRecognition/entriesActions';

console.log(process.env.REACT_APP_FACE_KEY);

const faceApp = new Clarifai.App({
	apiKey: `${process.env.REACT_APP_FACE_KEY}`
});

const actions = {
	signOut,
	updateEntries
};

const mapState = state => {
	return {
		signedIn: state.auth.signedIn,
		userName: state.auth.name,
		rank: state.auth.entries,
		userId: state.auth.id
	};
};

class HomePage extends Component {
	state = {
		input:
			'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
		imageUrl: '',
		box: {}
	};

	calculateFaceLocation = data => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height
		};
	};

	displayFaceBox = box => {
		this.setState({ box: box });
	};

	onInputChange = event => {
		this.setState({ input: event.target.value });
	};

	onSubmit = async event => {
		event.preventDefault();
		this.setState({ imageUrl: this.state.input });

		try {
			const res = await faceApp.models.predict(
				Clarifai.FACE_DETECT_MODEL,
				this.state.input
			);
			await this.displayFaceBox(this.calculateFaceLocation(res));
			await this.props.updateEntries(this.props.userId);
		} catch (error) {
			console.log(error);
		}
	};

	handleSignOut = () => {
		this.props.signOut(() => this.props.history.push('/'));
	};

	render() {
		return this.props.signedIn === true ? (
			<div>
				<Navigation signOut={this.handleSignOut} />
				<Logo />
				<Rank rank={this.props.rank} userName={this.props.userName} />
				<ImageLinkForm
					onSubmit={this.onSubmit}
					onInputChange={this.onInputChange}
					value={this.state.input}
				/>
				<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
			</div>
		) : (
			<Redirect to="/" />
		);
	}
}

export default connect(
	mapState,
	actions
)(HomePage);
