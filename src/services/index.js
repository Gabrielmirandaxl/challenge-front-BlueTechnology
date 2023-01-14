import axios from 'axios'

const api = axios.create({
  baseUrl: "http://localhost:3000/user"
})

export default {
    register(user){
      return api.post('', user)
    },

    obter(){
      return api.get()
    }
}
