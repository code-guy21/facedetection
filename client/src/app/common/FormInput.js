import React from 'react';

const FormInput = ({
	input,
	label,
	type,
	placeholder,
	meta,
	meta: { touched, error }
}) => {
	return (
		<div className="mt3">
			<label className="db fw6 lh-copy f6" htmlFor="email-address">
				{label}
			</label>
			<input
				{...input}
				className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				type={type}
				placeholder={placeholder}
			/>
			{touched && error && <label>{error}</label>}
		</div>
	);
};

export default FormInput;
