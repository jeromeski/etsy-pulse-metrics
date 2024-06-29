// **React Imports
import { ReactElement, ReactNode } from "react";

// **Next Imports
import type { AppProps } from "next/app";
import { NextPage } from "next";

// **Mui Imports

// **Custom Imports

// **Vendor Imports
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// **Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import BlankLayout from 'src/templates/blank-layout'

// **Global Styles Imports
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import themeConfig from 'src/configs/themeConfig'

import { Settings } from 'src/@core/theme/ThemeComponent'
import { Toaster } from 'react-hot-toast'

const clientSideEmotionCache = createEmotionCache()

type ExtendedAppProps = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
  }
  emotionCache: EmotionCache
}

const themeConfigMode = themeConfig.mode

const themeSettings: Settings = {
  themeColor: 'primary',
  themeConfig: themeConfig,
  mode: themeConfigMode
}

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: ExtendedAppProps) {
  const getLayout = Component.getLayout ?? ((page: any) => <BlankLayout>{page}</BlankLayout>)
  return (
    <CacheProvider value={emotionCache}>
      <ThemeComponent settings={themeSettings}>
        <Toaster position='top-right' toastOptions={{ className: 'react-hot-toast', duration: 3 }} />
        {getLayout(<Component {...pageProps} />)}
      </ThemeComponent>
    </CacheProvider>
  )
}
