import Link from "next/link";
import clsx from "clsx";

type TProps = {
    //variant?: "dark" | "light";
    className?: string;
};

const Logo = ({ className }: TProps) => {
    return (
        <Link href="/" className={clsx("tw-inline-block", className)}>
            <img
                src="/clara-images/lil-logo-final-sm.png"
                alt="Logo"
                width={64}
                height={64}
                style={{ width: '64px', height: '64px' }}
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
