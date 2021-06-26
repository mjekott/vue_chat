import { ref } from 'vue';
import { auth } from '../includes/firebase';

const error = ref(null);

const signin = async (data) => {
	try {
		const res = await auth.signInWithEmailAndPassword(
			data.email,
			data.password
		);

		return res;
	} catch (err) {
		error.value = err.message;
		return;
	}
};

const useSignin = () => {
	return {
		signin,
		error
	};
};

export default useSignin;
