import { createStore } from "vuex"
import axios from "axios"

export default createStore({
	state: {
		user: null,
		isAuthenticated: false,
	},
	getters: {
		user: (state) => state.user,
		isAuthenticated: (state) => state.isAuthenticated,
		username: (state) => state.user?.username || "",
		roles: (state) => state.user?.roles || [],
		status: (state) => state.user?.status || null,
		hasRole: (state) => (role) => {
			return state.user?.roles?.includes(role) || false
		},
		isAdmin: (state) => state.user?.roles?.includes("Admin") || false,
		isEditor: (state) => state.user?.roles?.includes("Editor") || state.user?.roles?.includes("Admin") || false,
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user
			state.isAuthenticated = !!user
		},
		CLEAR_USER(state) {
			state.user = null
			state.isAuthenticated = false
		},
	},
	actions: {
		async login({ commit }, username) {
			const response = await axios.post(`/api/users/login/${username}`)
			const user = response.data
			commit("SET_USER", user)
			localStorage.setItem("token", user.username)
			return user
		},
		async fetchCurrentUser({ commit }) {
			const token = localStorage.getItem("token")
			if (!token) {
				commit("CLEAR_USER")
				return null
			}
			try {
				const response = await axios.get("/api", {
					headers: { token },
				})
				commit("SET_USER", response.data)
				return response.data
			} catch (error) {
				commit("CLEAR_USER")
				localStorage.removeItem("token")
				throw error
			}
		},
		logout({ commit }) {
			commit("CLEAR_USER")
			localStorage.removeItem("token")
		},
	},
	modules: {},
})
