<template>
	<div
		class="flex-1  bg-white border-t rounded-t-2xl px-1 py-2 space-y-3 overflow-y-scroll"
		ref="messages"
	>
		<div v-if="error">{{ error }}</div>
		<div v-if="documents">
			<div
				class="flex"
				v-for="document in documents"
				:key="document.id"
				:class="document.name === user ? 'justify-end' : ''"
			>
				<div class="mb-2">
					<span
						class="block text-sm p-2 font-bold text-gray-400"
						v-if="document.name !== user"
						>{{ document.name }}</span
					>
					<p class="max-w-xs bg-gray-100 rounded-lg p-2 text-gray-500">
						{{ document.message }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { onUpdated, ref } from 'vue';
import getChats from '../composables/getChats';
import { auth } from '../includes/firebase';

export default {
	name: 'ChatWindow',
	setup() {
		const { documents, error } = getChats();
		const user = ref(auth.currentUser.displayName);

		//auto scroll to bottom
		const messages = ref(null);

		onUpdated(() => {
			messages.value.scrollTop = messages.value.scrollHeight;
		});

		return { documents, error, user, messages };
	}
};
</script>

<style></style>
