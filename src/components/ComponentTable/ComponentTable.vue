<template>
    <div>
      <header class="header">
          <Button label="Cadastrar usuário" class="button-register p-button-success" @click="openModal" />
      </header>
   
        <Dialog header="Registro de usuário" v-model:visible="modal" :style="{ width: '300px', height: '390px' }" >
                      
                <form method="post" @submit="register">
                  <div class="field col-12 md:col-4 personal-data">
                       <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                        <i class="pi pi-user"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="inputgroup" type="text" v-model="name" />
                                <label for="inputgroup">Nome</label>
                            </span>
                        </div>
                  </div>

                  <div class="field col-12 md:col-4 personal-data">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                        <i class="pi pi-at"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="inputgroup" type="email" v-model="email" />
                                <label for="inputgroup">Email</label>
                            </span>
                        </div>
                  </div>

                  <div class="field col-12 md:col-4 personal-data">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                        <i class="pi pi-phone"></i>
                            </span>
                            <span class="p-float-label">
                                <InputMask id="inputgroup" type="text" v-model="phone" mask="(99)99999-9999" />
                                <label for="inputgroup">Telefone</label>
                            </span>
                        </div>
                  </div>

                  <div class="button">
                     <Button type="submit"  label="Cadastrar" class="p-button-raised p-button-rounded p-button-success" />
                  </div>
                          
                    </form>
                   
          
        </Dialog>
        <Toast position="top-right" />

        <div>
          <DataTable :value="users" >
                <Column field="id" header="id"></Column>
                <Column field="name" header="Nome"></Column>
                <Column field="email" header="E-mail"></Column>
                <Column field="phone" header="Telefone"></Column>
                <Column header="Ações">
              
              <template #body="props">
                <Button
                  icon="pi pi-trash"
                  class="p-button-danger mr-1"
                  @click="delete(props.data.id)"
                ></Button>
                <Button
                  icon="pi pi-pencil"
                  class="p-button-warning"
                  @click="abrirModalAtualizar(props.data)"
                ></Button>
              </template>
                  
                </Column>
          </DataTable>
        </div>
        
    </div>
</template>

<script>

import api from '../../services/index'
 
  export default{
    name: "ComponentTable",
    data(){
      return{
        modal: false,
        name: "",
        email: "",
        phone: "",
        msg: "",
        users: [],
      }
    },
    mounted(){
      this.getUsers()
    },
    methods:{

      getUsers(){

      api.getUsers().then((response) => {
      this.users = response
      })

      },

      openModal(){
        this.modal = true
      },

      register(e){
        e.preventDefault()

        const obj = {
          name: this.name,
          email: this.email,
          phone: this.phone
        }
      
         api.registerUser("http://localhost:3000/user", obj).then((response) =>{
          if(response.message){
          this.$toast.add({severity:'error', summary: 'error', detail: `${response.message}`, life: 6000});
          
         } 
         else{
          
          this.modal = false
          this.clearFields()
          this.getUsers()
          this.$toast.add({severity:'success', summary: 'Sucesso', detail: 'Usuario cadastrado', life: 6000});
         } 
         })
       
      },

      delete(id){
       
      },

      clearFields(){
        this.name = ""
        this.email = ""
        this.phone = ""
      },

    
    },
    
  }
</script>

<style scoped>
  .header{
    background-color: #0074f8;
    height: 60px;
    display: flex;
    align-items: center;
  }

  .header .button-register{
    margin: 0px 0px 0px 20px;
  }

  .personal-data{
    margin: 30px 0px 0px 0px;
  }

  .button{
    text-align: center;
    margin: 30px 0px 0px 0px;
  }


</style>
