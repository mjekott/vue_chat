import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Chat from '../views/Chat.vue';
import { auth } from '../includes/firebase';

const requireAuth = (to, from, next) => {
	const user = auth.currentUser;
	if (!user) {
		next({ name: 'home' });
	} else {
		next();
	}
};

const requireGuest = (to, from, next) => {
	const user = auth.currentUser;
	if (user) {
		next({ name: 'chat' });
	} else {
		next();
	}
};

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		beforeEnter: requireGuest
	},
	{
		path: '/chat',
		name: 'chat',
		component: Chat,
		beforeEnter: requireAuth
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
