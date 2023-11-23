import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_URL;

export function getUsuarios() {
    return axios.get(`${URL_BASE}/usuarios`);
}

export function createUsuario(data) {
    return axios.post(`${URL_BASE}/usuarios`, data);
}

export function updateUsuario(id, data) {
    return axios.put(`${URL_BASE}/atualiza-usuario/${id}`, data);
}

export function deleteUsuarios(id) {
    return axios.delete(`${URL_BASE}/deleta-usuario/${id}`);
}