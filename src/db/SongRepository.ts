import type {
  Uid,
  CreateSongDto
} from 'models/index'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from 'lib/firebase'

const usersCollection = 'users'
const songsCollection = 'songs'

export default class SongRepository {
  async create(userId: Uid, dto: CreateSongDto) {
    await addDoc(collection(db, usersCollection, userId, songsCollection), dto)
  }

  // async update(
  //   menheraUserId: MenheraUserId,
  //   updateMenheraUserDto: UpdateMenheraUserDto
  // ): Promise<MenheraUser | void> {
  //   await db
  //     .collection('menheraUsers')
  //     .doc(menheraUserId)
  //     .update(updateMenheraUserDto)
  // }
}
