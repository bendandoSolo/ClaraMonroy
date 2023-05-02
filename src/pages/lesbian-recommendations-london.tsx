/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Head from "next/head"
import { getStoryblokApi, StoryblokComponent } from "@storyblok/react"

type SbParamsType = {
    version: "draft" | "published" | undefined,
    // resolve_relations: string[],
  };
   

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NewType = any;

const LesbianRecommendationsLondon = ({ story }: NewType ) : JSX.Element => {
// export default function Home(props) {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
 
      <header>
        <p>{JSON.stringify(story)}</p>
        <h1>
          { story.name ? story.name : 'My Site' }
        </h1>
      </header>
      <StoryblokComponent blok={story.content} />

    </div>
  )
}
 
export async function getStaticProps() {
  // home is the default slug for the homepage in Storyblok
const slug = "lesbian-recommendations-london";
 
  // load the draft version
  const sbParams : SbParamsType = {
    version: "draft", // or 'published'
  };
 
  const storyblokApi = getStoryblokApi();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      story: data ? data.story : false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      key: data ? data.story.id : false,
    },
    revalidate: 3600, // revalidate every hour
  };
}



// import type { GetStaticProps, NextPage } from "next";
// import SEO from "@components/seo/page-seo";
// import Layout from "@layout/layout-01";
// import HeroArea from "@containers/hero/layout-08";
// // import TimelineArea from "@containers/timeline";
// // import CtaArea from "@containers/cta/layout-01";
// // import GalleryArea from "@containers/gallery";
// // import FaqArea from "@containers/faq/layout-02";

// import { normalizedData } from "@utils/methods";
// // import TheLesbitutePodcast from "@components/lesbitute-podcast";
// import { getPageData } from "../lib/page";

// interface PageContent {
//     section: string;
// }

// type TProps = {
//     data: {
//         page: {
//             content: PageContent[];
//         };
//     };
// };

// type PageProps = NextPage<TProps> & {
//     Layout: typeof Layout;
// };

// const LesbianRecommendationsLondon: PageProps = ({ data }) => {
//      const content = normalizedData<PageContent>(data.page?.content, "section");
//     return (
//         <div >
//             <SEO title="Lesbian Recommended Places London" />
//          <HeroArea data={content?.["hero-area"]} />
//             <h1 className="tw-sr-only">The Lesbitute Podcast</h1>
//             {/* <TheLesbitutePodcast />  */}
//             {/* <HeroArea data={content?.["hero-area"]} />
//             <TimelineArea data={content?.["timeline-area"]} />
//             <CtaArea data={content?.["cta-area"]} space="bottom" />
//             <GalleryArea data={content?.["gallery-area"]} />
//             <FaqArea data={content?.["faq-area"]} /> */}
//         </div>
//     );
// };

// LesbianRecommendationsLondon.Layout = Layout;

// export const getStaticProps: GetStaticProps = () => {
//     const page = getPageData("inner", "lesbitute-podcast");
//     return {
//         props: {
//             data: {
//                 page,
//             },
//             layout: {
//                 headerShadow: true,
//                 headerFluid: false,
//                 footerMode: "light",
//             },
//         },
//     };
// };

export default LesbianRecommendationsLondon;

