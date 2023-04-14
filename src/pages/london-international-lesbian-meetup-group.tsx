import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import HeroArea from "@containers/hero/layout-07-01";
// import TimelineArea from "@containers/timeline";
import CtaArea from "@containers/cta/layout-01";
import GalleryArea from "@containers/gallery";
import FaqArea from "@containers/faq/layout-02";

import { normalizedData } from "@utils/methods";
import AlternatingTextBlocks from "@containers/alternating-text-blocks";
import { getPageData } from "../lib/page";

interface PageContent {
    section: string;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const LondonInternationalLesbianMeetupGroup : PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");
    return (
        <>
            <SEO title="London Lesbian Meetup Group" />
            <h1 className="tw-sr-only">London Lesbian Meetup Group</h1>
            <HeroArea data={content?.["hero-area"]} />
            <AlternatingTextBlocks data={content?.["timeline-area"]} />
            <CtaArea data={content?.["cta-area"]} space="bottom" />
            {/* <GalleryArea data={content?.["gallery-area"]} />
            <FaqArea data={content?.["faq-area"]} /> */}
        </>
    );
};

LondonInternationalLesbianMeetupGroup.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "meetup-group");

    return {
        props: {
            data: {
                page,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default LondonInternationalLesbianMeetupGroup;
