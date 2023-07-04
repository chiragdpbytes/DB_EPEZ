import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>Ek Ped Ek Zindagi</title>
      <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/images/favicon.ico" type="image/x-icon"></link>
    </Head> <Component {...pageProps} />
  </>
}
