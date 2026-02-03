'use client'

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const videoTimelineRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        // Configuração dos Textos
        const heroSplit = new SplitText('.title', { type: 'chars, words' })
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' })

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

        // Animação de Entrada
        const tl = gsap.timeline();
        
        tl.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06
        })
        .from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
        }, "-=1.4")

        // Animação das Folhas (Parallax)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
        .to('.right-leaf', { y: 200 }, 0)
        .to('.left-leaf', { y: -200 }, 0)

        // Animação do Vídeo (Responsivo)
        let mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)",
        }, (context) => {
            const isMobile = context.conditions?.isMobile;
            
            videoTimelineRef.current = gsap.timeline({
                scrollTrigger: {
                    trigger: videoRef.current,
                    start: isMobile ? 'top 50%' : 'center 60%',
                    end: isMobile ? '120% top' : 'bottom top',
                    scrub: true,
                    pin: true,
                }
            });
        });
            
    }, { scope: containerRef }); // Scope define o limite da animação

    return (
       <>
        {/* 1. Section: relative para segurar o video, h-screen para altura total */}
        <section id="hero" className="noisy relative h-screen w-full overflow-hidden" ref={containerRef}>
            
            {/* 2. Elementos de frente (Texto e Imagens): relative + z-10 */}
            <div className="relative z-10 overflow-hidden">
                <h1 className="title">MOJITO</h1>
            </div>

            <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf absolute z-10" />
            <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf absolute z-10" />
        
            <div className="body relative z-10">
                <div className="content">
                    <div className="space-y-5 hidden md:block">
                        <p>Cool. Crisp. Classic</p>
                        <div className="overflow-hidden">
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>
                    </div>

                    <div className="view-cocktails">
                        <p className="subtitle">Every cocktail on our menu is a blend of premium ingredients, creative, flair, and timeless recipes - designed to delight your senses.</p>
                        <a href="#cocktails">View Cocktails</a>
                    </div>
                </div>
            </div>

            {/* 3. Vídeo de Fundo: absolute + z-0 (atrás de tudo) */}
            <div className="video absolute inset-0 z-0"> 
                <video 
                    ref={videoRef} 
                    src="/videos/input.mp4"
                    className="w-full h-full object-cover"
                    muted 
                    playsInline 
                    autoPlay
                    loop
                />
            </div>
        </section>
       </>
    )
}