import { atom } from 'recoil'
import { User } from 'models/index'

export const userState = atom<User>({
  key: 'user',
  default: null
})
