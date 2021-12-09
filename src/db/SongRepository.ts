import type {
  Uid,
  CreateSongDto
} from 'models/index'
import { collection, addDoc } from 'firebase/firestore'
import { db } from 'lib/firebase'

export default class SongRepository {
  // async findById(userId: Uid): Promise<User> {
  //   const userSnapshot = await db.collection('users').doc(userId).get()
  //   return userSnapshot
  // }

  async create(userId: Uid, dto: CreateSongDto) {
    await addDoc(collection(db, 'users', userId, 'songs'), dto)
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
