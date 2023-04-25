import clsx from "clsx";
import Social, { SocialLink } from "@components/ui/social";
import WidgetTitle from "./widget-title";

type TProps = {
    className?: string;
    mode?: "light" | "dark";
};

const TextWidget = ({ className, mode }: TProps) => {
    return (
        <div className={clsx(className)}>
            <WidgetTitle mode={mode}>Get In Touch</WidgetTitle>
            <div
                className={clsx(
                    "content ",
                    mode === "dark" && "tw-text-gray-400"
                )}
            >
                {/* <p className="tw-mb-[11px]">
                    382 NE 191st St # 87394 Miami, FL 33179-3899
                </p> */}
                <p className="tw-mb-[11px]">
                <a
                        href="tel:+44 7984 287 136"
                        className={clsx(
                            "hover:tw-text-primary",
                            mode === "dark" && "tw-text-gray-400"
                        )}
                    >
                        07984 287 136{" "}
                    </a>
                     (9am - 6pm , Monday - Friday){" "}
                </p>
                <p className="tw-mb-[11px]">
                    <a
                        href="mailto:hello@claramonroy.com"
                        className={clsx(
                            "hover:tw-text-primary",
                            mode === "dark" && "tw-text-gray-400"
                        )}
                    >
                        hello@claramonroy.com{" "}
                    </a>
                </p>
            </div>
            <Social
                color={mode === "dark" ? "white" : "light"}
                className="tw-gap-6.1 tw-mt-6.1"
            >
                <SocialLink href="https://www.facebook.com/profile.php?id=100091616842995" label="Facebook link">
                    <i className="fab fa-facebook-square" />
                </SocialLink>
                <SocialLink href="https://twitter.com/clarathedyke" label="twitter link">
                    <i className="fab fa-twitter" />
                </SocialLink>
                <SocialLink href="https://www.instagram.com/clarathedyke/" label="instagram link">
                    <i className="fab fa-instagram" />
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/in/clara-monroy-66245160/" label="linkedin link">
                    <i className="fab fa-linkedin" />
                </SocialLink>
            </Social>
        </div>
    );
};

export default TextWidget;
