import React, { Component } from 'react';

class MovieDetails extends Component {
   handleSave = ()=> {
      this.props.history.push('/movies')
   }
	render() {
		const { params } = this.props.match;
		return (
			<React.Fragment>
				<h1 className="mt-5 mb-3">Movie Form {params.id}</h1>
				<button onClick={this.handleSave} className="btn btn-primary">Save</button>
			</React.Fragment>
		);
	}
}

export default MovieDetails;
