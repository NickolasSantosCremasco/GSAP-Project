'use client'

import gsap from "gsap"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"
import { featureLists, goodLists } from "../constants"

export default function Art () {
    const container = useRef(null);
    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add({
            // Definimos as condições de tela aqui
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            // @ts-ignore
            let { isDesktop, isMobile } = context.conditions;

            const maskTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#art',
                   
                    start: isMobile ? "top 20%" : "top top", 
                    end: 'bottom center',
                    scrub: 1.5,
                    pin: true,
                }
            });

            // Adicione suas animações na timeline aqui
            maskTimeline.to(".will-fade", { opacity: 1, stagger: 0.2, ease: 'power1.inOut' });

            return () => {}; // Limpeza
        }); // Limpeza automática 
    }, { scope: container })
    return(
        <div id="art" ref={container}>
            <div className="container mx-auto h-full pt-20">
                <h2 className="will-fade">The ART</h2>

                <div className="content">
                    <ul className="space-y-4">
                        {goodLists.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <img src="/images/check.png" alt="check" />
                                <p>{feature}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="cocktail-img">
                        <img src="/images/under-img.jpg" alt="cocktail" className="abs-center masked-img size-full object-contain" />
                    </div>
                    
                     <ul className="space-y-4">
                        {featureLists.map((feature, index) => (
                            <li key={index} className="flex items-center justify-start gap-2">
                                <img src="/images/check.png" alt="check" />
                                <p className="md:w-fit w-60">{feature}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="masked-container">
                    <h2 className="will-fade">Sip-Worthy Perfection</h2>
                    <div id="masked-content">
                        <h3>Made With Craft, Poured with Passion</h3>
                        <p>This isn't just a drink. It's a carefully crafted moment made just for you.</p>
                    </div>
                </div>
            </div>
        </div>
    )

}