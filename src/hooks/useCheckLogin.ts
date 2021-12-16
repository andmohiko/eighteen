import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil'
import { userState } from 'atoms'

export const useCheckLogin = () => {
  const user = useRecoilValue(userState)
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/register') return
    if (!user) {
      router.push('/register')
    }
  }, [router.pathname])
}
