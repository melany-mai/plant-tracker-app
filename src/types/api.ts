export interface Collection<T> {
  '@context': string
  '@id': string
  '@type': string
  totalItems: number
  member: T[]
}
