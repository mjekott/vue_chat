<template>
	<div
		class="h-full bg-blue-500 max-h-screen  flex flex-col pt-2 max-w-md mx-auto border border-gray-100 "
	>
		<div
			class="flex items-center justify-between px-4 text-white font-serif font-bold py-2"
		>
			<h2>Welcome {{ user }}</h2>
			<button class="text-gray-50 text-md" @click.prevent="logout">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					/>
				</svg>
			</button>
		</div>

		<chat-window />

		<div class="flex border-t">
			<p v-if="error" class="text-red-600">{{ error }}</p>
			<form @submit.prevent="handleSubmit" class="w-full py-1 px-2 bg-white">
				<input
					type="text"
					v-model="message"
					class="py-3 w-full px-5 focus:outline-none rounded-lg bg-gray-50"
					placeholder="Type a message"
				/>
			</form>
		</div>
	</div>
</template>

<script>
import { auth, timestamp } from '../includes/firebase';
import ChatWindow from '../components/Chatwindow.vue';
import { ref } from 'vue';
import useChat from '../composables/useChat';
import { useRouter } from 'vue-router';

export default {
	name: 'Chat',
	components: {
		ChatWindow
	},
	setup() {
		const router = useRouter();
		const message = ref(null);
		const user = auth.currentUser.displayName;
		const { error, sendMessage } = useChat();
		const handleSubmit = async () => {
			if (!message.value) {
				return;
			}

			const data = {
				message: message.value,
				name: auth.currentUser.displayName,
				createdAt: timestamp()
			};

			await sendMessage(data);
			if (!error.value) {
				message.value = '';
			}
		};

		const logout = async () => {
			await auth.signOut();
			router.push({ name: 'home' });
		};

		return {
			handleSubmit,
			message,
			error,
			logout,
			user
		};
	}
};
</script>

<style></style>
