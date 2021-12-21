import type {
  Uid,
  User,
  CreateUserDto,
  UpdateUserDto
} from 'models/index'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from 'lib/firebase'

const usersCollection = 'users'

export default class UserRepository {
  async findById(userId: Uid): Promise<User | undefined> {
    const userSnapshot = await getDoc(doc(db, usersCollection, userId))
    if (!userSnapshot.exists()) {
      return
    }
    const user = userSnapshot.data() as User
    return {
      ...user,
      userId
    }
  }

  async create(uid: Uid, dto: CreateUserDto) {
    await setDoc(doc(db, usersCollection, uid), dto)
  }

  async update(
    userId: Uid,
    updateUserDto: UpdateUserDto
  ): Promise<void> {
    await updateDoc(doc(db, usersCollection, userId), updateUserDto)
  }
}
