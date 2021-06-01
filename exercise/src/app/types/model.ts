export interface Image {
  imageUrl: string
  imageName: string
  like: number
  avatarUrl: string
  resolution: number
}

export interface QueryResult<T> {
  count: number
  items: Array<T>
}
