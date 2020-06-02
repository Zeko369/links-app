import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import Layout from "app/layouts"

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CSSReset />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
