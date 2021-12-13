import type {
  Uid,
  User,
  CreateUserDto
} from 'models/index'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from 'lib/firebase'

const usersCollection = 'users'

export default class UserRepository {
  async findById(userId: Uid): Promise<User | undefined> {
    const userSnapshot = await getDoc(doc(db, usersCollection, userId))
    if (!userSnapshot.exists()) {
      return
    }
    const user = userSnapshot.data() as User
    return user
  }

  async create(uid: Uid, dto: CreateUserDto) {
    await setDoc(doc(db, usersCollection, uid), dto)

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
