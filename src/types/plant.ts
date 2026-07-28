export interface Plant {
  id: number
  name: string
  wateringFrequencyDays: number
  lastWateredAt: string
  photo: string | null
  notes: string | null
  acquiredAt: string
  speciesId: number
  speciesCommonName: string
  speciesLatinName: string
  createdAt: string
  updatedAt: string
}

export interface PlantPayload {
  name: string
  wateringFrequencyDays: number
  lastWateredAt: string
  acquiredAt: string
  photo?: string | null
  notes?: string | null
  species: string
}
