import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = (props) => {
	const { data, sortColumn, onSort, columns } = props;
	return (
		<table className="table mt-3">
			<TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
			<TableBody data={data} columns={columns} />
		</table>
	);
};

export default Table;
