<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ApiError } from '@/services/httpClient'

const email = ref('')
const username = ref('')
const plainPassword = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const authStore = useAuthStore()
const router = useRouter()

async function handleSubmit() {
  errorMessage.value = ''
  isSubmitting.value = true
  try {
    await authStore.register({
      email: email.value,
      username: username.value,
      plainPassword: plainPassword.value,
    })
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
    <h1>Créer un compte</h1>

    <label>
      Email
      <input v-model="email" type="email" required autocomplete="email" />
    </label>

    <label>
      Nom d'utilisateur
      <input v-model="username" type="text" required autocomplete="username" />
    </label>

    <label>
      Mot de passe
      <input v-model="plainPassword" type="password" required autocomplete="new-password" />
    </label>

    <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>

    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Création…' : 'Créer mon compte' }}
    </button>

    <p><RouterLink to="/login">J'ai déjà un compte</RouterLink></p>
  </form>
</template>
