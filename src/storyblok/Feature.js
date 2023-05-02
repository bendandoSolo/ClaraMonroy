import { storyblokEditable } from "@storyblok/react";




const Feature = ({ blok }) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  <div className="column feature" {...storyblokEditable(blok)}>
    {blok.name}
  </div>
);
 
export default Feature;