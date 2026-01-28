<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" md="8">
				<v-card class="mt-4" color="teal-lighten-5">
					<v-card-title class="text-h4">
						<v-icon class="mr-2" color="teal">mdi-pencil</v-icon>
						Editor Page
					</v-card-title>
					<v-card-text class="text-h6">
						Welcome, <strong>{{ username }}</strong>!
					</v-card-text>
					<v-card-text>
						<v-alert type="info" variant="tonal">
							You have editor privileges.
						</v-alert>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
const username = computed(() => store.getters.username)
</script>
