import React from 'react';
import propTypes from 'prop-types'
import _ from 'lodash';

const Pagination = (props) => {
	const { itemsCount, pageSize, currentPage, onPageChange } = props;
	const pageCount = Math.ceil(itemsCount / pageSize);
	if (pageCount === 1) return null;
	const pages = _.range(1, pageCount + 1);

	return (
		<ul className="pagination pagination-md">
			{pages.map((page) => (
				<li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
					<button onClick={() => onPageChange(page)} className="page-link">
						{page}
					</button>
				</li>
			))}
		</ul>
	);
};

Pagination.propTypes = {
	itemsCount: propTypes.number.isRequired,
	pageSize: propTypes.number.isRequired,
	currentPage: propTypes.number.isRequired,
	onPageChange: propTypes.func.isRequired,
};

export default Pagination;
