import React, { Component } from 'react';
import { connect} from 'react-redux';
import actions from '../../actions';

class Categories extends Component {
	onSelectCategory(category, e) {
		e.preventDefault();
		console.log("selected?")
		this.props.selectCategory(category);
	}

	render() {
		return (

				<div className="inner">

					{/* Menu */}
					<nav id="menu">
						<header className="major">
							<h2>Categories</h2>
						</header>
						<ul>
							{
								this.props.tasks.categories.map(category => {
									const color = (category == this.props.tasks.selectedCategory) ? 'red' : '#333';

									return (
										<li key={category}>
											<a onClick={this.onSelectCategory.bind(this, category)} style={{color: color}}>{category}</a>
										</li>
									);
								})
							}
						</ul>
					</nav>

				</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.task
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		selectCategory: (params) => dispatch(actions.selectCategory(params))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);



