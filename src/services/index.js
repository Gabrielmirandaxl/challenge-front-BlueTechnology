const url = 'http://localhost:3500/api/User';
const urlSearch = 'http://localhost:3500/';
import api from '../libs/index';
export default {
    getUsers() {
        return api.get(url);
    },

    registerUser(userDetailsDto) {
        return api.post(url, userDetailsDto);
    },

    deleteUser(id) {
        return api.delete(`${url}/${id}`);
    },

    update(obj) {
        return api.put(`${url}/${obj.Id}`, obj);
    },

    search(search) {
        return api.getSearch(`${urlSearch}search?email=${search}`);
    },

    getUser(id) {
        return api.getOne(`${url}/${id}`);
    },
};
