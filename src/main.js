import { createApp } from 'vue'
import App from './App.vue'

import 'primevue/resources/themes/saga-blue/theme.css'      
import 'primevue/resources/primevue.min.css '         
import 'primeicons/primeicons.css'  

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const app = createApp(App)

app.use(PrimeVue)
app.use(ConfirmationService)
app.use(ToastService)


app.component('Dialog', Dialog)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputMask', InputMask)
app.component('Toast', Toast)
app.component('DataTable', DataTable);
app.component('Column', Column)


app.mount('#app')