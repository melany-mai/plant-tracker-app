import { authorizedRequest } from './apiClient'
import type { Collection } from '@/types/api'
import type { Species } from '@/types/species'

export function getSpecies() {
  return authorizedRequest<Collection<Species>>('/api/species')
}
