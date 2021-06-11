import React from 'react';

const Like = (props) => {
	return (
		<i
			onClick={props.onClick}
			className={props.liked ? 'bi bi-heart-fill clickable' : 'bi bi-heart clickable'}
		></i>
	);
};

export default Like;
