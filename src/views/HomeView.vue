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
  <div class="page-header">
    <h1>Mes plantes</h1>
    <RouterLink to="/plants/new" class="btn-link">+ Ajouter une plante</RouterLink>
  </div>

  <p v-if="isLoading" class="muted">Chargement…</p>
  <p v-else-if="errorMessage" role="alert">{{ errorMessage }}</p>
  <p v-else-if="plants.length === 0" class="muted">Aucune plante pour l'instant.</p>

  <ul v-else class="plant-list">
    <li v-for="plant in plants" :key="plant.id" class="plant-card">
      <div class="plant-info">
        <strong>{{ plant.name }}</strong>
        <span class="species">{{ plant.speciesCommonName }}</span>
        <span class="muted">
          Arrosage tous les {{ plant.wateringFrequencyDays }} jours — dernier le
          {{ new Date(plant.lastWateredAt).toLocaleDateString() }}
        </span>
      </div>
      <div class="plant-actions">
        <RouterLink :to="`/plants/${plant.id}/edit`" class="btn-secondary-link"
          >Modifier</RouterLink
        >
        <button type="button" class="btn-danger" @click="handleDelete(plant.id)">Supprimer</button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin: 0;
}

.btn-link {
  background-color: var(--color-primary);
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.1rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.btn-link:hover {
  background-color: var(--color-primary-hover);
}

.muted {
  color: var(--color-text-muted);
}

.plant-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.plant-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.plant-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.species {
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 600;
}

.plant-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.btn-secondary-link {
  color: var(--color-text-muted);
  text-decoration: none;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 0.5rem 0.9rem;
  font-size: 0.85rem;
}

.btn-secondary-link:hover {
  background-color: var(--color-bg);
}
</style>
