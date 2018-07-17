import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	combineValidators,
	isRequired,
	composeValidators,
	isAlphabetic,
	hasLengthGreaterThan
} from 'revalidate';
import { reduxForm, Field } from 'redux-form';
import FormInput from '../../app/common/FormInput';
import { register } from '../Signin/authActions';
import { connect } from 'react-redux';

const actions = {
	register
};

const validate = combineValidators({
	name: composeValidators(isRequired, isAlphabetic)('name'),
	email: isRequired('email'),
	password: composeValidators(isRequired, hasLengthGreaterThan(8))('password')
});

class Register extends Component {
	handleRegisterUser = user => {
		this.props.register(user, () => this.props.history.push('/homepage'));
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<nav style={{ display: 'flex', justifyContent: 'flex-start' }}>
					<Link to="/" className="f3 link dim black underline pa3 pointer">
						Sign In
					</Link>
				</nav>
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
						<form
							onSubmit={handleSubmit(this.handleRegisterUser)}
							className="measure"
						>
							<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
								<legend className="f2 fw6 ph0 mh0">Register</legend>
								<Field
									name="name"
									type="text"
									component={FormInput}
									label="name"
								/>
								<Field
									name="email"
									type="email"
									component={FormInput}
									label="email"
								/>
								<Field
									name="password"
									type="password"
									component={FormInput}
									label="password"
								/>
							</fieldset>
							<div className="">
								<input
									className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
									type="submit"
									value="Register"
								/>
							</div>
						</form>
					</main>
				</article>
			</div>
		);
	}
}

export default connect(
	null,
	actions
)(reduxForm({ validate, form: 'registerForm' })(Register));
