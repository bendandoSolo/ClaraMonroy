import type {  NextPage } from "next";  // GetStaticProps,
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-03";
import { IBlog,  BlogModel } from "@utils/types"; // , BlogImage, BlogContent, TcutdownBlog, , RecentPost
import { getStoryblokApi } from "@storyblok/react";  // , storyblokEditable
import { getStoryBlokBlogs, getStoryBlokRecentPosts } from "lib/blog";
// import { getAllBlogs } from "../../../lib/blog";

type TProps = {
    data: {
        blogs: IBlog[];
        recentPosts: IBlog[];
        // tags: BlogMetaType[];
        currentPage: number;
        numberOfPages: number;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 3;

const BlogClassic: PageProps = ({
    data: { blogs, recentPosts, currentPage, numberOfPages },
}) => {
    return (
        <>
            <SEO title="Blog Classic" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Blog Classic"
            />

            <h1>We need to change the text at the top and ensure the except is being displayed in a pretty way ideally</h1>
            {/* <p>{JSON.stringify(blogs)}</p> */}
            <BlogArea
                data={{
                    blogs,
                    recentPosts,
                    pagiData: {
                        currentPage,
                        numberOfPages,
                        rootPage: "blogs/blog-classic",
                    },
                }}
            />
        </>
    );
};

BlogClassic.Layout = Layout01;


export async function getStaticProps() {
// export async const getStaticProps: GetStaticProps = () => {

    // const tags = getTags();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const  { data } : {data: {stories: BlogModel[]}} = await getStoryblokApi().get(`cdn/stories`, {
          version: "published", // or 'published'
          starts_with: 'blog/',
          // is_startpage: false
        });

       //  console.log('data', data);


        const { blogs, count } = getStoryBlokBlogs(data.stories);    
        const recentPosts = getStoryBlokRecentPosts(blogs, count < 5 ? count : 5 ); 

    return {
        props: {
            data: {
                blogs,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                recentPosts,
                // tags,
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
}

export default BlogClassic;
