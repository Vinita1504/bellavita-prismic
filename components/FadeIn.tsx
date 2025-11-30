"use client";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import clsx from "clsx";

gsap.registerPlugin(useGSAP)

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  className?: string;
};


export const FadeIn = ({ children, vars = {}, className }: FadeInProps) => {
   const containerRef = useRef<HTMLDivElement>(null);
   
     useGSAP(() => {
       
       gsap.to(containerRef.current, {
         duration:5,
         opacity:1,
         ease:"power3.out",
         y:0,
         ...vars
       })
   
       
     }, { scope: containerRef});
   


  return <div 
       ref={containerRef}
       className={clsx("opacity-0",className)} >{children}</div>;
};
