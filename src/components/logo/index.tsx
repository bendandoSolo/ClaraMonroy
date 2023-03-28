import Link from "next/link";
import clsx from "clsx";

type TProps = {
    className?: string;
};

const Logo = ({ className }: TProps) => {
    return (
        <Link href="/" className={clsx("tw-inline-block", className)}>
            <img
                src="/clara-images/lil-logo-md.png"
                alt="Logo"
                width={96}
                height={96}
                style={{ width: '96px', height: '96px' }}
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

export default Logo;
