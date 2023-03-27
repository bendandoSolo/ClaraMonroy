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

import { UIProvider } from "../contexts/ui-context";
// import { UserProvider } from "../contexts/user-context"; maybe useful later

interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: AppProps["Component"] & { Layout: ElementType };
    pageProps: {
        [key: string]: unknown;
    };
}

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
    const router = useRouter();
    const Layout = Component.Layout || FallbackLayout;
    const layoutProps = typeof pageProps.layout === "object" ? pageProps.layout : {};

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
    }, [router]);

    useEffect(() => {
        document.body.className = (pageProps.className as string) || "";
    });

    useEffect(() => {
        console.log("we are sailing");
        console.log("layoutProps", layoutProps);
    }, [layoutProps]);


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
