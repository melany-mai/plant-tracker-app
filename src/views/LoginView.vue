<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ApiError } from '@/services/httpClient'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const authStore = useAuthStore()
const router = useRouter()

async function handleSubmit() {
  errorMessage.value = ''
  isSubmitting.value = true
  try {
    await authStore.login({ email: email.value, password: password.value })
    router.push({ name: 'home' })
  } catch (error) {
    errorMessage.value = error instanceof ApiError ? error.message : 'Une erreur est survenue.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>Connexion</h1>

    <label>
      Email
      <input v-model="email" type="email" required autocomplete="email" />
    </label>

    <label>
      Mot de passe
      <input v-model="password" type="password" required autocomplete="current-password" />
    </label>

    <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>

    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Connexion…' : 'Se connecter' }}
    </button>

    <p><RouterLink to="/register">Créer un compte</RouterLink></p>
  </form>
</template>
