import type {
  Uid,
  CreateTagDto
} from 'models/index'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from 'lib/firebase'

const usersCollection = 'users'
const tagsCollection = 'tags'

export default class TagRepository {
  async create(userId: Uid, dto: CreateTagDto) {
    await addDoc(collection(db, usersCollection, userId, tagsCollection), dto)
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
