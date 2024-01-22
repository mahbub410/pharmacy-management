import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import mitt from 'mitt'

import "./assets/css/ayoflex.css"
import "./assets/css/example.css"

let eventBus = mitt();

//createApp(App).mount('#app')
const app=createApp(App);

    app.config.globalProperties.$eventBus= eventBus;

app.mount('#app');
