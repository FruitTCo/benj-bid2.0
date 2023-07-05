// import '@/styles/globals.css'
import React from 'react'
import Loader from '/components/Loader'
import { useRouter } from 'next/router'
import Wrapper from '@/components/Wrapper'
import { NextAuthProvider } from './providers'

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true)
    }

    const handleRouteChangeComplete = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])

  return <>{loading ? <Loader /> : <NextAuthProvider session={session}><Wrapper><Component {...pageProps} /></Wrapper></NextAuthProvider>}</>
}
