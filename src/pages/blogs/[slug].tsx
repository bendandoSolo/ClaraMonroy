import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogDetailsArea from "@containers/blog-details";
// import BlogAuthor from "@containers/blog-details/blog-author";
// import BlogNavLinks from "@containers/blog-details/nav-links";
// import DisqusComment from "@components/disqus-comment";
import BlogSidebar from "@containers/blog-details/blog-sidebar";

import { getStoryblokApi } from "@storyblok/react";  // , storyblokEditable

// import { CollectionPageJsonLd } from "next-seo";

import { IBlog, BlogImage, BlogModel, StoryblokImage } from "@utils/types";
import { toCapitalize } from "@utils/methods";

import {
    // getAllBlogs,
    getPrevNextPost,
    getStoryBlokBlogs,
    getStoryBlokRecentPosts,
    // getStoryBlokBlogs,
    // getStoryBlokRecentPosts,
    // getTags,
} from "../../lib/blog";

// type NewType = {
//     title: string;
//     postedAt: string;
//     image: BlogImage;
//     excerpt: string;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     content: any;
// };

// type BlogContent = NewType
// type BlogModel = {
//     content: BlogContent;
//     slug: string;
// };

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
    data: { blog, recentPosts}, // prevAndNextPost, 
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
                image={blog.image.src}
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
            <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] tw-grid tw-grid-cols-3 tw-gap-7.5 lg:tw-gap-15">
                <div className="tw-col-span-full lg:tw-col-[1/3]">
                    <BlogDetailsArea {...blog} />
                    {/* <BlogNavLinks {...prevAndNextPost} /> */}
                    {/* <DisqusComment id={blog.slug} title={blog.title} /> */}
                </div>
                <div className="tw-col-span-full lg:tw-col-[3/-1]">
                    <BlogSidebar recentPosts={recentPosts}  />
                </div>
            </div>
        </>
    );
};

BlogDetails.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const  { data } : {data: {stories: BlogModel[]}} = await getStoryblokApi().get(`cdn/stories`, {
        version: "published", // or 'published'
        starts_with: 'blog/',
        // is_startpage: false
      });
    
    const storyblokBlogPaths = {
    paths: data.stories.map(({ slug }) => {
        return {
            params: {
                slug,
            },      
        };  
    }), 
    fallback: false,
    };

    // const { blogs } = getAllBlogs(["slug"]);
    // const params = {
    //     paths: blogs.map(({ slug }) => {
    //         return {
    //             params: {
    //                 slug,
    //             },
    //         };
    //     }),
    //     fallback: false,
    // };

    return storyblokBlogPaths;
};

type Params = {
    params: {
        slug: string;
    };
};

type BlogContent2 = {  
image : BlogImage,
title: string,
postedAt: string,
content: unknown,
}

const getStoryblokPostBySlug = (slug: string, blogs: BlogModel[]): BlogContent2 | void => {
    const storyBlockImageToBlogImage = (image: StoryblokImage): BlogImage => {
        return {
            src: image.filename,
        };
    };
    
    const blog = blogs.find((b) => b.slug === slug);

    if (blog) {
        const blogContent: BlogContent2 = {
            title: blog.content.title,
            postedAt: blog.first_published_at,
            image: storyBlockImageToBlogImage(blog.content.image),
            content: blog.content.content,
        };
        return blogContent;
    }
}

export const getStaticProps = async ({ params }: Params) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const  { data } : {data: {stories: BlogModel[]}} = await getStoryblokApi().get(`cdn/stories`, {
        version: "published", // or 'published'
        starts_with: 'blog/',
        // is_startpage: false
      });
      const blog =  getStoryblokPostBySlug(params.slug, data.stories);

    const prevAndNextPost = getPrevNextPost(params.slug, [
        "title",
        "image",
        "slug",
    ]);

          const { blogs, count } = getStoryBlokBlogs(data.stories);
     
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const recentPosts = getStoryBlokRecentPosts(blogs, count < 5 ? count : 5 );

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
