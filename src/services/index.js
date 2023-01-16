const url = "http://localhost:3000/user"
import api from '../libs/index'
export default{
     getUsers(){
      return api.get(url)
     },

     registerUser(obj){
        return api.post(url, obj)
     },

     deleteUser(id){
      return api.delete(`${url}/${id}`)
     },

     update(obj){
      return api.put(`${url}/${obj.id}`, obj)
     },

     search(search){
      return api.getSearch(`${url}/pesq?email=${search}`)
     }

     

    
}