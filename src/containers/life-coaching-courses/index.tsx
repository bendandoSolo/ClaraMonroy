
import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import { scrollUpVariants } from "@utils/variants";
import { SectionTitleType,  TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
    };
};




const LifeCoachingCourses = ({
    data: { section_title },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section space={space} bg={bg} className="service-area">
        <div className="tw-container tw-relative tw-z-1">
        {section_title && (
            <AnimatedSectionTitle
                {...section_title}
                titleSize={titleSize}
                className="tw-mb-7.5 xl:tw-mb-15"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={scrollUpVariants}
            />
        )}
            </div>
        </Section>
        // <div className="tw-container">
        //     <div className="section-title tw-relative tw-z-20 tw-text-center tw-mb-7.5 xl:tw-mb-15" style={{opacity: '1', transform: 'none'}}><span className="tw-font-medium tw-text-base tw-leading-none -tw-tracking-tightest tw-block tw-mb-2.5 tw-uppercase tw-text-secondary-light">Education for everyone</span><h2 className="title tw-m-0 child:tw-text-primary child:tw-font-normal tw-text-secondary">Online <span>Coaching Lessons</span> For Remote Learning.</h2></div>
        // </div>
    );
}


export default LifeCoachingCourses;