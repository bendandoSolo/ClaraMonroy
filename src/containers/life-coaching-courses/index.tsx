
import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import { scrollUpVariants } from "@utils/variants";
import { ItemType, SectionTitleType,  TSection } from "@utils/types";
import CoachingService from "@components/coaching-service";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedCoachingService = motion(CoachingService);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        services?: ItemType[];
    };
};

const LifeCoachingCourses = ({
    data: { section_title, services },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section space={space} bg={bg} className="service-area" >
        <div className="tw-container tw-relative tw-z-1 tw-pt-4" id="services">
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
            {services?.map((item, index) => (
                <AnimatedCoachingService 
                object = {item}
                index = {index}
                />
            ))}

            </div>


        </Section>

    );
}


export default LifeCoachingCourses;