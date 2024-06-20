// **React Imports
import { ReactElement, ReactNode } from "react";

// **Next Imports
import type { AppProps } from "next/app";
import { NextPage } from "next";

// **Mui Imports
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// **Custom Imports
// import defaultTheme from "@/theme";

// **Vendor Imports
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// **Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import BlankLayout from 'src/templates/blank-layout'

// **Global Styles Imports
import "@/styles/reset.css";
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import themeConfig from 'src/configs/themeConfig'

const clientSideEmotionCache = createEmotionCache()

type ExtendedAppProps = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
  }
  emotionCache: EmotionCache
}

const themeConfigMode = themeConfig.mode

const themeSettings = {
  themeColor: 'primary',
  themeConfig: themeConfig,
  mode: themeConfigMode
}

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: ExtendedAppProps) {
  const getLayout = Component.getLayout ?? ((page: any) => <BlankLayout>{page}</BlankLayout>)
  return (
    <CacheProvider value={emotionCache}>
      <ThemeComponent settings={themeSettings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
    </CacheProvider>
  )
}
