<template>
    <div>
      <header class="header">
          <Button label="Cadastrar usuário" class="button-register p-button-success" @click="openModal" />
      </header>
   
        <Dialog header="Registro de usuário" v-model:visible="modal" :style="{ width: '300px', height: '390px' }" >
           
          <FormVue/>
          
        </Dialog>

    </div>
</template>

<script>

  import FormVue from '../Form/Form.vue';

  export default{
    name: "Header",
    components:{
      FormVue,
    },
    data(){
      return{
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


</style>
