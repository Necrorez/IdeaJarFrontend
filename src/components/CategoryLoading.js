import { CircularProgress } from '@material-ui/core';
import React from 'react';
function CategoryLoading(Component) {
	return function CategoryLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<CircularProgress color="secondary" />
		);
	};
}
export default CategoryLoading;
