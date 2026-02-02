'use client'

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navLinks } from "../constants";

export default function Navbar() {
    useGSAP(() => {
        //tween came from in-between, the work of cauting from 0 to 100 in the position
        const navTween = gsap.timeline({ 
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top'
            }
        });

        navTween.fromTo('nav', {backgroundColor: 'transparent'}, {
            backgroundColor: '#00000050',
            backgroundFilter: 'blur(10px)',
            duration:1,
            ease:'power1.inOut'
        });
    })
    return(
        <div className="relative block justify-around top-4 md:flex">
            <a href="#home" className="flex justify-center items-center gap-2">
                <img src='/images/logo.png'/>
                <p>Velvet Pour</p>
            </a>

            <ul className="flex justify-center gap-5">
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}