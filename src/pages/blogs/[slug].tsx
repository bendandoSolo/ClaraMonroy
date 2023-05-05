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

import { IBlog } from "@utils/types";
import { toCapitalize } from "@utils/methods";
import {
   // getPostBySlug,
    getAllBlogs,
    getPostBySlug,
    // getPostBySlug,
    getPrevNextPost,
    getStoryBlokBlogs,
    getStoryBlokRecentPosts,
    // getStoryBlokBlogs,
    // getStoryBlokRecentPosts,
    // getTags,
} from "../../lib/blog";
import { CollectionPageJsonLd } from "next-seo";

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
type NewType = {
    title: string;
    postedAt: string;
    image: BlogImage;
    excerpt: string;
    content: any;
};

type BlogContent = NewType
type BlogModel = {
    content: BlogContent;
    slug: string;
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

    console.log('data', JSON.stringify(data));

    // const { blogs } = getStoryblokBlogPaths(["slug"]);
    
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

    console.log('--------------------------------------------');
    console.log('storyblokBlogPaths', JSON.stringify(storyblokBlogPaths));
    console.log('--------------------------------------------');

    const { blogs } = getAllBlogs(["slug"]);
    const params = {
        paths: blogs.map(({ slug }) => {
            return {
                params: {
                    slug,
                },
            };
        }),
        fallback: false,
    };

    console.log('--------------------------------------------');
    console.log('params', JSON.stringify(params));
    console.log('--------------------------------------------');

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
content: string,
}


const getStoryblokPostBySlug = (slug: string, blogs: BlogModel[]): BlogContent2 | void => {

    console.log(slug);

    const blog = blogs.find((b) => b.slug === slug);

    if (blog) {
        const blogContent: BlogContent2 = {
            title: blog.content.title,
            postedAt: blog.content.postedAt,
            image: blog.content.image,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            content: blog.content.content,
        };
        return blogContent;
    }
}


export const getStaticProps = async ({ params }: Params) => {

    console.log('params', params);

    // we need to get the storyblok data here...
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-useless-concat
    // const  { data } : {data: {stories: BlogModel[]}} = await getStoryblokApi().get(`cdn/stories/blog/${params.slug}`, {
    //     version: "draft", // or 'published'
    //     // is_startpage: false
    //   });

    // console.log(data, JSON.stringify(data));

    // get all blogs
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const  { data } : {data: {stories: BlogModel[]}} = await getStoryblokApi().get(`cdn/stories`, {
        version: "published", // or 'published'
        starts_with: 'blog/',
        // is_startpage: false
      });
   
     console.log('data', JSON.stringify(data));

      const blog =  getStoryblokPostBySlug(params.slug, data.stories);

     // const blogWeWant =  getStoryblokPostBySlug("test", data.stories);
     // console.log('blogWeWant', JSON.stringify(blogWeWant));

    const prevAndNextPost = getPrevNextPost(params.slug, [
        "title",
        "image",
        "slug",
    ]);

          const { blogs, count } = getStoryBlokBlogs(data.stories);
     
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const recentPosts = getStoryBlokRecentPosts(blogs, count < 5 ? count : 5 );

     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    
     console.log('params.slug', params.slug) 

    // const blog = getPostBySlug(params.slug, "all"); 
    // const {blogs: recentPosts } =  getAllBlogs(["title"], 0, 5);
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
