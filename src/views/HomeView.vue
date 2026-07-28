<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getPlants, deletePlant } from '@/services/plantService'
import { ApiError } from '@/services/httpClient'
import type { Plant } from '@/types/plant'

const plants = ref<Plant[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

async function loadPlants() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const collection = await getPlants()
    plants.value = collection.member
  } catch (error) {
    errorMessage.value =
      error instanceof ApiError ? error.message : 'Impossible de charger les plantes.'
  } finally {
    isLoading.value = false
  }
}

async function handleDelete(id: number) {
  if (!confirm('Supprimer cette plante ?')) {
    return
  }
  await deletePlant(id)
  plants.value = plants.value.filter((plant) => plant.id !== id)
}

onMounted(loadPlants)
</script>

<template>
  <h1>Mes plantes</h1>
  <p><RouterLink to="/plants/new">+ Ajouter une plante</RouterLink></p>

  <p v-if="isLoading">Chargement…</p>
  <p v-else-if="errorMessage" role="alert">{{ errorMessage }}</p>
  <p v-else-if="plants.length === 0">Aucune plante pour l'instant.</p>

  <ul v-else>
    <li v-for="plant in plants" :key="plant.id">
      <strong>{{ plant.name }}</strong> — {{ plant.speciesCommonName }}
      <br />
      Arrosage tous les {{ plant.wateringFrequencyDays }} jours, dernier arrosage le
      {{ new Date(plant.lastWateredAt).toLocaleDateString() }}
      <br />
      <RouterLink :to="`/plants/${plant.id}/edit`">Modifier</RouterLink>
      <button type="button" @click="handleDelete(plant.id)">Supprimer</button>
    </li>
  </ul>
</template>