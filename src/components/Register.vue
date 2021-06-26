<template>
	<div class="w-full h-full flex flex-col">
		<h2 class="mb-2 text-center text-lg text-gray-700 ">Register</h2>
		<form @submit.prevent="handleSubmit">
			<div v-if="error" class="text-xs text-center text-red-500 mb-2">
				{{ error }}
			</div>
			<div class="space-y-1 mb-2">
				<label for="email" class="block text-gray-500 capitalize">Name</label>
				<input
					type="text"
					v-model="name"
					class="w-full py-1.5 px-1 border border-gray-300 rounded focus:ring focus:outline-none"
				/>
			</div>
			<div class="space-y-1 mb-2">
				<label for="email" class="block text-gray-500 capitalize">Email</label>
				<input
					type="email"
					v-model="email"
					class="w-full py-1.5 px-1 border border-gray-300 rounded focus:ring focus:outline-none"
				/>
			</div>
			<div class="space-y-1 mb-2">
				<label for="password" class="block text-gray-500 capitalize"
					>Password</label
				>
				<input
					type="password"
					v-model="password"
					class="w-full py-1.5 px-1 border border-gray-300 rounded focus:ring focus:outline-none"
				/>
			</div>

			<div>
				<button
					type="submit"
					class="w-full text-center flex items-center justify-center py-2 bg-blue-600 rounded text-blue-100 hover:bg-opacity-80"
				>
					<spinner :color="'white'" v-if="loading" />
					<span v-else> Register</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import { ref } from 'vue';
import Spinner from '../components/Spinner.vue';
import useSignup from '../composables/useSignup';
import { useRouter } from 'vue-router';

export default {
	name: 'Register',
	components: {
		Spinner
	},
	emits: ['signup'],
	setup(context) {
		const router = useRouter();
		const name = ref(null);
		const email = ref(null);
		const password = ref(null);
		const loading = ref(false);

		const { error, signup } = useSignup();
		const handleSubmit = async () => {
			if (!name.value || !email.value || !password.value) {
				error.value = 'All Fields Are Required';
				return;
			}
			loading.value = true;
			const data = {
				name: name.value,
				email: email.value,
				password: password.value
			};
			const res = await signup(data);
			loading.value = false;

			if (res) {
				router.push({ name: 'chat' });
			}
		};

		return {
			name,
			email,
			password,
			error,
			handleSubmit,
			loading
		};
	}
};
</script>

<style></style>
