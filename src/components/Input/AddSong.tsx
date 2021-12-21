import React from 'react'
import { serverTimestamp, increment } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Text, useToast } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import type { CreateSongDto, Tag, Uid } from 'models/index'
import SongRepository from 'db/SongRepository'
import UserRepository from 'db/UserRepository'
import { useRecoilState } from 'recoil'
import { userState } from 'atoms/index'

interface Props {
  userId: Uid
  tags: Tag['label'][]
}

const AddSong: React.FC<Props> = ({ userId, tags }) => {
  const songRepository = new SongRepository()
  const userRepository = new UserRepository()
  const [user, setUser] = useRecoilState(userState)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm()
  const toast = useToast()

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
    reset()
    const foundUser = await userRepository.findById(userId)
    setUser(foundUser)
    toast({
      title: '持ち曲を登録しました',
      status: 'success',
      duration: 3000,
      position: 'top',
      isClosable: true
    })
  }

  return (
    <Box alignItems="center" px={2} mb="64px">
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <FormControl>
          <Box alignItems="center" mb={4}>
            <FormLabel w={100} htmlFor="tag">
              カテゴリー
            </FormLabel>
            <Select
              id="tag"
              {...register('tag')}
            >
              <option value={''}>{''}</option>
              {tags.map((tagLabel) => (
                <option key={tagLabel} value={tagLabel}>
                  {tagLabel}
                </option>
              ))}
            </Select>
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
      </form>
    </Box>
  )
}

export default AddSong
