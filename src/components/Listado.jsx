import PropTypes from "prop-types";

export const Listado = ({ colaboratorList, setDataBase }) => {
	const handleDeleteBtn = (userId) => {
		const newList = [...colaboratorList];
		const deletedIndex = newList.findIndex((user) => user.id === userId);
		newList.splice(deletedIndex, 1);

		setDataBase(newList);
	};
	return (
		<>
			<div className="table-responsive">
				<table className="table table-striped table-hover text-center align-middle">
					<thead>
						<tr>
							<th></th>
							<th>Nombre</th>
							<th>Correo</th>
							<th>Edad</th>
							<th>Cargo</th>
							<th>Telefono</th>
						</tr>
					</thead>
					<tbody className="table-group-divider">
						{colaboratorList.length > 0 ? (
							colaboratorList.map((user) => (
								<tr key={user.id}>
									<td>
										<button
											type="button"
											className="btn btn-sm btn-outline-danger rounded-circle"
											onClick={() =>
												handleDeleteBtn(user.id)
											}
										>
											<i className="fa-solid fa-trash fa-sm"></i>
										</button>
									</td>
									<td>{user.nombre}</td>
									<td>{user.correo}</td>
									<td>{user.edad}</td>
									<td>{user.cargo}</td>
									<td>{user.telefono}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6}>
									No se han encontrado registros.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

Listado.propTypes = {
	colaboratorList: PropTypes.array.isRequired,
	setDataBase: PropTypes.func.isRequired,
};

export default Listado;