export default{
  get(url){
    return fetch(url, {
      method: "GET",
    })
    .then((response) => response.json())
  },

  post(url, obj){
    return fetch(url, {
      method: "POST",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify(obj)
    })
    .then((response) => response.json())
  },

  delete(url){
    return  fetch(url, {
      method: "DELETE",
    })
  },

  put(url, obj){
    return fetch(url, {
      method: "PUT",
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify(obj),
  }).then((response) => response.json());
    
  }

}