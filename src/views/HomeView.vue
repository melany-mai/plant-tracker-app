<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div v-if="authStore.isAuthenticated">
    <h1>Bienvenue, {{ authStore.email }}</h1>
    <p v-if="authStore.isAdmin">Tu es administrateur.</p>
  </div>
  <div v-else>
    <h1>Plant Tracker</h1>
    <p>Connecte-toi pour voir tes plantes.</p>
  </div>
</template>
