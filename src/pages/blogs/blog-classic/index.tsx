import type {  NextPage } from "next";  // GetStaticProps,
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-03";
import { IBlog, TcutdownBlog, BlogModel , RecentPost} from "@utils/types"; // , BlogImage, BlogContent
import { getStoryblokApi } from "@storyblok/react";  // , storyblokEditable
import { getStoryBlokBlogs, getStoryBlokRecentPosts } from "lib/blog";
// import { getAllBlogs } from "../../../lib/blog";

// type RecentPost = {
//     title: string;
//     path: string;
//     postedAt: string;
// }

// type TcutdownBlog = {
//     title: string;
//     postedAt: string;
//     // image: string;
//     image: { src: string };
//     excerpt: string;
// };
// type BlogImage = {
//     filename: string;
// }
// type BlogContent = {
//     title: string;
//     postedAt: string;
//     image: BlogImage;
//     excerpt: string;
// }
// type BlogModel = {
//     content: BlogContent
// };

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
            <p>{JSON.stringify(blogs)}</p>
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
    // let { blogs, count } = getAllBlogs(
    //     [
    //         "title",
    //         "image",
    //         "postedAt",
    //         "excerpt",
    //     ],
    //     0,
    //     POSTS_PER_PAGE
    // );
    
    // console.log("BLOGS HARDCODED", JSON.stringify(blogs));

    // const tags = getTags();
    // console.log(JSON.stringify(blogs));

    // we want to get all the blogs from storyblok
     // const { data } = await getStoryblokApi().get("cdn/stories", {

        // const storyblokApi = getStoryblokApi();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const  { data } : {data: {stories: BlogModel[]}} = await getStoryblokApi().get(`cdn/stories`, {
          version: "draft", // or 'published'
          starts_with: 'blog/',
          // is_startpage: false
        });

        // console.log("data", JSON.stringify(data.stories));
        // console.log("length", data.stories.length);
 
        const { blogs, count } = getStoryBlokBlogs(data.stories);
        // we need to create an array of blog objects just with  "title","image","postedAt","excerpt", then we can set them to be the blogs
        
        // recent posts are not necessary i dont think
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        
         const recentPosts = getStoryBlokRecentPosts(blogs, count < 5 ? count : 5 ); // getAllBlogs(["title"], 0, 5);

        // const {blogs: recentPosts } =  getAllBlogs(["title"], 0, 5);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // const { blogs: recentPosts } = getAllBlogs(["title"], 0, 5);

        console.log(JSON.stringify(recentPosts));

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
