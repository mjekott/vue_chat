import { ref, watchEffect } from 'vue';
import { messages } from '../includes/firebase';

const getChats = (data) => {
	const documents = ref(null);
	const error = ref(null);
	const snapshot = messages.orderBy('createdAt');

	const unsub = snapshot.onSnapshot(
		(snap) => {
			let results = [];
			snap.docs.forEach((doc) => {
				doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
			});
			documents.value = results;
			error.value = null;
		},
		(err) => {
			console.log(err);
			documents.value = null;
			error = 'could not fecth data';
		}
	);

	watchEffect((onInvalidate) => {
		onInvalidate(() => unsub());
	});
	return {
		documents,
		error
	};
};

export default getChats;
