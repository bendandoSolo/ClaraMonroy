import { motion } from "framer-motion";
import { ImageType, HeadingType, SectionTitleType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = {
    data: {
        images?: ImageType[];
        headings?: HeadingType[];
        section_title?: SectionTitleType;
    };
};

const HeroArea = ({ data: { images, headings, section_title } }: TProps) => {
    return (
        <section className="hero-area tw-relative tw-py-15 md:tw-py-20 lg:tw-py-[120px] xl:tw-pt-[160px]">
            {images?.[0]?.src && (
                <div className="tw-absolute tw-inset-0 -tw-z-1">
                    <img
                        src={images[0].src}
                        alt={images[0]?.alt || "Hero BG"}
                        width={1903}
                        height={496}
                        className="tw-w-full tw-h-full tw-object-cover"
                    />
                </div>
            )}
            <motion.div
                className="tw-container"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                variants={scrollUpVariants}
            >
                
                {headings?.[0]?.content && (
                    <h1 className="tw-max-w-[700px] lg:tw-max-w-[770px] tw-mx-auto tw-text-center tw-text-h3 tw-leading-normal md:tw-text-[36px] lg:tw-text-[38px] lg:tw-leading-[1.4] tw-text-white tw-mb-0">
                        {headings?.[0]?.content}
                    </h1>
                )}

                {section_title?.title && <h4 className="tw-max-w-[700px] lg:tw-max-w-[770px] tw-mx-auto tw-text-center tw-text-h3 tw-leading-normal md:tw-text-[18px] lg:tw-text-[18px] lg:tw-leading-[1.4] tw-text-white tw-mb-0">{section_title?.title}</h4>}


                {section_title?.subtitle && <p className="tw-mt-15 md:tw-mt-10 tw-max-w-[700px] lg:tw-max-w-[770px] tw-mx-auto tw-text-center tw-text-h3 tw-leading-normal tw-text-[18px]  lg:tw-leading-[1.4] tw-text-white tw-mb-0">{section_title?.subtitle}</p>}
              
            </motion.div>
        </section>
    );
};

export default HeroArea;
