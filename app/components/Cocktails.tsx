'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cocktailLists, mockTailLists } from "../constants";


export default function Cocktails () {

    useGSAP(() => {
        const ParallaxTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '#cocktails',
                start: 'top 30%',
                end: 'bottom 80%',
                scrub: true,
            }
        })

        ParallaxTimeLine
        .from('#c-left-leaf', {
            x:-100, y:100
        })
        .from('#c-right-leaf', {
            x:100, y:100
        })
    })

    return(
        <section id="cocktails" className="noisy z-10">
           <img 
                src="/images/cocktail-left-leaf.png" 
                alt="l-leaf" 
                id="c-left-leaf" 
                className="absolute left-0 top-20 z-20" 
            />
            <img 
                src="/images/cocktail-right-leaf.png" 
                alt="r-leaf" 
                id="c-right-leaf" 
                className="absolute right-0 top-40 z-20" 
            />
       
            <div className="list z-30">
                <div className="popular">
                    <h2>Most popular coktails:</h2>

                    <ul>
                        {cocktailLists.map((drink) => (
                            <li key={drink.name}>
                                <div className="md:me-28">
                                    <h3>{drink.name}</h3>
                                    <p>{drink.country} | {drink.detail}</p>
                                </div>
                                <span>- {drink.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="loved">
                    <h2>Most loved mocktails:</h2>

                    <ul>
                        {mockTailLists.map((drink) => (
                            <li key={drink.name}>
                                <div className="md:me-28">
                                    <h3>{drink.name}</h3>
                                    <p>{drink.country} | {drink.detail}</p>
                                </div>
                                <span>- {drink.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}