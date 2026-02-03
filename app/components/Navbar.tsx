'use client'

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Importe o plugin
import { navLinks } from "../constants";

// Registre o plugin fora do componente
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    // 1. Criamos uma referência para o elemento da navbar
    const navContainer = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 2. Animação condicional ao scroll
        gsap.to(navContainer.current, {
            scrollTrigger: {
                trigger: document.body, // O gatilho é o corpo do site
                start: "top -100", // Começa quando rolar 100px para baixo
                end: "top -100", // Define apenas um ponto de troca
                toggleActions: "play none none reverse", // Toca ao descer, reverte ao subir
            },
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Use rgba para transparência
            backdropFilter: 'blur(10px)', // Corrigido de backgroundFilter
            duration: 0.5,
            ease: 'power1.inOut'
        });

    }, { scope: navContainer }); // Scope opcional, mas boa prática

    return(
        // 3. Mudamos para fixed, adicionamos z-index alto e width full
        <nav 
            ref={navContainer} 
            className="fixed top-0 left-0 w-full z-50 flex justify-around items-center py-4 transition-all"
        >
            <a href="#home" className="flex justify-center items-center gap-2">
                <img src='/images/logo.png' alt="Logo" className="w-8 h-8"/> {/* Adicionei tamanho fixo pro logo */}
                <p className="font-bold text-white">Velvet Pour</p>
            </a>

            <ul className="flex justify-center gap-5">
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <a href={`#${link.id}`} className="text-white hover:text-gray-300 transition-colors">
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}