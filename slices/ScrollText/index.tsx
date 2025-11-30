'use client'
import { FC, useRef } from "react";
import { asText, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {gsap} from "gsap"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bounded } from "@/components/Bounded";


gsap.registerPlugin(useGSAP,ScrollTrigger)
/**
 * Props for `ScrollText`.
 */
export type ScrollTextProps = SliceComponentProps<Content.ScrollTextSlice>;

/**
 * Component for "ScrollText" Slices.
 */
const ScrollText: FC<ScrollTextProps> = ({ slice }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(()=>{
    const component = componentRef.current;
    const textElement = textRef.current;
    const contentElement = contentRef.current;
    const letters = textElement?.querySelectorAll("span");

    if(!component || !textElement || !contentElement || !letters) return; 
    gsap.set(contentElement,{filter: "blur(40px)"})
    gsap.set(letters , {color: 'hsl(220, 9%, 20%)'})

    gsap.to(contentElement,{
      filter: "blur(0px)",
      duration:1,
      scrollTrigger:{
        trigger:component,
        start:"top 75%",
        end:"top top",
        scrub:2,
      }
    })

    const colorT1 = gsap.timeline({
      scrollTrigger:{
        trigger:component,
        start:"top top",
        end: "bottom -100%",
        pin:true,
        scrub:2,
      }
    })

    colorT1.to(letters,{
      color:"white",
      stagger:{
        each:0.01,
        from:"start",
        ease:"power1.inOut"
      }
    })

    colorT1.to(".glow-background",{
      opacity:1,
      duration:1,
      ease: "power2.inOut"

    },0)
  } ,{scope: componentRef})
   

  const words = asText(slice.primary.text).split(" ");

  return (
    <Bounded
      ref={componentRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex min-h-screen items-center justify-center bg-neutral-950 relative"
    >

     <div className="glow-background  opacity-0  absolute inset-0 z-0 h-full w-full"></div>
     <div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-30 mix-blend-multiply"></div>

      <div ref={contentRef}>
        <div className="mb-2 text-center text-sm tracking-wider text-neutral-200 uppercase md:mb-8  md:text-base">
          {slice.primary.eyebrow}
        </div>

        {/* Paragraph  */}
        <div 
        ref={textRef}
         className="text-center">
          <p className="font-display flex flex-wrap justify-center text-5xl leading-tight text-balance uppercase md:text-7xl">
            {words.map((word, index) => {
              return (
                <span key={`${word}-${index}`} className="inline">
                  {word.split("").map((char, charIndex) => (
                    <span key={`${char}-${charIndex}`} className="inline">
                      {char}
                    </span>
                  ))}
                  {index < words.length - 1 ? (
                    <span className="inline">&nbsp;</span>
                  ) : null}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </Bounded>
  );
};

export default ScrollText;
