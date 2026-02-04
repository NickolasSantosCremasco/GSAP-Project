'use client'

import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function About() {
    const container = useRef(null);
    useGSAP(() => {

       const titleSplit = new SplitText('#about h2', {
            type: 'words'
        })

        const scrollTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top 70%', // Começa um pouco antes para o usuário ver a animação
                toggleActions: 'play none none reverse'
            }
        })

        scrollTimeLine
            .from(titleSplit.words, {
                opacity: 0, 
                duration: 1, 
                y: 50, // Melhor que yPercent para textos curtos
                ease: 'expo.out', 
                stagger: 0.05
            })
            // CORREÇÃO DOS SELETORES:
            // Pegamos todos os filhos diretos (divs) do container do grid
            .from('.grid-container > div', {
                opacity: 0, 
                y: 30,
                duration: 0.8, 
                ease: 'power2.out', 
                stagger: 0.1,
            }, '-=0.6')

    }, {scope:container})
    return (
        <section id="about" ref={container}>
            <div className="container mx-auto px-5">
                
                {/* Header Content */}
                <div className="grid md:grid-cols-12 gap-8 mb-16">
                    <div className="md:col-span-8">
                        <p className="badge mb-4 inline-block px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest">
                            Best Cocktails
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                            Where every detail matters <span className="text-white/50">-</span> from muddle to garnish
                        </h2>
                    </div>
                    
                    <div className="md:col-span-4 flex flex-col justify-end">
                        <p className="text-white/70 mb-6 text-lg">
                            Every cocktail we serve is a reflection of our obsession with detail - from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.
                        </p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold">4.5</span>
                            <span className="text-xl text-white/50">/5</span>
                        </div>
                        <p className="text-sm text-white/40 italic">More than +12,000 customers</p>
                    </div>
                </div>

                {/* Grid de Imagens Estilo Bento Grid */}
                <div className="grid-container grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
                    
                    {/* Imagem 1 - Esquerda (3 colunas) */}
                    <div className="md:col-span-3 relative overflow-hidden rounded-2xl group">
                        <div className="absolute inset-0 noisy pointer-events-none z-10 opacity-30"/>
                        <img src="/images/abt1.png" alt="grid-1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Imagem 2 - Centro Grande (6 colunas) */}
                    <div className="md:col-span-6 relative overflow-hidden rounded-2xl group">
                        <div className="absolute inset-0 noisy pointer-events-none z-10 opacity-30"/>
                        <img src="/images/abt2.png" alt="grid-2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Imagem 3 - Direita (3 colunas) */}
                    <div className="md:col-span-3 relative overflow-hidden rounded-2xl group">
                        <div className="absolute inset-0 noisy pointer-events-none z-10 opacity-30"/>
                        <img src="/images/abt5.png" alt="grid-5" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Linha de Baixo */}
                    {/* Imagem 4 - Inferior Esquerda (8 colunas) */}
                    <div className="md:col-span-8 relative overflow-hidden rounded-2xl group">
                        <div className="absolute inset-0 noisy pointer-events-none z-10 opacity-30"/>
                        <img src="/images/abt3.png" alt="grid-3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Imagem 5 - Inferior Direita (4 colunas) */}
                    <div className="md:col-span-4 relative overflow-hidden rounded-2xl group">
                        <div className="absolute inset-0 noisy pointer-events-none z-10 opacity-30"/>
                        <img src="/images/abt4.png" alt="grid-4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>

                </div>
            </div>
        </section>
    )
}