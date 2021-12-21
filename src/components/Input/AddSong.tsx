import React from 'react'
import { serverTimestamp, increment } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import type { CreateSongDto, Uid } from 'models/index'
import SongRepository from 'db/SongRepository'
import UserRepository from 'db/UserRepository'
import { useRecoilState } from 'recoil'
import { userState } from 'atoms/index'

interface Props {
  userId: Uid
}

const AddSong: React.FC<Props> = ({ userId }) => {
  const songRepository = new SongRepository()
  const userRepository = new UserRepository()
  const [user, setUser] = useRecoilState(userState)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const onSubmit = async (formInput: CreateSongDto) => {
    const dto = {
      ...formInput,
      createdAt: serverTimestamp(),
      key: Number(formInput.key),
      updatedAt: serverTimestamp()
    }
    if (!dto.title) {
      console.log('no title')
      return
    }
    await songRepository.create(userId, dto)
    await userRepository.update(userId, {
      repertory: increment(1),
      updatedAt: serverTimestamp()
    })
    const foundUser = await userRepository.findById(userId)
    setUser(foundUser)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box alignItems="center" px={2}>
        <Text fontSize="xl" textAlign="center" my={2}>持ち曲を追加する</Text>
          <FormControl>
            <Box alignItems="center" mb={4}>
              <FormLabel w={100} htmlFor="title">
                曲名
              </FormLabel>
              <Input
                id="title"
                placeholder="エンヴィキャットウォーク"
                {...register('title')}
              />
            </Box>
          </FormControl>
          <FormControl>
            <Box alignItems="center" mb={4}>
              <FormLabel w={100} htmlFor="artist">
                アーティスト
              </FormLabel>
              <Input
                id="artist"
                placeholder="トーマ"
                {...register('artist')}
              />
            </Box>
          </FormControl>
          <FormControl>
            <Box alignItems="center" mb={4}>
              <FormLabel w={100} htmlFor="key">
                キー
              </FormLabel>
              <Input
                id="key"
                placeholder="+3"
                {...register('key')}
              />
            </Box>
          </FormControl>
          <Button
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
            display="flex"
          >
            <AddIcon mb="3px" />
            <Text ml={2}>追加する</Text>
          </Button>
        </Box>
      </form>
    </>
  )
}

export default AddSong
