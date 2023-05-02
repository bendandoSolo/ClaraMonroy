import { storyblokEditable } from "@storyblok/react";
 
const Teaser = ({ blok }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return <h2 {...storyblokEditable(blok)}>{blok.headline}</h2>;
};
 
export default Teaser;