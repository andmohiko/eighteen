import type {
  Uid,
  CreateSongDto,
  Song
} from 'models/index'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from 'lib/firebase'

const usersCollection = 'users'
const songsCollection = 'songs'

export default class SongRepository {
  async findAll(userId: Uid): Promise<Song[]> {
    const songsSnapshot = await getDocs(collection(db, usersCollection, userId, songsCollection))
    const songs = songsSnapshot.docs.map((doc) => {
      return doc.data() as Song
    })
    return songs
  }

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
