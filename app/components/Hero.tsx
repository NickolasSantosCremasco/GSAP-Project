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

    useGSAP(() => {
        const video = videoRef.current;
        if (!video) return;

        video.pause();
        video.currentTime = 0;

        // Animação do vídeo: agora ele não trava a tela (sem pin)
        // Ele vai animar enquanto você scrolla pelo container
        gsap.to(video, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top", // Anima durante toda a altura da seção Hero
                scrub: 1,
                // pin: true removido para a página descer livremente
            },
            currentTime: video.duration || 5,
            ease: "none"
        });

        // Animações de Texto originais
        const heroSplit = new SplitText('.title', { type: 'chars, words' })
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' })
        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

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

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start:'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
        .to('.right-leaf', {y: 200}, 0)
        .to('.left-leaf', {y:-200}, 0)

    }, { scope: containerRef });

    return (
        <section 
            id="hero" 
            ref={containerRef} 
            className="noisy relative h-screen w-full overflow-hidden"
        >
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
                             <p className="subtitle">Sip the Spirit <br /> of Summer</p>
                        </div>
                    </div>
                    <div className="view-cocktails">
                        <p className="subtitle">Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes -designed to delight your senses</p>
                        <a href="#cocktails">View Cocktails</a>
                    </div>
                </div>
            </div>

            {/* VÍDEO ALTERADO PARA FIXED */}
            <video 
                ref={videoRef} 
                src="/videos/output.mp4" 
                // fixed faz o vídeo acompanhar o scroll sem precisar de pin no GSAP
               className="fixed top-0 left-0 w-full h-full object-cover z-0 mix-blend-screen pointer-events-none"
                muted 
                playsInline 
                preload="auto"
                width={200}
            />
        </section>
    )
}