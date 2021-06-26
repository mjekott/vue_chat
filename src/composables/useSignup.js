import { ref } from 'vue';
import { auth } from '../includes/firebase';

const error = ref('');

const signup = async (data) => {
	try {
		const res = await auth.createUserWithEmailAndPassword(
			data.email,
			data.password
		);
		await res.user.updateProfile({
			displayName: data.name
		});
		error.value = null;
		return res;
	} catch (err) {
		if (err.code === 'auth/network-request-failed') {
			error.value = 'Network Connection failed! Try again';
			return;
		}
		error.value = err.message;
		return;
	}
};

const useSignup = () => {
	return {
		error,
		signup
	};
};

export default useSignup;
