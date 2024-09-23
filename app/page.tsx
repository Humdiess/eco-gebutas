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

    return () => {
      lenis.destroy()
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

      <main className="container mx-auto px-4">
        <section ref={addToRefs} className="text-center flex flex-col py-44 -mt-11">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Atap Masa Depan<br />untuk Bumi yang Lebih Hijau
          </h1>
          <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto">
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
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
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

          <div className="text-center mb-16 px-2 md:px-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">Manfaatkan Kekuatan Matahari</h2>
            <p className="text-xl text-neutral-600 mb-16 md:max-w-3xl mx-auto">
              Varian terintegrasi panel surya kami membawa atap ramah lingkungan ke level berikutnya,
              menghasilkan energi bersih untuk rumah Anda.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {[
              { icon: Sun, title: 'Energi Terbarukan', desc: 'Menghasilkan listrik dari sinar matahari' },
              { icon: Leaf, title: 'Ramah Lingkungan', desc: 'Mengurangi ketergantungan pada bahan bakar fosil' },
              { icon: Droplet, title: 'Tahan Cuaca', desc: 'Dirancang untuk bertahan dalam berbagai kondisi cuaca' }
            ].map((item, index) => (
              <div key={index} className="min-w-[250px] bg-white p-8 rounded-xl border border-neutral-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 snap-center">
                <item.icon className="h-16 w-16 text-green-600 mb-6 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* section tentang-start */}
        <section ref={addToRefs} id="tentang" className="py-24 px-4 md:px-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl my-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 text-center">Tentang ECO Gebutas</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-neutral-700 leading-relaxed">
                  ECO Gebutas adalah pelopor dalam industri atap ramah lingkungan, menggabungkan inovasi dengan keberlanjutan. Kami berkomitmen untuk menciptakan solusi atap yang tidak hanya melindungi rumah Anda, tetapi juga berkontribusi positif terhadap lingkungan.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Dengan menggunakan bahan-bahan terbarukan dan teknologi panel surya canggih, kami memberdayakan pemilik rumah untuk mengurangi jejak karbon mereka sambil menikmati manfaat dari energi bersih yang dihasilkan.
                </p>
                <div className="pt-4">
                  <Link href="/about" className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors duration-300">
                    Pelajari lebih lanjut tentang misi kami
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/img/gebutas-logo.png"
                    alt="Tim ECO Gebutas"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-6 w-6 text-green-500" />
                    <span className="text-neutral-900 font-semibold">100% Ramah Lingkungan</span>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Sun className="h-6 w-6 text-yellow-500" />
                    <span className="text-neutral-900 font-semibold">Energi Surya Terintegrasi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section tentang-end */}

        <section ref={addToRefs} className="text-center mb-32 py-24">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">Bergabunglah dalam Revolusi Atap Hijau</h2>
          <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto">
            Jadilah bagian dari perubahan menuju masa depan yang lebih berkelanjutan.
            Pilih ECO Gebutas untuk rumah Anda hari ini.
          </p>
          <Link href="/products" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300">
            Mulai Sekarang
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>
      </main>
    </div>
  )
}