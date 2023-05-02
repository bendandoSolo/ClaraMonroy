import { storyblokEditable } from "@storyblok/react";
 
const Teaser = ({ blok }) => {
  return <h2 {...storyblokEditable(blok)}>{blok.headline} So this is not showing?</h2>;
};
 
export default Teaser;