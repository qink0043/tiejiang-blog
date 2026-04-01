import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import Message from './components/Message'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Message)

app.mount('#app')
