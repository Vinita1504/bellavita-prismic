
import { FC, } from "react";

import { Content } from "@prismicio/client";
import clsx from "clsx";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn 
        vars={{scale:1,opacity:0.5}}
        className="absolute inset-0 scale-125 opacity-0">
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          preload
          fill
          className="object-cover"
        />
      </FadeIn>

      <div className="flex relative flex-col h-screen justify-center ">
        <RevealText 
           field={slice.primary.heading}
           id= {"hero-heading"}
           staggerAmount={.2}
           duration={2}
           as={"h1"}
           className="font-display max-w-xl  text-6xl leading-none text-neutral-50 md:text-7xl lg:text-8xl">
        </RevealText>
        <FadeIn 
          vars={{ delay: 1, duration: 1.5 }}
          className="max-w-md text-lg mt-6 text-neutral-100 translate-y-8">
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>
        <FadeIn 
          vars={{delay: 1.7, duration: 1.1}}
          className="mt-8 translate-y-5">
          {slice.primary.button.map((link) => (
            <PrismicNextLink
              key={link.key}
              field={link}
              className={clsx(
                "inline-flex  items-center justify-center px-12 py-4 text-center font-extrabold tracking-wider uppercase transition-colors duration-100",
                link.variant === "Secondary"
                  ? "border border-white text-white hover:bg-white/20"
                  : "bg-white text-neutral-950 hover:bg-neutral-200",
                "w-fit "
              )}
            />
          ))}
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;
