import { useEffect,useState } from 'react';
import './App.css';
import CategoryView from './components/CategoryView';
import CategoryLoadingComponent from './components/CategoryLoading';
import axiosInstance from './axios';


function App() {
  const CategoryLoading = CategoryLoadingComponent(CategoryView);
  const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get('categories/').then((res) => {
			setAppState({ loading: false, posts: res.data });
		});
	}, [setAppState]);
  return (
    <div className="App">
      
      <CategoryLoading isLoading={appState.loading} categories={appState.posts}/>
    </div>
  );
}

export default App;
