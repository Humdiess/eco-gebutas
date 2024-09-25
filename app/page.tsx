'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Sun, Leaf, Droplet } from 'lucide-react'
import { Compare } from '@/components/ui/compare'
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import DotPattern from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import ShimmerButton from '@/components/magicui/shimmer-button'
import Navbar from '@/components/navbar'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const kelebihanRef = useRef<HTMLDivElement>(null)
  const kelebihanContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // GSAP animations
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Kelebihan section horizontal scroll without pin
    if (kelebihanRef.current && kelebihanContainerRef.current) {
      const cards = kelebihanRef.current.children
      const totalWidth = Array.from(cards).reduce((acc, card) => acc + (card as HTMLElement).offsetWidth, 0)
      const containerWidth = kelebihanContainerRef.current.offsetWidth
      const scrollDistance = totalWidth - containerWidth

      ScrollTrigger.create({
        trigger: kelebihanContainerRef.current,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: true,
        onUpdate: (self) => {
          gsap.to(kelebihanRef.current, {
            x: -scrollDistance * self.progress,
            ease: 'none',
          })
        },
      })
    }

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section ref={addToRefs} className="text-center flex flex-col py-44 -mt-11">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            ECOGEBUTAS : Genteng Masa Depan<br />untuk Bumi yang Lebih Hijau
          </h1>
          <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto px-4">
            ECO Gebutas menggabungkan bahan ramah lingkungan dengan teknologi panel surya terintegrasi
            untuk menciptakan solusi atap yang baik bagi rumah Anda dan planet kita.
          </p>
          <div className="flex justify-center space-x-4">
            <ShimmerButton className="shadow-lg">
              <span className="whitespace-pre-wrap text-center flex items-center gap-1 hover:gap-3 text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Belanja Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </ShimmerButton>
          </div>
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
            )}
          />
        </section>

        <section id="video" className="-mt-32 md:px-24">
          <div className="aspect-video rounded-2xl p-2 border border-neutral-200 overflow-hidden shadow-lg h-fit">
            <HeroVideoDialog
              className="dark:hidden block rounded-xl w-full h-full"
              animationStyle="from-center"
              videoSrc="video/ecogebutas-video.mp4"
              thumbnailSrc="img/ecogebutas-thumbnail.png"
              thumbnailAlt="Cara kerja panel surya"
            />
          </div>
        </section>

        <section ref={addToRefs} id="fitur" className="py-24 mt-24 px-2 md:px-16">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">Desain Inovatif Ramah Lingkungan</h2>
              <p className="text-neutral-600 mb-8 text-lg leading-relaxed">
                Genteng kami dibuat dari tebu dan kertas daur ulang yang berkelanjutan,
                menawarkan daya tahan dan manfaat lingkungan dalam satu paket elegan.
              </p>
              <ul className="space-y-4">
                {[
                  'Bahan terbarukan',
                  'Konstruksi tahan lama',
                  'Hemat energi',
                  'Mengurangi jejak karbon'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-neutral-700 text-lg">
                    <ChevronRight className="h-6 w-6 text-green-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br relative from-green-100 to-green-200 rounded-2xl aspect-square flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="product-label absolute top-2 left-2 bg-white px-2 py-1 rounded-md shadow-md z-[999]">
                <p>Regular</p>
              </div>
              <div className="product-label absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-md z-[999]">
                <p>Solar panel</p>
              </div>
              <Compare
                firstImage="/img/gebutas-standart.jpg"
                secondImage="/img/gebutas-solar.jpg"
                firstImageClassName="object-cover object-left-top"
                secondImageClassname="object-cover object-left-top"
                className="h-full w-full md:h-full md:w-full rounded-2xl"
                slideMode="hover"
              />
            </div>
          </div>

          <div className="text-center md:mb-16 px-2 md:px-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">Manfaatkan Kekuatan Matahari</h2>
            <p className="text-xl text-neutral-600 mb-16 md:max-w-3xl mx-auto">
              Varian terintegrasi panel surya kami membawa atap ramah lingkungan ke level berikutnya,
              menghasilkan energi bersih untuk rumah Anda.
            </p>
          </div>

          <div className="overflow-hidden">
            <div 
              className="kelebihan flex gap-8 md:grid md:grid-cols-3"
            >
              {[
                { icon: Sun, title: 'Energi Terbarukan', desc: 'Menghasilkan listrik dari sinar matahari' },
                { icon: Leaf, title: 'Ramah Lingkungan', desc: 'Mengurangi ketergantungan pada bahan bakar fosil' },
                { icon: Droplet, title: 'Tahan Cuaca', desc: 'Dirancang untuk bertahan dalam berbagai kondisi cuaca' }
              ].map((item, index) => (
                <div key={index} className="min-w-[280px] w-[80vw] md:w-auto flex-shrink-0 bg-white p-8 rounded-xl border border-neutral-200 transition-all duration-300 transform">
                  <item.icon className="h-16 w-16 text-green-600 mb-6 mx-auto" />
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-lg text-neutral-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={addToRefs} id="about" className="py-24 mt-24 px-2 md:px-16">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">Tentang Proyek Ini</h2>
              <p className="text-neutral-600 mb-8 text-lg leading-relaxed">
                Menggabungkan kreativitas dan inovasi, proyek ini bertujuan untuk menyediakan solusi ramah lingkungan
                yang memanfaatkan teknologi modern untuk menciptakan dampak positif bagi lingkungan.
              </p>
              <ul className="space-y-4">
                {[
                  'Berfokus pada inovasi hijau',
                  'Didukung oleh teknologi terbaru',
                  'Mendukung keberlanjutan lingkungan'
                ].map((point, index) => (
                  <li key={index} className="flex items-center text-neutral-700 text-lg">
                    <ChevronRight className="h-6 w-6 text-green-500 mr-3" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 relative rounded-2xl aspect-square flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <DotPattern
                width={40}
                height={40}
                cx={2}
                cy={2}
                cr={2}
                className={cn(
                  "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
                  "absolute left-4 top-4 opacity-40"
                )}
              />
              <img src="/img/ecogebutas-image.png" alt="Our Team" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
