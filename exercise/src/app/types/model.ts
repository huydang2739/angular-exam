export interface Image {
  imageUrl: string
  imageName: string
  like: number
  avatarUrl: string
  resolutiion: number
}

export interface QueryResult<T> {
  count: number
  items: Array<T>
}
