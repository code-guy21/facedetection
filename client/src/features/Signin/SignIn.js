import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from './authActions';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import FormInput from '../../app/common/FormInput';

const actions = {
	signIn
};

const validate = combineValidators({
	email: isRequired('email'),
	password: isRequired('password')
});

class SignIn extends Component {
	handleSignIn = user => {
		this.props.signIn(user, () => this.props.history.push('/homepage'));
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
						<form
							onSubmit={handleSubmit(this.handleSignIn)}
							className="measure"
						>
							<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
								<legend className="f2 fw6 ph0 mh0">Sign In</legend>
								<Field
									type="email"
									label="email"
									name="email"
									component={FormInput}
									placeholder="email"
								/>
								<Field
									type="password"
									label="password"
									name="password"
									component={FormInput}
									placeholder="password"
								/>
							</fieldset>
							<div className="">
								<input
									className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
									type="submit"
									value="Sign in"
								/>
							</div>
							<div className="lh-copy mt3">
								<Link to="/register" className="f6 link dim black db">
									Register
								</Link>
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
)(reduxForm({ validate, form: 'signIn' })(SignIn));
