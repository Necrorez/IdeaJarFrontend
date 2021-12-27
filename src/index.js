import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import PostView from './components/PostView';
import CategoryPagination from './components/CategoryPagination'
import Messages from './components/Messages';
import AdminCategory from './components/AdminCategory';
const routing = (
	<Router>
			<Header />
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/register/" element={<Register />} />
				<Route path="/login/" element={<Login />} />
				<Route path="/logout/" element={<Logout />} />
				<Route path="/category/:id" element={<CategoryPagination />} />
				<Route path="/category/:id/post/:id2" element={<PostView />} />
				<Route path="/messages" element={<Messages />} />
				<Route path="/admin/category" element={<AdminCategory />} />
			</Routes>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

