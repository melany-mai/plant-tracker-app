<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="app-header">
    <nav class="app-nav">
      <RouterLink to="/" class="brand">🌿​</RouterLink>
      <div class="app-nav-links">
        <template v-if="authStore.isAuthenticated">
          <span class="user-email">{{ authStore.email }}</span>
          <button type="button" class="btn-secondary" @click="handleLogout">Se déconnecter</button>
        </template>
        <template v-else>
          <RouterLink to="/login">Connexion</RouterLink>
          <RouterLink to="/register">Inscription</RouterLink>
        </template>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.app-nav {
  max-width: 720px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-primary);
  text-decoration: none;
}

.app-nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-nav-links a {
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.app-nav-links a:hover {
  color: var(--color-primary);
}

.user-email {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}
</style>
