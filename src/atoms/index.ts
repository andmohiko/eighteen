import { atom } from 'recoil'
import { User } from 'models/index'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userState = atom<User>({
  key: 'user',
  default: null,
  effects_UNSTABLE: [persistAtom]
})
