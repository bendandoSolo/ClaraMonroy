import { motion } from "framer-motion";
import { ImageType, ItemType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = {
    data: {
        images?: ImageType[];
        items?: ItemType[];
    };
};

const FaqArea = ({ data: { items } }: TProps) => {
    return (
        <div className="faq-area">
            <div className="tw-container tw-pb-[80px]">
                {/* <motion.div
                    className="tw-grid md:tw-grid-cols-[66%_minmax(34%,_1fr)] tw-gap-7.5"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {images?.[0]?.src && (
                        <img
                            src={images[0].src}
                            alt={images[0]?.alt || "Faq"}
                            className="tw-rounded tw-w-full tw-h-full tw-object-cover"
                        />
                    )}
                    {images?.[1]?.src && (
                        <img
                            src={images[1].src}
                            alt={images[1]?.alt || "Faq"}
                            className="tw-rounded tw-w-full tw-h-full tw-object-cover"
                        />
                    )}
                </motion.div> */}
                {items?.map((item) => (
                    <motion.div
                        key={item.id}
                        className="tw-pt-[20px] tw-pb-[20px] tw-border-b tw-border-b-gray-500 tw-grid md:tw-grid-cols-[40%_minmax(60%,_1fr)] tw-gap-7.5"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        <h4 className="tw-text-lg tw-font-semibold md:tw-max-w-[310px] tw-relative tw-pl-8">
                            {/* <i className="fas fa-arrow-right tw-text-primary tw-absolute tw-left-0 tw-top-2" /> */}
                            {item.title}
                        </h4>
                        <div className="tw-relative tw-pl-8 tw-mt-5 md:tw-mt-0">
                            
                            {item.texts?.map((text) => (
                                <div key={text.id} className='tw-flex tw-pb-1'>
                                    <i className="fas fa-check tw-text-primary tw-pr-2" style={{paddingTop: '6px'}}/>
                                    <p  >{text.content}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FaqArea;
