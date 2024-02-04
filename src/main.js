import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import {createPinia} from 'pinia' 

import "./assets/css/ayoflex.css"
import "./assets/css/example.css"



//createApp(App).mount('#app')
const app=createApp(App);
    app.use(router);
    //app.config.globalProperties.$eventBus= eventBus;

const pinia = createPinia();
    app.use(pinia);

app.mount('#app');
