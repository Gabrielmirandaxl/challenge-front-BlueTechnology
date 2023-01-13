import { createApp } from 'vue'
import App from './App.vue'

import 'primevue/resources/themes/saga-blue/theme.css'      
import 'primevue/resources/primevue.min.css '         
import 'primeicons/primeicons.css'  

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';



const app = createApp(App)

app.use(PrimeVue)
app.use(ConfirmationService)


app.component('Dialog', Dialog)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputMask', InputMask)


app.mount('#app')