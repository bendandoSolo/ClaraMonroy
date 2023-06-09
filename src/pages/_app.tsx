import SEO from "@components/seo/deafult-seo";
import FallbackLayout from "@layout/fallback";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ElementType, useEffect } from "react";

import "@assets/css/font-awesome.min.css";
import "@assets/css/font-linea.css";
import "@assets/css/fonts.css";
import "@assets/css/swiper.css";
import "@assets/css/tailwind.css";
import "@assets/css/contact-form-animations.css";

// eslint-disable-next-line import/no-extraneous-dependencies
import { storyblokInit, apiPlugin } from "@storyblok/react";

import { UIProvider } from "../contexts/ui-context";
// import { UserProvider } from "../contexts/user-context"; maybe useful later


import Feature from "../storyblok/Feature.js";
import Grid from "../storyblok/Grid.js";
import Page from "../storyblok/Page.js";
import Teaser from "../storyblok/Teaser.js";
 
const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
};

storyblokInit({
  accessToken: "baAvqHAR7V25EUZ81m933gtt",
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
  components
});


interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: AppProps["Component"] & { Layout: ElementType };
    pageProps: {
        [key: string]: unknown;
    };
}

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
    const router = useRouter();
    const Layout = Component.Layout || FallbackLayout;
    const layoutProps =
        typeof pageProps.layout === "object" ? pageProps.layout : {};

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
    }, [router]);

    useEffect(() => {
        document.body.className = (pageProps.className as string) || "";
    });

    return (
        <UIProvider>
             {/* <UserProvider> */}
                
                <Layout {...layoutProps}>
                    <SEO />
                    <Component {...pageProps} />
                </Layout>
        {/* </UserProvider> */}
        </UIProvider>
    );
};

export default MyApp;

