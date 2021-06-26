<template>
	<div
		class="w-6 h-6  rounded-full border-t animate-spin "
		id="spinner"
		:class="color ? `border-${color}` : 'border-yellow-500'"
	></div>
</template>

<script>
export default {
	props: ['color']
};
</script>
