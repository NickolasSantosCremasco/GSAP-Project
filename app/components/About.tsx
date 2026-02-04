'use client'

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function About() {
    return(
        <div id="about">
            <div className="mb-16 md:px-0 px-5">
                <div className="content">
                    <div className="md:col-span-8">
                    <p className="badge">Best Cocktails</p>
                    <h2>
                        Where every datail matters <span className="text-white">-</span>
                        from muddle to garnish
                    </h2>

                    <div className="subcontent "></div>
                    </div>
                </div>
            </div>

        </div>
    )
}