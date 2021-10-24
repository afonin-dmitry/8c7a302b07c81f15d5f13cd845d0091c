import SERVER_URL from '../../app/config';
import axios from 'axios';

const getList = async () => {
    const response = await axios.get(`${SERVER_URL}/api/v1/audio/`);
    return response.data;
}

const get = async (id) => {
    return await axios.get(`${SERVER_URL}/api/v1/audio/${id}/`);
}

const getText = async (id) => {
    return await axios.get(`${SERVER_URL}/api/v1/audio/${id}/text/`);
}

const getDocument = async (id) => {
    console.log(id);
    return await axios.get(`${SERVER_URL}/api/v1/audio/${id}/document/`);
}

const create = async (file, isLast = false) => {
    const formData = new FormData();

    formData.append('audio', file);
    formData.append('isRussianLanguage', true);
    formData.append('isLast', isLast);

    return await axios.post(`${SERVER_URL}/api/v1/audio/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

const setText = async (id, text) => {
    await axios.post(`${SERVER_URL}/api/v1/audio/${id}/text/`, text);
}

export default { getList, get, getText, getDocument, create };