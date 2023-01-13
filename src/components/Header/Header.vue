<template>
    <div>
      <header class="header">
          <Button label="Cadastrar usuário" class="button-register p-button-success" @click="openModal" />
      </header>
   
        <Dialog header="Registro de usuário" v-model:visible="modal" :style="{ width: '300px', height: '390px' }" >
           
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
                    <InputText id="inputgroup" type="text" v-model="email" />
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
              <Button label="Cadastrar" class="p-button-raised p-button-rounded p-button-success" />
            </div>
               
        </Dialog>

    </div>
</template>

<script>

  export default{
    name: "Header",
    data(){
      return{
        name: null,
        email: null,
        phone: null,
        modal: false,
      }
    },
    methods:{
      openModal(){
         this.modal = true
      }
    }
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
    margin: 30px 0px 0px 0px ;
  }
</style>
