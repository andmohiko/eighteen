import { FieldValue } from "firebase/firestore"

export type Uid = string

export type DocumentId = string

export type User = {
  userId: Uid
  bestScore: Score[]
  createdAt: Date
  repertory: number
  updatedAt: Date
  username: string
}

export type CreateUserDto = {
  bestScore: User['bestScore']
  createdAt: FieldValue
  repertory: User['repertory']
  updatedAt: FieldValue
  username: User['username']
}

export type UpdateUserDto = {
  bestScore?: User['bestScore']
  repertory?: FieldValue
  updatedAt: FieldValue
  username?: User['username']
}

export type CreateUserForm = {
  username: User['username']
}

export type Score = {
  model: string
  points: number
}

export type Song = {
  songId: DocumentId
  artist: string
  bestScore: Score
  createdAt: Date
  key: number
  title: string
  updatedAt: Date
}

export type CreateSongDto = {
  artist: Song['artist']
  bestScore?: Song['bestScore']
  createdAt: FieldValue
  key: Song['key']
  title: Song['title']
  updatedAt: FieldValue
}

export type Tag = {
  tagId: DocumentId
  createdAt: Date
  label: string
  updatedAt: Date
}