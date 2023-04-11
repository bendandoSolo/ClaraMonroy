import { motion } from "framer-motion";
import { scrollUpVariants } from "@utils/variants";
import {ItemType } from "@utils/types";

interface CoachingServiceProps {
    object: ItemType;
    // index: number;
  }


const CoachingService = ({object} : CoachingServiceProps) => {
    // const imagePosition = index % 2 === 0 ? 'order-first' : 'order-last';
    return (
        <motion.div className="bg-white shadow-md rounded-lg overflow-hidden space-y-4 tw-mt-12 tw-mb-15"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            variants={scrollUpVariants}
        >
            <div className="md:flex my-10">
                {/* <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48 ${imagePosition}" src="${object.image}" alt="${object.title}" />
                </div> */}
                <div className="p-4 ">
                        <h3 className="tw-mb-4 title tw-pb-2 child:tw-text-primary child:tw-font-normal tw-text-secondary tw-border-b tw-border-b-gray-500" style={{fontSize: '1.75rem'}}>{object.title}</h3>
                    {object.texts?.map((item) => (
                    <p className="text-gray-700">{item.content}</p>
                    ))}
                    <h4 className="tw-mb-0  tw-pb-4 tw-tracking-wider tw-uppercase tw-text-h6 tw-pb-2 tw-border-b tw-border-b-gray-500">
                            {object.suffix}
                    </h4>   
                </div>
            </div>
        </motion.div>
    );
};

export default CoachingService;
