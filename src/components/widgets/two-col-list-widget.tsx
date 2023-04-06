import clsx from "clsx";
import Anchor from "@ui/anchor";
import WidgetTitle from "./widget-title";

type TProps = {
    className?: string;
    mode?: "light" | "dark";
};

const TwoColumnListWidget = ({ className, mode }: TProps) => {
    return (
        <div className={clsx(className)}>
            <WidgetTitle mode={mode}>Explore</WidgetTitle>
            <ul
                className={clsx(
                    "tw-flex tw-flex-wrap tw-text-md tw-font-medium",
                    mode === "dark" && "tw-text-gray-400"
                )}
            >
                <li className="tw-w-1/2 tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/">Home</Anchor>
                </li>
                <li className="tw-w-1/2 tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/life-coaching">Life Coaching</Anchor>
                </li>
                <li className="tw-w-1/2 tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/lesbitute-podcast">The Lesbitute Podcast</Anchor>
                </li>
                <li className="tw-w-1/2 tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/london-lesbian-meetup-group">London Lesbians Meetup Group</Anchor>
                </li>
                <li className="tw-w-1/2 tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/blog">Blog</Anchor>
                </li>
                <li className="tw-w-1/2 tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/lesbian-recommended-places-london">Clara Recommends</Anchor>
                </li>
                <li className="tw-w-1/2 tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/clara-monroy-patreon">Patreon</Anchor>
                </li>
                <li className="tw-w-1/2 tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/contact-me">Contact Me</Anchor>
                </li>
                <li className="tw-w-1/2 tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/privacy-policy">Privacy Policy</Anchor>
                </li>
            </ul>
        </div>
    );
};

export default TwoColumnListWidget;
