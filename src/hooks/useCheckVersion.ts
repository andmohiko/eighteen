import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { userState } from 'atoms'
import { remoteConfig } from 'lib/firebase'
import { fetchAndActivate, getValue } from 'firebase/remote-config'

export const useCheckVersion = () => {
  const [currentVersion, setCurrentVersion] = useState('')
  const getLatestVersion = async () => {
    await fetchAndActivate(remoteConfig)
        .then(() => {
          const latestVersion = getValue(remoteConfig, 'latestVersion')
          // @ts-ignore
          setCurrentVersion(latestVersion._value)
        })
        .catch((error) => {
          console.log(error)
        })
  }
  useEffect(() => {
    console.log('ucv useeffet')
    getLatestVersion()
  }, [])
  return {
    currentVersion
  }
}
