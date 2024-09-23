import Link from 'next/link'
import { ArrowRight, ChevronRight, Sun, Leaf, Droplet, Menu } from 'lucide-react'
import { Compare } from '@/components/ui/compare'
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import DotPattern from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import ShimmerButton from '@/components/magicui/shimmer-button'
import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'

export default function LandingPage() {


  return (
    <div className="min-h-screen bg-gradient-to-b md:px-16">
      <Navbar />

      <main className="container mx-auto px-4">
        <section className="text-center flex flex-col py-44 -mt-11">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Atap Masa Depan<br />untuk Bumi yang Lebih Hijau
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            ECO Gebutas menggabungkan bahan ramah lingkungan dengan teknologi panel surya terintegrasi
            untuk menciptakan solusi atap yang baik bagi rumah Anda dan planet kita.
          </p>
          <div className="flex justify-center space-x-4">
              <ShimmerButton className="shadow-2xl">
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
              "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
            )}
          />
        </section>

        <section id="video" className="-mt-32 md:px-24">
          <div className="aspect-video rounded-2xl p-2 border border-zinc-300 overflow-hidden shadow-2xl shadow-green-300 h-fit">
              <HeroVideoDialog
                className="dark:hidden block rounded-xl w-full h-full"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                thumbnailAlt="Cara kerja panel surya"
              />
          </div>
        </section>

        <section id="fitur" className="grid md:grid-cols-2 gap-16 items-center my-32">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Desain Inovatif Ramah Lingkungan</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
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
                <li key={index} className="flex items-center text-gray-700 text-lg">
                  <ChevronRight className="h-6 w-6 text-green-500 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br relative from-green-100 to-green-200 rounded-2xl aspect-square flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
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

        </section>

        <section className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Manfaatkan Kekuatan Matahari</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Varian terintegrasi panel surya kami membawa atap ramah lingkungan ke level berikutnya,
            menghasilkan energi bersih untuk rumah Anda.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sun, title: 'Energi Terbarukan', desc: 'Menghasilkan listrik dari sinar matahari' },
              { icon: Leaf, title: 'Ramah Lingkungan', desc: 'Mengurangi ketergantungan pada bahan bakar fosil' },
              { icon: Droplet, title: 'Tahan Cuaca', desc: 'Dirancang untuk bertahan dalam berbagai kondisi cuaca' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-neutral-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <item.icon className="h-16 w-16 text-green-600 mb-6 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="tentang" className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Tentang ECO Gebutas</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            ECO Gebutas berkomitmen untuk merevolusi industri atap dengan
            solusi berkelanjutan yang tidak mengorbankan kualitas atau estetika.
            Pendekatan inovatif kami menggabungkan keahlian tradisional dengan teknologi
            hijau mutakhir untuk menciptakan genteng atap yang sama baiknya untuk
            lingkungan dan untuk rumah Anda.
          </p>
        </section>

        <section id="testimoni" className="mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">Apa Kata Pelanggan Kami</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Budi Santoso', role: 'Pemilik Rumah', quote: 'ECO Gebutas tidak hanya membuat rumah saya lebih hemat energi, tetapi juga meningkatkan nilai properti saya.' },
              { name: 'Siti Rahayu', role: 'Arsitek', quote: 'Sebagai arsitek, saya selalu mencari solusi berkelanjutan. ECO Gebutas adalah jawaban sempurna untuk proyek-proyek ramah lingkungan.' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-neutral-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <p className="text-gray-600 mb-6 italic text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-800 font-semibold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Bergabunglah dalam Revolusi Atap Hijau</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Jadilah bagian dari perubahan menuju masa depan yang lebih berkelanjutan.
            Pilih ECO Gebutas untuk rumah Anda hari ini.
          </p>
            <Link href="/products">
              Mulai Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
        </section>
      </main>
    </div>
  )
}