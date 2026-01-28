import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import store from "../store"

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
		meta: { requiresAuth: false },
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("../views/Home.vue"),
		meta: { requiresAuth: true, allowedRoles: ["User", "Editor", "Admin"] },
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: { requiresAuth: true, allowedRoles: ["Admin"] },
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: { requiresAuth: true, allowedRoles: ["Editor", "Admin"] },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach(async (to, from, next) => {
	const requiresAuth = to.meta.requiresAuth !== false
	const allowedRoles = to.meta.allowedRoles

	if (!requiresAuth) {
		return next()
	}

	if (!store.state.isAuthenticated) {
		try {
			await store.dispatch("fetchCurrentUser")
		} catch (error) {
			return next({ name: "Login" })
		}
	}

	if (!store.state.isAuthenticated) {
		return next({ name: "Login" })
	}

	if (allowedRoles && allowedRoles.length > 0) {
		const userRoles = store.getters.roles
		const hasAccess = allowedRoles.some((role) => userRoles.includes(role))
		if (!hasAccess) {
			return next({ name: "Home" })
		}
	}

	next()
})

export default router
