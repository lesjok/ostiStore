export interface IProduct {
  category?: string
  description?: string
  id: number
  image: string
  price: number
  title: string
}

export interface IUser {
  email: string | null
  uid: string
}

export interface IFormValues {
  email: string
  password: string
}

export interface IHistory {
  id: string
  url: string
  query: string
}
