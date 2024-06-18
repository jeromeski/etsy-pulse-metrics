// **React Imports
import { ReactElement, ReactNode } from "react";

// **Next Imports
import type { AppProps } from "next/app";
import { NextPage } from "next";

// **Mui Imports
import { ThemeProvider } from "@mui/material";

// **Custom Imports
import defaultTheme from "@/theme";

// **Vendor Imports
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// **Utils Imports
import { createEmotionCache } from "@/utils/createEmotionCache";
import BlankLayout from "@/templates/blank-layout";

// **Global Styles Imports
import "@/styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

type ExtendedAppProps = AppProps & {
	Component: NextPage & {
		getLayout?: (page: ReactElement) => ReactNode;
	};
	emotionCache: EmotionCache;
};

export default function App({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps
}: ExtendedAppProps) {
	const getLayout = Component.getLayout ?? ((page: any) => <BlankLayout>{page}</BlankLayout>);
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={defaultTheme}>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
		</CacheProvider>
	);
}
