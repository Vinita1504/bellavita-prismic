'use client'

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import clsx from "clsx";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    
    gsap.to(".bg-image", {
      scale:1,
      duration:5,
      opacity:0.5,
      ease:"power3.out"
    })

    
  }, { scope: containerRef});

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
      ref={containerRef}
    >
      <div className="bg-image absolute inset-0 scale-125 opacity-0">
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          preload
          fill
          className="object-cover"
        />
      </div>

      <div className="flex relative flex-col h-screen justify-center ">
        <div className="font-display max-w-xl  text-6xl leading-tight text-neutral-50 md:text-7xl lg:text-8xl">
          <PrismicRichText field={slice.primary.heading} />
        </div>
        <div className="max-w-md text-lg mt-6 text-neutral-100">
          <PrismicRichText field={slice.primary.body} />
        </div>
        <div className="mt-8">
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
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
