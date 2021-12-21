import React, { useMemo } from 'react'
import { serverTimestamp, increment } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import type { CreateSongDto, CreateTagDto, Tag, Uid } from 'models/index'
import TagRepository from 'db/TagRepository'
import UserRepository from 'db/UserRepository'
import { useRecoilState } from 'recoil'
import { userState } from 'atoms/index'

interface Props {
  userId: Uid
  tags: Tag['label'][]
}

const AddSong: React.FC<Props> = ({ userId, tags }) => {
  const tagRepository = new TagRepository()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm()
  const toast = useToast()

  const labelValidation = (label: string) => {
    if (!label) {
      return 'カテゴリーを入力してください'
    }
    if (tags.includes(label)) {
      return 'すでに追加済みのカテゴリーです'
    }
    return
  }

  const onSubmit = async (formInput: CreateTagDto) => {
    const dto = {
      ...formInput,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    if (!dto.label) {
      console.log('no label')
      return
    }
    if (tags.includes(dto.label)) {
      console.log('already in tags')
      return
    }
    await tagRepository.create(userId, dto)
    reset()
    toast({
      title: 'タグを登録しました',
      status: 'success',
      duration: 3000,
      position: 'top',
      isClosable: true
    })
  }

  return (
    <Box alignItems="center" px={2} mb="64px">
      <Text fontSize="xl" textAlign="center" my={2}>カテゴリーを追加する</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <FormControl isInvalid={errors.label}>
          <Box alignItems="center" mb={4}>
            <FormLabel w={100} htmlFor="label">カテゴリー</FormLabel>
            <Input
              id="label"
              placeholder="ボカロ"
              {...register('label', {
                validate: value => labelValidation(value)
              })}
            />
            <FormErrorMessage>
              {errors.label && errors.label.message}
            </FormErrorMessage>
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
