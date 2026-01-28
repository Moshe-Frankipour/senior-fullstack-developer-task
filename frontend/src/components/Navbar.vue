<template>
	<v-app-bar color="primary" prominent>
		<v-app-bar-title>
			<v-icon icon="mdi-hotel" class="mr-2"></v-icon>
			HyperGuest
		</v-app-bar-title>

		<v-spacer></v-spacer>

		<v-btn to="/home" variant="text" prepend-icon="mdi-home">Home</v-btn>
		<v-btn v-if="isEditor" to="/editor" variant="text" prepend-icon="mdi-pencil">Editor</v-btn>
		<v-btn v-if="isAdmin" to="/admin" variant="text" prepend-icon="mdi-shield-crown">Admin</v-btn>

		<v-divider vertical class="mx-2"></v-divider>

		<v-chip color="white" variant="outlined" class="mr-2">
			<v-icon start icon="mdi-account"></v-icon>
			{{ username }}
		</v-chip>

		<v-btn icon="mdi-logout" variant="text" @click="handleLogout" title="Logout"></v-btn>
	</v-app-bar>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const username = computed(() => store.getters.username)
const isAdmin = computed(() => store.getters.isAdmin)
const isEditor = computed(() => store.getters.isEditor)

const handleLogout = () => {
	store.dispatch("logout")
	router.push({ name: "Login" })
}
</script>
