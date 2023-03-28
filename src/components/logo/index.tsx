import Link from "next/link";
import clsx from "clsx";

type TProps = {
    className?: string;
};

const Logo = ({ className }: TProps) => {
    return (
        <Link href="/" className={clsx("tw-inline-block logo-size", className)}>
            <img
                src="/clara-images/lil-logo-md.png"
                alt="Logo"

                className="logo-size"
            />
            {/* {variant === "dark" && (
                <img
                    src="/images/logo/dark-logo.png"
                    alt="Logo"
                    width={158}
                    height={26}
                />
            )}
            {variant === "light" && (
                <img
                    src="/images/logo/light-logo.png"
                    alt="Logo"
                    width={158}
                    height={26}
                />
            )} */}
        </Link>
    );
};

export const LogoMobile = ({ className }: TProps) => {
    return (
        <Link href="/" className={clsx("tw-inline-block logo-size", className)}>
            <img
                src="/clara-images/lil-logo-md.png"
                alt="Logo"
                width={64}
                height={64}
                className="logo-size"
            />
        </Link>
    );
};

export default Logo;
