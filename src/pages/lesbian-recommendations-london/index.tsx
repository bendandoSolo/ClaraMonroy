import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-01";
import { BlogModel, IBlog } from "@utils/types";
import {getStoryBlokBlogs } from "lib/blog";
import { getStoryblokApi } from "@storyblok/react";

type TProps = {
    data: {
        blogs: IBlog[];
        currentPage: number;
        numberOfPages: number;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 9;

const BlogGrid: PageProps = ({
    data: { blogs, currentPage, numberOfPages },
}) => {
    return (
        <>
            <SEO title="Gay and Lesbian Recommended Places London" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Gay and Lesbian Recommended Places London"
            />
            <BlogArea
                data={{
                    blogs,
                    pagiData: { currentPage, numberOfPages },
                }}
            />
        </>
    );
};

BlogGrid.Layout = Layout01;

export const getStaticProps: GetStaticProps = async () => {
    // const { blogs, count } = getAllBlogs(
    //     ["title", "image", "postedAt"],
    //     0,
    //     POSTS_PER_PAGE
    // );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const  { data } : {data: {stories: BlogModel[]}} = await getStoryblokApi().get(`cdn/stories`, {
        version: "published", // or 'published'
        starts_with: 'lesbian-recommendations-london/',
        // is_startpage: false
      });

       // eslint-disable-next-line no-console
       // console.log('data', data);

       const { blogs, count } = getStoryBlokBlogs(data.stories);    
       // const recentPosts = getStoryBlokRecentPosts(blogs, count < POSTS_PER_PAGE ? count : POSTS_PER_PAGE );

    return {
        props: {
            data: {
                blogs,
                currentPage: 1,
                numberOfPages: Math.ceil(count / POSTS_PER_PAGE),
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default BlogGrid;
