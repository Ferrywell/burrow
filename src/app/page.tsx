'use client'

import { useState } from 'react'
import { MapPin, MessageCircle, CreditCard, Tent, Car, Calendar, ArrowRight } from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Groepscommunicatie",
      description: "Chat, ping en deel locaties met je festivalgroep"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Locatie delen",
      description: "Vind elkaar makkelijk op het festivalterrein"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Onkosten beheer",
      description: "Houd bij wat iedereen betaalt en split later"
    },
    {
      icon: <Tent className="w-6 h-6" />,
      title: "Tent-indeling",
      description: "Organiseer wie waar slaapt"
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Vervoer planning",
      description: "Deel auto's en plan ritten"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Festival planning",
      description: "Plan welke artiesten je wilt zien"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-purple-600">🐰 Burrow</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                  Features
                </a>
                <a href="#festivals" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                  Festivals
                </a>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  Start App
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welkom in de <span className="text-yellow-300">Konijnenburcht</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              De ultieme app voor festivalgroepen. Communiceer, deel locaties, beheer onkosten en plan je festival ervaring samen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                <span>Start met Burrow</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Meer informatie
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Alles wat je nodig hebt voor je festivalgroep
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Burrow maakt het organiseren van je festival ervaring eenvoudig en leuk
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Section */}
      <section id="festivals" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Speciaal voor Down the Rabbit Hole
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De eerste beta versie is speciaal ontwikkeld voor Down the Rabbit Hole 2024
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Down the Rabbit Hole 2024
                </h3>
                <p className="text-gray-600 mb-6">
                  Van 28 tot 30 juni 2024 in Beuningen, Nederland. Een unieke festival ervaring met de beste indie, rock en elektronische muziek.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    Timetable integratie met alle podia
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    Artiest voorkeuren en planning
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    Locatie delen op het festivalterrein
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    Groepscommunicatie en coördinatie
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-8 text-white text-center">
                <h4 className="text-xl font-semibold mb-4">Beta Test Programma</h4>
                <p className="mb-6">
                  Wees een van de eerste om Burrow te testen tijdens Down the Rabbit Hole 2024
                </p>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Meld je aan voor de beta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar om te beginnen?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Maak je festival ervaring onvergetelijk met Burrow
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Start nu met Burrow
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">🐰 Burrow</h3>
            <p className="text-gray-400 mb-6">
              De konijnenburcht voor festivalgroepen
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Voorwaarden</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
