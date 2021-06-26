import { ref } from 'vue';
import { messages } from '../includes/firebase';

const error = ref(null);

const sendMessage = async (data) => {
	try {
		const res = await messages.add(data);
	} catch (err) {
		console.log(err);
		error.value = 'Could not send the message';
	}
};

const useChat = () => {
	return {
		sendMessage,
		error
	};
};

export default useChat;
