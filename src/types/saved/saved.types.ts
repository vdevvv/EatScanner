export type Saved = {
  id: string
  name: string
  image: string
  video: string
  highlighted: boolean
  restaurant: {
    id: string
    name: string
    city: string
    country: string
  }
}
