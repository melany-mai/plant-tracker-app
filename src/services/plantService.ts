import { authorizedRequest } from './apiClient'
import type { Collection } from '@/types/api'
import type { Plant, PlantPayload } from '@/types/plant'

export function getPlants() {
  return authorizedRequest<Collection<Plant>>('/api/plants')
}

export function getPlant(id: number) {
  return authorizedRequest<Plant>(`/api/plants/${id}`)
}

export function createPlant(payload: PlantPayload) {
  return authorizedRequest<Plant>('/api/plants', { method: 'POST', body: payload })
}

export function updatePlant(id: number, payload: PlantPayload) {
  return authorizedRequest<Plant>(`/api/plants/${id}`, { method: 'PUT', body: payload })
}

export function deletePlant(id: number) {
  return authorizedRequest<void>(`/api/plants/${id}`, { method: 'DELETE' })
}