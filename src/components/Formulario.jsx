import PropTypes from "prop-types";
import { useState } from "react";

const Formulario = ({
	dataBase,
	setDataBase,
	setShowAlert,
	setMessage,
	setFilter
}) => {
	const [user, setUser] = useState({
		id: "",
		nombre: "",
		correo: "",
		edad: "",
		cargo: "",
		telefono: "",
	});

	const [errors, setErrors] = useState({
		nombre: false,
		correo: false,
		edad: false,
		cargo: false,
		telefono: false,
	});

	const handleInput = (e) => {
		e.preventDefault();
		const { id, value } = e.target;
		const newUser = { ...user };

		switch (id) {
			case "nombre":
				newUser.nombre = value;
				break;
			case "correo":
				newUser.correo = value;
				break;
			case "edad":
				newUser.edad = value;
				break;
			case "cargo":
				newUser.cargo = value;
				break;
			case "telefono":
				newUser.telefono = value;
				break;
			default:
				break;
		}

		setUser(newUser);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newDataBase = [...dataBase, user];
		const nameRegex = /^[a-zA-Z]{3,20}$/;
		const emailRegex = /\w+@[a-zA-Z]+\.com$/;
		const ageRegex = /[1-9]{1}[0-9]{1}/;
		const positoinRegex = /^.{8,30}$/;
		const phoneRegex = /\d{1} \d{4} \d{4}/;

		const validName = nameRegex.test(user.nombre);
		const validEmail = emailRegex.test(user.correo);
		const validAge = ageRegex.test(user.edad);
		const validPosition = positoinRegex.test(user.cargo);
		const validPhone = phoneRegex.test(user.telefono);

		const evaluateErrors = { ...errors };

		user.id = Math.floor(Math.random() * 1000).toString();

		validName
			? (evaluateErrors.nombre = false)
			: (evaluateErrors.nombre = true);

		validEmail
			? (evaluateErrors.correo = false)
			: (evaluateErrors.correo = true);

		validAge ? (evaluateErrors.edad = false) : (evaluateErrors.edad = true);

		validPosition
			? (evaluateErrors.cargo = false)
			: (evaluateErrors.cargo = true);

		validPhone
			? (evaluateErrors.telefono = false)
			: (evaluateErrors.telefono = true);

		if (
			validName &&
			validEmail &&
			validAge &&
			validPosition &&
			validPhone
		) {
			setDataBase(newDataBase);
			setFilter(newDataBase);
			setUser({
				id: "",
				nombre: "",
				correo: "",
				edad: "",
				cargo: "",
				telefono: "",
			});
			setMessage({
				color: "alert-success",
				alertMessage: "Colaborador agregado con éxito!!!",
			});
		} else {
			setMessage({
				color: "alert-danger",
				alertMessage: "Hay campos que no cumplen con el formato.",
			});
		}

		setErrors(evaluateErrors);
		setShowAlert(true);

		setTimeout(() => {
			setShowAlert(false);
		}, 8000);
	};

	return (
		<>
			<div className="container-fluid bg-light rounded-3 p-4 border border-secondary-subtle">
				<h3 className="text-center">Agregar un nuevo colaborador</h3>
				<form onSubmit={handleSubmit} className="p-4">
					<div className="vstack gap-3">
						<div>
							<div className="input-group">
								<span className="input-group-text text-center ">
									<i className="fa-regular fa-user"></i>
								</span>
								<input
									id="nombre"
									type="text"
									className={`form-control ${
										errors.nombre ? "is-invalid" : ""
									}`}
									placeholder="Nombre"
									onChange={handleInput}
									value={user.nombre}
									required
								/>
							</div>
							<div className="form-text">
								Name must be 3-20 characters long.
							</div>
						</div>
						<div>
							<div className="input-group">
								<span className="input-group-text text-center ">
									<i className="fa-regular fa-envelope"></i>
								</span>
								<input
									id="correo"
									type="text"
									className={`form-control ${
										errors.correo ? "is-invalid" : ""
									}`}
									placeholder="Correo"
									onChange={handleInput}
									value={user.correo}
									required
								/>
							</div>
							<div className="form-text">
								Email Format: example@dominio.com
							</div>
						</div>
						<div>
							<div className="input-group">
								<span className="input-group-text text-center ">
									<i className="fa-solid fa-cake-candles"></i>
								</span>
								<input
									id="edad"
									type="text"
									className={`form-control ${
										errors.edad ? "is-invalid" : ""
									}`}
									placeholder="Edad"
									minLength={2}
									maxLength={2}
									title="Sólo se permiten números"
									onChange={handleInput}
									value={user.edad}
									required
								/>
							</div>
							<div className="form-text">Age range 10-99</div>
						</div>
						<div>
							<div className="input-group">
								<span className="input-group-text text-center ">
									<i className="fa-regular fa-address-card"></i>
								</span>
								<input
									id="cargo"
									type="text"
									className={`form-control ${
										errors.cargo ? "is-invalid" : ""
									}`}
									placeholder="Cargo"
									onChange={handleInput}
									value={user.cargo}
									required
								/>
							</div>
							<div className="form-text">
								Position must be 8-30 characters long.
							</div>
						</div>
						<div>
							<div className="input-group">
								<span className="input-group-text text-center ">
									<i className="fa-solid fa-phone"></i>
								</span>
								<input
									id="telefono"
									type="tel"
									className={`form-control ${
										errors.telefono ? "is-invalid" : ""
									}`}
									placeholder="Teléfono"
									aria-label="Teléfono"
									onChange={handleInput}
									minLength={11}
									maxLength={11}
									title="Sólo se permiten números con el formato x xxxx xxxx"
									value={user.telefono}
									required
								/>
							</div>
							<div className="form-text">
								Phone Format: x xxxx xxxx
							</div>
						</div>
						<button type="submit" className="btn btn-success">
							Agregar Colaborador
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

Formulario.propTypes = {
	dataBase: PropTypes.array.isRequired,
	setDataBase: PropTypes.func.isRequired,
	setShowAlert: PropTypes.func.isRequired,
	setMessage: PropTypes.func.isRequired,
	setFilter: PropTypes.func.isRequired,
};

export default Formulario;