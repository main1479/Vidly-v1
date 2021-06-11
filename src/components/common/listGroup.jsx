import React from 'react';

const ListGroup = (props) => {
	const {items , selectedItem,  textProperty, valueProperty, onItemSelect} = props
	return (
		<div className="list-group">
			{items.map((item) => {
				return (
					<li
						onClick={() => onItemSelect(item)}
						key={item[valueProperty] || item[textProperty]}
						className={
							selectedItem === item ? 'list-group-item clickable active' : 'list-group-item clickable'
						}
					>
						{item[textProperty]}
					</li>
				);
			})}
		</div>
	);
};

ListGroup.defaultProps = {
	textProperty: 'name',
	valueProperty: '_id'
}


export default ListGroup;
