<template>
	<section class="h-full bg-gray-100 flex justify-center items-center flex-col">
		<h1 class="text-bold text-gray-900 tracking-wide text-2xl mb-2  ">
			Vue Chat
		</h1>
		<div class="md:w-96 bg-white shadow mb-2 p-2 rounded-lg">
			<component :is="selectedComponent"></component>
		</div>
		<div v-if="selectedComponent === 'Login'">
			<p class="text-sm text-gray-400">
				No account yet?
				<span
					class="cursor-pointer"
					@click.prevent="selectedComponent = 'Register'"
				>
					Register
				</span>
			</p>
		</div>
		<div v-else>
			<p class="text-sm text-gray-400">
				Already have an account?
				<span
					class="cursor-pointer"
					@click.prevent="selectedComponent = 'Login'"
				>
					Login
				</span>
			</p>
		</div>
	</section>
</template>

<script>
import { ref } from 'vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

export default {
	name: 'Home',
	components: {
		Login,
		Register
	},
	setup() {
		const selectedComponent = ref('Login');

		const success = () => {
			console.log('yes baby');
		};

		return {
			selectedComponent,
			success
		};
	}
};
</script>
