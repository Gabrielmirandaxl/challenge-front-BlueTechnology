const url = "http://localhost:3000/user"
import api from '../libs/index'
export default{
     getUsers(){
      return api.get(url)
     },

     registerUser(url, obj){
        return api.post(url, obj)
     }
}