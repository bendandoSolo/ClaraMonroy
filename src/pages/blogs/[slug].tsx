import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogDetailsArea from "@containers/blog-details";
// import BlogAuthor from "@containers/blog-details/blog-author";
import BlogNavLinks from "@containers/blog-details/nav-links";
import DisqusComment from "@components/disqus-comment";
import BlogSidebar from "@containers/blog-details/blog-sidebar";

import { getStoryblokApi } from "@storyblok/react";  // , storyblokEditable

import { IBlog } from "@utils/types";
import { toCapitalize } from "@utils/methods";
import {
    getPostBySlug,
    getAllBlogs,
    getPrevNextPost,
    getStoryBlokBlogs,
    getStoryBlokRecentPosts,
    // getTags,
} from "../../lib/blog";

// type TcutdownBlog = {
//     title: string;
//     postedAt: string;
//     // image: string;
//     image: { src: string };
//     excerpt: string;
// };
type BlogImage = {
    filename: string;
}
type BlogContent = {
    title: string;
    postedAt: string;
    image: BlogImage;
    excerpt: string;
}
type BlogModel = {
    content: BlogContent
};


type TProps = {
    data: {
        blog: IBlog;
        prevAndNextPost: {
            prevPost: IBlog;
            nextPost: IBlog;
        };
        recentPosts: IBlog[];
        // tags: BlogMetaType[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const BlogDetails: PageProps = ({
    data: { blog, prevAndNextPost, recentPosts},
}) => {
    return (
        <>
            <SEO
                title={toCapitalize(blog.title)}
                description="This is a mighty good description of this blog."
                jsonLdType="article"
                article={{
                    publishedTime: blog.postedAt,
                    modifiedTime: blog.postedAt,
                    // tags: tags.map((tag) => tag.title),
                }}
                image={`https://maxcoach-react.pages.dev${blog.image.src}`}
            />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    {
                        path: "/blogs/blog-grid-sidebar",
                        label: "blogs",
                    },
                ]}
                currentPage={blog.title}
                title="Blog"
            />
            <p>{JSON.stringify(blog)}</p>
            <h5>blog page...[slug...]</h5>
            <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] tw-grid tw-grid-cols-3 tw-gap-7.5 lg:tw-gap-15">
                <div className="tw-col-span-full lg:tw-col-[1/3]">
                    <BlogDetailsArea {...blog} />
                    <BlogNavLinks {...prevAndNextPost} />
                    <DisqusComment id={blog.slug} title={blog.title} />
                </div>
                <div className="tw-col-span-full lg:tw-col-[3/-1]">
                    <BlogSidebar recentPosts={recentPosts}  />
                </div>
            </div>
        </>
    );
};

BlogDetails.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const { blogs } = getAllBlogs(["slug"]);
    return {
        paths: blogs.map(({ slug }) => {
            return {
                params: {
                    slug,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: {
        slug: string;
    };
};

export const getStaticProps = async ({ params }: Params) => {

    // we need to get the storyblok data here...
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-useless-concat
    // const  { data } : {data: {stories: BlogModel[]}} = await getStoryblokApi().get(`cdn/stories/blog/${params.slug}`, {
    //     version: "draft", // or 'published'
    //     // is_startpage: false
    //   });

    // console.log(data, JSON.stringify(data));

    // get all blogs
    const  { data } : {data: {stories: BlogModel[]}} = await getStoryblokApi().get(`cdn/stories`, {
        version: "draft", // or 'published'
        starts_with: 'blog/',
        // is_startpage: false
      });

    // get blog by slug....


    const blog = getPostBySlug(params.slug, "all");
    console.log(blog, JSON.stringify(blog));

    const prevAndNextPost = getPrevNextPost(params.slug, [
        "title",
        "image",
        "slug",
    ]);

    const { blogs, count } = getStoryBlokBlogs(data.stories);

    const recentPosts = getStoryBlokRecentPosts(blogs, count < 5 ? count : 5 );

   // const { blogs: recentPosts } = getAllBlogs(["title"], 0, 5);
    // const tags = getTags();

    return {
        props: {
            data: {
                blog,
                prevAndNextPost,
                recentPosts,
                // tags,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default BlogDetails;
