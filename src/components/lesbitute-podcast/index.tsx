// import Link from "next/link";
// import clsx from "clsx";

// type TProps = {
//     className?: string;
// };

const TheLesbitutePodcast = () => {

    //const src = `https://open.spotify.com/embed/show/${url}`;

    return (
        <div className="tw-container tw-pt-15 tw-pb-15">
            <h1>The Lesbitute Podcast</h1>
            <iframe style={{borderRadius: '12px'}} src="https://open.spotify.com/embed/show/0I7VWJIMrsYuyzPneFpyqd?utm_source=generator" width="100%" height="352" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

        </div>        

    );
};

// export const LogoMobile = ({ className }: TProps) => {
//     return (
//         <Link href="/" className={clsx("tw-inline-block logo-size", className)}>
//             <img
//                 src="/clara-images/lil-logo-md.png"
//                 alt="Logo"
//                 width={64}
//                 height={64}
//                 className="logo-size"
//             />
//         </Link>
//     );
// };

export default TheLesbitutePodcast;
 