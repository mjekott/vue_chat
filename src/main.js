import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { auth } from './includes/firebase';

let app;

auth.onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App)
			.use(router)
			.mount('#app');
	}
});
