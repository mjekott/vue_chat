<template>
	<div class="w-full h-full flex flex-col">
		<h2 class="mb-2 text-center text-lg text-gray-700 ">Login</h2>
		<form @submit.prevent="handleSubmit">
			<div v-if="error" class="text-xs text-center text-red-500 mb-2">
				{{ error }}
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
					class="w-full text-center flex justify-center items-center py-2 bg-blue-600 rounded text-blue-100 hover:bg-opacity-80"
				>
					<spinner v-if="loading" color="white" />
					<span v-else> Login</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import { ref } from 'vue';
import Spinner from '../components/Spinner.vue';
import useSignin from '../composables/useSignin';
import { useRouter } from 'vue-router';

export default {
	name: 'Login',
	components: {
		Spinner
	},
	setup(props, context) {
		const router = useRouter();
		const email = ref(null);
		const password = ref(null);
		const { error, signin } = useSignin();

		const loading = ref(false);
		const handleSubmit = async () => {
			loading.value = true;
			if (!email.value || !password.value) {
				error.value = 'All fields are required';
				loading.value = false;
				return;
			}
			const data = {
				email: email.value,
				password: password.value
			};

			const res = await signin(data);
			loading.value = false;
			if (res) {
				router.push({ name: 'chat' });
			}
		};

		return {
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
