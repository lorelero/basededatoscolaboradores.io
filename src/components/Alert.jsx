import PropTypes from "prop-types";

const Alert = ({ message }) => {
	const { color, alertMessage } = message;
	return (
		<>
			<div className={`alert ${color} text-center`} role="alert">
				<strong>{ alertMessage }</strong>
			</div>
		</>
	);
};

Alert.propTypes = {
	message: PropTypes.object.isRequired,
};

export default Alert;