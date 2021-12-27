import React, {  useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Logout() {
	const navigate = useNavigate();

	useEffect(() => {
		axios.post('http://127.0.0.1:8000/api/user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.clear();
		navigate('/')
	});
	return <div>Logout</div>;
}