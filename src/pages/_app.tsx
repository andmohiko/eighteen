import App from 'next/app'
import type { AppProps, AppContext } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import HeadComponent from 'components/Head'

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: () => ({
        dialog: {
          maxWidth: ['72%', '72%', '72%']
        }
      })
    }
  }
})

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <HeadComponent></HeadComponent>
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ChakraProvider>
    </>
  )
}

export default MyApp
