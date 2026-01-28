<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" md="8">
				<v-card class="mt-4">
					<v-card-title class="text-h4">
						<v-icon class="mr-2" color="primary">mdi-home</v-icon>
						Home Page
					</v-card-title>
					<v-card-text class="text-h6">
						Welcome, <strong>{{ username }}</strong>!
					</v-card-text>
					<v-card-text>
						<v-chip
							v-for="role in roles"
							:key="role"
							class="mr-2"
							color="primary"
							variant="outlined"
						>
							{{ role }}
						</v-chip>
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
const roles = computed(() => store.getters.roles)
</script>
