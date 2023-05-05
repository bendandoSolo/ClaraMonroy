import dayjs from "dayjs";
// import Anchor from "@ui/anchor";
import BlogMetaItem from "@components/blog-meta/meta-item";
import SocialShare from "@components/social-share/layout-03";
// import TagMeta from "@components/blog-meta/tags";
import MarkdownRenderer from "@components/markdown-renderer";
import { IBlog } from "@utils/types";

const BlogDetails = ({
    image,
    title,
    // category,
    postedAt,
    content,
    // tags,
}: IBlog) => {
    return (
        <article className="blog-details tw-pb-7.5 tw-mb-10 tw-border-b tw-border-b-gray-500">
            <div className="entry-header tw-mb-5">
                {image?.filename && (
                    <figure className="tw-mb-7">
                        <img
                            className="tw-w-full tw-object-cover tw-rounded"
                            src={image.filename}
                            alt={image?.alt || title}
                            width="770"
                        />
                    </figure>
                )}

                {/* <div className="tw-font-medium tw-uppercase -tw-tracking-tightest tw-mb-4">
                    <Anchor path={category.path}>{category.title}</Anchor>
                </div> */}

                <h2 className="tw-mb-5">{title}</h2>
                {/* <p>Image: {JSON.stringify(image)}</p> */}
                <div className="tw-text-md tw-mt-5 tw-text-gray-300 tw-flex tw-items-center tw-flex-wrap">
                    {/* <AuthorMeta
                        author={author}
                        className="tw-pr-5 md:tw-pr-8"
                    /> */}
                    <BlogMetaItem
                        className="tw-pr-5 md:tw-pr-8"
                        text={dayjs(postedAt).format("MMM DD, YYYY")}
                        icon="far fa-calendar"
                    />
                    {/* <BlogMetaItem
                        className="tw-pr-5 md:tw-pr-8"
                        text={`${views} views`}
                        icon="far fa-eye"
                    /> */}
                    {/* <BlogMetaItem
                        text="2 commentss"
                        icon="far fa-comment-alt-lines"
                        path="#comments"
                    /> */}
                </div>
            </div>
            
            {/* we should replace this with storyblok rich content editor */}
            <MarkdownRenderer
                className="entry-content tw-mb-[54px]"
                content={content}
            />
            <div className="entry-footer tw-flex tw-items-center tw-justify-center sm:tw-justify-between tw-flex-wrap">
                {/* <TagMeta tags={tags} /> */}
                <SocialShare
                    label="Share this post"
                    className="tw-mt-5 sm:tw-mt-0"
                />
            </div>
        </article>
    );
};

export default BlogDetails;
