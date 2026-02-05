'use client'

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
// Certifique-se que o caminho está correto
import { sliderLists } from '../constants/index' 

export default function Menu() {
    // 1. Ref para o container principal (Escopo do GSAP)
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 2. Correção da Animação
    useGSAP(() => {
        // Reinicia as animações sempre que currentIndex mudar
        gsap.fromTo('#title', 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );

        gsap.fromTo('.cocktail-img', 
            { opacity: 0, x: -50, rotation: -5 }, 
            { x: 0, opacity: 1, rotation: 0, duration: 1, ease: 'power2.out' }
        );

        gsap.fromTo('.details-text', 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out' }
        );

    }, { dependencies: [currentIndex], scope: containerRef }); // Adicionado scope e dependencies corretos

    const totalCocktails = sliderLists.length;

    const goToSlide = (index: number) => {
        // Garante que o index seja positivo e ciclico
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex);
    };

    // 3. Correção da Lógica Matemática
    const getCocktailAt = (indexOffset: number) => {
        // O erro estava aqui: usava 'sliderLists' (array) em vez de 'sliderLists.length' (número)
        const index = (currentIndex + indexOffset + totalCocktails) % totalCocktails;
        return sliderLists[index];
    };

    const currentCocktail = sliderLists[currentIndex];
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

    return (
        // Adicionado ref={containerRef} para o GSAP funcionar apenas aqui dentro
        <div id="menu" ref={containerRef} aria-labelledby="menu-heading" className="relative">
            {/* Adicionei as extensões .png (assumindo que sejam imagens) */}
            <img src="/images/slider-left-leaf.png" alt="" id="m-left-leaf" className="absolute left-0 top-0" />
            <img src="/images/slider-right-leaf.png" alt="" id="m-right-leaf" className="absolute right-0 top-0" />

            <h2 id="menu-heading" className="sr-only">Cocktail Menu</h2>

            {/* Abas de Navegação */}
            <nav className="cocktail-tabs flex gap-4 justify-center mb-10" aria-label="Cocktail Navigation">
                {sliderLists.map((cocktail, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <button 
                            key={cocktail.id} 
                            onClick={() => goToSlide(index)} // Faltava o onClick aqui
                            className={`px-4 py-2 border rounded-full transition-all ${isActive ? "text-white border-white bg-white/10" : "text-white/50 border-white/50 hover:text-white"}`}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>

            <div className="content flex items-center justify-between w-full max-w-6xl mx-auto">
                {/* Botão Anterior */}
                <div className="arrows flex-1">
                    <button className="text-left flex items-center gap-2 group" onClick={() => goToSlide(currentIndex - 1)}>
                        <img src="/images/left-arrow.png" alt="" aria-hidden={true} className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-white text-lg">{prevCocktail.name}</span>
                    </button>
                </div>

                {/* Imagem Central */}
                <div className="cocktail flex-1 flex justify-center">
                    <img 
                        src={currentCocktail.image} 
                        alt={currentCocktail.name}
                        className="cocktail-img object-contain h-[400px]" // Classe adicionada para o GSAP
                    />
                </div>

                {/* Receita e Detalhes */}
                <div className="recipe flex-1 text-right">
                    <div className="info">
                        <p className="text-sm text-gray-400 details-text">Recipe for:</p>
                        <p id='title' className="text-4xl font-bold text-[#d2a356] mb-4">{currentCocktail.name}</p>

                        <div className="details">
                            <h2 className="text-2xl font-semibold mb-2 details-text">{currentCocktail.title}</h2>
                            <p className="text-gray-300 details-text">{currentCocktail.description}</p>
                        </div>
                    </div>

                     {/* Botão Próximo (Movido para cá ou ajustado layout conforme necessidade, 
                         mas mantendo a lógica de setas separadas visualmente) */}
                     <div className="arrows mt-10 flex justify-end">
                        <button className="text-right flex items-center gap-2 group" onClick={() => goToSlide(currentIndex + 1)}>
                            <span className="text-white text-lg">{nextCocktail.name}</span>
                            <img src="/images/right-arrow.png" alt="" aria-hidden={true} className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}