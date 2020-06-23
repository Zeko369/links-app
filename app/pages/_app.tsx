import { Head } from "blitz"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import Layout from "app/layouts"

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <title>Links app</title>
      </Head>
      <CSSReset />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
