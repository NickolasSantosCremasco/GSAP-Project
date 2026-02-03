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
    // Não precisamos necessariamente de um ref para a timeline se não formos pausá-la externamente, 
    // mas é bom manter para limpeza se precisar.

    useGSAP(() => {
        // --- 1. Animações de Texto e Folhas (Mantive seu código original) ---
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
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
        .to('.right-leaf', { y: 200 }, 0)
        .to('.left-leaf', { y: -200 }, 0)

    }, { scope: containerRef });


    // --- 2. Função para animar o Vídeo (Acionada quando o vídeo carrega) ---
    const handleVideoLoad = () => {
        const video = videoRef.current;
        if (!video) return;

        // Remove o autoplay nativo para o GSAP assumir o controle
        video.pause();
        
        // MatchMedia para responsividade (Adaptado do seu código)
        let mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)",
        }, (context) => {
            const isMobile = context.conditions?.isMobile;

            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current, // O gatilho é a seção Hero inteira
                    start: "top top", // Começa quando o topo do Hero toca o topo da tela
                    end: "bottom top", // Termina quando o fundo do Hero toca o topo da tela
                    scrub: true, // O "scrub" é o que liga o scroll ao tempo do vídeo
                    pin: false, // Se quiser que o vídeo fique fixo enquanto scrolla, mude para true
                }
            })
            // A mágica acontece aqui: animamos o tempo atual (currentTime) do 0 até a duração total
            .fromTo(video, 
                { currentTime: 0 }, 
                { currentTime: video.duration || 1, ease: "none" }
            );
        });
    };

    return (
       <>
        <section id="hero" className="noisy relative h-screen w-full overflow-hidden" ref={containerRef}>
            
            <div className="relative z-10 overflow-hidden">
                <h1 className="title">MOJITO</h1>
            </div>

            <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf absolute z-10" />
            <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf absolute z-10" />
        
            <div className="body relative z-10">
                <div className="content">
                    {/* ... Seu conteúdo de texto ... */}
                    <div className="space-y-5 hidden md:block">
                        <p>Cool. Crisp. Classic</p>
                        <div className="overflow-hidden">
                             <p className="subtitle">Sip the Spirit <br /> of Summer</p>
                        </div>
                    </div>
                    <div className="view-cocktails">
                        <p className="subtitle">Every cocktail on our menu...</p>
                        <a href="#cocktails">View Cocktails</a>
                    </div>
                </div>
            </div>

            {/* VÍDEO ATUALIZADO */}
           <video 
                ref={videoRef} 
                // IMPORTANTE: Chama a função assim que os dados de duração carregam
                onLoadedMetadata={handleVideoLoad}
                src="/videos/input.mp4" // Veja a nota abaixo sobre o vídeo!
                className="absolute top-0 left-0 w-full h-full object-cover z-0 mix-blend-screen"
                muted 
                playsInline 
                preload="auto"
                // Removemos o loop e autoPlay porque o ScrollTrigger vai controlar isso
            />
        </section>
       </>
    )
}