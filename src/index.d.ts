/**
 * Type info - copied from API documentation
 */
interface Info {
  count: number
  pages: number
  next: number
  prev: number
}

interface LocationType {
  id: string
  name: string
  type: string
  dimension: string
  residents: [CharacterType]
  created: string
}

interface CharacterType {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: LocationType
  location: LocationType
  image: string
  episode: [EpisodeType]
  created: string
}

interface EpisodeType {
  id: string
  name: string
  air_date: string
  episode: string
  characters: [CharacterType]
  created: string
}

/**
 * Result object types
 */
interface Locations {
  locations: {
    info: Info
    results: [LocationType]
  }
}

interface Characters {
  characters: {
    info: Info
    results: [CharacterType]
  }
}

interface Episodes {
  episodes: {
    info: Info
    results: [EpisodeType]
  }
}
