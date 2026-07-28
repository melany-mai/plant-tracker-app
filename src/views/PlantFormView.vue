<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPlant, createPlant, updatePlant } from '@/services/plantService'
import { getSpecies } from '@/services/speciesService'
import { ApiError } from '@/services/httpClient'
import type { Species } from '@/types/species'

const props = defineProps<{ id?: string }>()

const isEditMode = computed(() => props.id !== undefined)

const name = ref('')
const wateringFrequencyDays = ref(7)
const lastWateredAt = ref('')
const acquiredAt = ref('')
const notes = ref('')
const speciesIri = ref('')
const speciesList = ref<Species[]>([])
const errorMessage = ref('')
const isSubmitting = ref(false)
const isLoading = ref(true)

const router = useRouter()

onMounted(async () => {
  try {
    const collection = await getSpecies()
    speciesList.value = collection.member

    if (isEditMode.value && props.id) {
      const plant = await getPlant(Number(props.id))
      name.value = plant.name
      wateringFrequencyDays.value = plant.wateringFrequencyDays
      lastWateredAt.value = plant.lastWateredAt.slice(0, 10)
      acquiredAt.value = plant.acquiredAt.slice(0, 10)
      notes.value = plant.notes ?? ''
      speciesIri.value = `/api/species/${plant.speciesId}`
    }
  } catch (error) {
    errorMessage.value =
      error instanceof ApiError ? error.message : 'Impossible de charger les données.'
  } finally {
    isLoading.value = false
  }
})

async function handleSubmit() {
  errorMessage.value = ''
  isSubmitting.value = true

  const payload = {
    name: name.value,
    wateringFrequencyDays: wateringFrequencyDays.value,
    lastWateredAt: new Date(lastWateredAt.value).toISOString(),
    acquiredAt: new Date(acquiredAt.value).toISOString(),
    notes: notes.value || null,
    species: speciesIri.value,
  }

  try {
    if (isEditMode.value && props.id) {
      await updatePlant(Number(props.id), payload)
    } else {
      await createPlant(payload)
    }
    router.push({ name: 'home' })
  } catch (error) {
    errorMessage.value = error instanceof ApiError ? error.message : 'Une erreur est survenue.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <p v-if="isLoading">Chargement…</p>

  <form v-else @submit.prevent="handleSubmit">
    <h1>{{ isEditMode ? 'Modifier la plante' : 'Ajouter une plante' }}</h1>

    <label>
      Nom
      <input v-model="name" type="text" required />
    </label>

    <label>
      Espèce
      <select v-model="speciesIri" required>
        <option value="" disabled>Choisir une espèce</option>
        <option
          v-for="species in speciesList"
          :key="species.id"
          :value="`/api/species/${species.id}`"
        >
          {{ species.commonName }} ({{ species.latinName }})
        </option>
      </select>
    </label>

    <label>
      Fréquence d'arrosage (jours)
      <input v-model.number="wateringFrequencyDays" type="number" min="1" required />
    </label>

    <label>
      Dernier arrosage
      <input v-model="lastWateredAt" type="date" required />
    </label>

    <label>
      Date d'acquisition
      <input v-model="acquiredAt" type="date" required />
    </label>

    <label>
      Notes
      <textarea v-model="notes"></textarea>
    </label>

    <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>

    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Enregistrement…' : 'Enregistrer' }}
    </button>
  </form>
</template>