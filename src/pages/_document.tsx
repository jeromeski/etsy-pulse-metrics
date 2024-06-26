// **React Imports
import React, { ReactElement, Children } from "react";

// **Next Imports
import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps
} from "next/document";

// **Vendor Imports
import createEmotionServer from "@emotion/server/create-instance";

// **Utils Imports
import { createEmotionCache } from 'src/utils/createEmotionCache'

// DEFINE custom MyDocumentProps extending DocumentInitialProps and adding styles property
type MyDocumentProps = DocumentInitialProps & {
	styles: ReactElement[];
};

// DEFINE MyDocument class extending Document
class MyDocument extends Document<MyDocumentProps> {
	// DEFINE static async method getInitialProps(ctx)
	static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
		// CHECK typeof if renderPage is a function
		if (typeof ctx.renderPage !== "function") {
			throw new Error("ctx.renderPage is not a function");
		}
		// STORE original page render method from ctx
		const originalRenderPage = ctx.renderPage;
		// CREATE Emotion cache
		const cache = createEmotionCache();
		// EXTRACT critical CSS chunks method from Emotion server using cache
		const { extractCriticalToChunks } = createEmotionServer(cache);
		// OVERRIDE ctx.renderPage to enhance the App component
		ctx.renderPage = () =>
			// USE original render method
			originalRenderPage({
				// ENHANCE App component to include emotionCache prop
				enhanceApp: (App) =>
					function EnhanceApp(props: any) {
						return <App {...props} emotionCache={cache} />;
					}
			});
		// GET initial document props using Document.getInitialProps(ctx)
		const initialProps = await Document.getInitialProps(ctx);
		// EXTRACT critical CSS chunks from initial props HTML
		const emotionStyles = extractCriticalToChunks(initialProps.html);
		// CREATE style tags from extracted CSS chunks
		const emotionStyleTags = emotionStyles.styles.map((style) => (
			<style
				key={style.key}
				dangerouslySetInnerHTML={{ __html: style.css }}
				data-emotion={`${style.key} ${style.ids.join(" ")}`}
			/>
		));
		const combinedStyles: ReactElement[] = [
			...Children.toArray(initialProps.styles).filter((child): child is ReactElement =>
				React.isValidElement(child)
			),
			...emotionStyleTags
		];
		// RETURN initial props combined with new Emotion style tags
		return {
			...initialProps,
			styles: combinedStyles
		};
		// END getInitialProps method
	}
	// DEFINE render method
	render(): ReactElement {
		// RETURN HTML structure
		return (
			<Html>
				<Head>
					{/* <link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						rel="stylesheet"
						href="http://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
					/> */}
					{/* INSERT styles in the Head */}
					{this.props.styles}
				</Head>
				{/* ORGANIZE body with Main and NextScript components */}
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
	// END render method
}

// EXPORT MyDocument class
export default MyDocument;
