import axios from "axios";

const instance = axios.create({
    baseURL: 'https://rookas-backend-mern-discord.herokuapp.com'
});

export default instance;