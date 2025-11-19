
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Check, Star, Shield, Smartphone, 
  Wifi, PauseCircle, RotateCcw, Lock, Globe, MessageCircle, 
  ChevronDown, Instagram, Youtube, Twitter, Facebook, PlayCircle
} from 'lucide-react';
import { GenZHeroScene } from './components/QuantumScene';
import { DataRolloverChart, PriceLockTimeline, ComparisonTable } from './components/Diagrams';

// --- UI Components ---

const Button = ({ 
  children, variant = 'primary', className = '', onClick, size = 'md' 
}: { 
  children: React.ReactNode, variant?: 'primary' | 'secondary' | 'outline' | 'hot', className?: string, onClick?: () => void, size?: 'sm' | 'md' | 'lg' 
}) => {
  const base = "font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-neon-pink text-white hover:shadow-[0_8px_24px_rgba(230,0,126,0.3)] hover:-translate-y-0.5",
    secondary: "bg-white text-electric-blue hover:bg-gray-50",
    outline: "border-2 border-white text-white hover:bg-white/10",
    hot: "bg-gradient-to-r from-neon-pink to-electric-purple text-white hover:shadow-lg hover:scale-[1.02]"
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg h-[60px]"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle, align = 'center', color = 'text-brand-navy' }: { title: string, subtitle?: string, align?: 'left' | 'center', color?: string }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <h2 className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${color}`}>{title}</h2>
    {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button 
        className="w-full py-6 text-left flex justify-between items-center focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-bold text-brand-navy group-hover:text-electric-blue transition-colors">{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-electric-blue' : 'text-gray-400'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Layout ---

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-neon-pink selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-sm py-3' : 'bg-white py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {/* Logo updated to be more 'real' - Text based with specific weight */}
            <div className="flex items-baseline tracking-tighter">
              <span className="text-3xl font-black text-brand-navy">B.iG</span>
              <span className="text-3xl font-black text-electric-blue ml-1">FLEX</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <a href="#features" className="hover:text-electric-blue transition-colors">Avantages</a>
            <a href="#pricing" className="hover:text-electric-blue transition-colors">Tarifs</a>
            <a href="#faq" className="hover:text-electric-blue transition-colors">FAQ</a>
            <Button size="sm" className="!py-2">Je m'abonne</Button>
          </div>

          <button className="md:hidden p-2 text-brand-navy" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
             <div className="flex flex-col gap-6 text-xl font-bold text-brand-navy">
                <a href="#features" onClick={() => setMobileMenuOpen(false)}>Avantages</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Tarifs</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <Button className="w-full mt-4" onClick={() => setMobileMenuOpen(false)}>J'en profite</Button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-hero-gradient">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-80">
          <GenZHeroScene />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
             <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>PAUSEZ.</motion.div>
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-brand-gold">REPORTEZ.</motion.div>
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>ÉCONOMISEZ.</motion.div>
             </h1>
             <p className="text-2xl md:text-3xl font-medium mb-2 text-white/90">16,99€<span className="text-lg">/mois</span>. L'Internet pensé pour la Gen Z.</p>
             <p className="text-lg text-white/70 mb-8 max-w-md">Pausez 2 mois gratuitement. Reportez vos gigas inutilisés. Prix bloqué pendant 24 mois.</p>
             
             <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
               <input 
                 type="email" 
                 placeholder="Votre email" 
                 className="px-6 py-4 rounded-lg text-brand-navy w-full sm:w-auto focus:ring-4 focus:ring-neon-pink/30 outline-none"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
               />
               <Button variant="primary" size="lg" className="whitespace-nowrap">
                 {submitted ? "C'est parti ! 🚀" : "J'en profite maintenant"}
               </Button>
             </form>
             
             <div className="flex items-center gap-4 text-sm font-medium opacity-80">
                <span className="flex items-center gap-1"><Check size={16} className="text-neon-green"/> Sans engagement</span>
                <span className="flex items-center gap-1"><Check size={16} className="text-neon-green"/> 14 jours d'essai</span>
             </div>
          </motion.div>
          
          {/* Abstract Visual Right Side (Desktop) */}
          <div className="hidden md:flex justify-center">
             {/* The 3D scene covers the background, this space is kept for spacing balance */}
          </div>
        </div>
      </header>

      <main>
        {/* Feature 1: PAUSE */}
        <section id="features" className="py-32 bg-soft-blue overflow-hidden">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Visual Representation of Pause */}
              <div className="aspect-square bg-gradient-to-tr from-electric-blue to-white rounded-3xl shadow-2xl flex items-center justify-center relative p-12">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <PauseCircle size={180} className="text-white drop-shadow-lg" />
                 <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Statut</div>
                    <div className="text-3xl font-black text-electric-blue flex items-center gap-2">EN PAUSE <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-electric-blue"></span></span></div>
                 </div>
              </div>
            </motion.div>
            
            <div>
              <h2 className="text-5xl font-black text-electric-blue mb-6">PAUSEZ 2 MOIS GRATUITEMENT.</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vacances ? Semestre à l'étranger ? Ou juste besoin d'un break ? Mettez votre abonnement en pause depuis l'appli. Sans frais. Sans résiliation. Reprenez quand vous voulez.
              </p>
              <ul className="space-y-4">
                {[
                  "Jusqu'à 2 mois de pause par an",
                  "Gardez votre numéro et compte actif",
                  "Activation en un clic sur l'app"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg font-medium text-brand-navy">
                    <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Feature 2: KEEP */}
        <section className="py-32 bg-soft-green overflow-hidden">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-5xl font-black text-neon-green mb-6">CONSERVEZ VOS GIGAS.</h2>
              <div className="inline-block bg-neon-green/10 text-neon-green px-4 py-1 rounded-full font-bold text-sm mb-6">
                65% DE LA GEN Z LE RÉCLAME
              </div>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vous avez utilisé 60 Go sur 80 Go ? Pourquoi perdre le reste ? Nous les reportons. Le mois suivant, vous commencez avec 100 Go. C'est vos data, vous avez payé pour.
              </p>
              <Button variant="outline" className="!border-neon-green !text-neon-green hover:!bg-neon-green hover:!text-white">
                Voir comment ça marche
              </Button>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
               <h3 className="text-center font-bold text-gray-400 mb-8 uppercase tracking-widest">Votre Portefeuille Data</h3>
               <DataRolloverChart />
            </motion.div>
          </div>
        </section>

        {/* Feature 3: SAVE */}
        <section className="py-32 bg-soft-purple overflow-hidden">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
             >
                <PriceLockTimeline />
             </motion.div>
             
             <div>
              <h2 className="text-5xl font-black text-brand-gold mb-6">PRIX BLOQUÉ 24 MOIS.</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                16,99€. Premier mois, chaque mois, jusqu'au 24ème mois. Pas de hausse surprise après un an. Pas de fausse promo. Juste un prix clair et honnête.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                   <div className="text-3xl font-black text-brand-navy mb-1">0€</div>
                   <div className="text-sm text-gray-500">Frais cachés</div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                   <div className="text-3xl font-black text-brand-navy mb-1">100%</div>
                   <div className="text-sm text-gray-500">Prévisible</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 bg-white">
           <div className="container mx-auto px-6">
              <SectionHeader title="Adoré par la Gen Z" subtitle="Rejoignez plus de 50 000 étudiants et jeunes actifs." />
              
              <div className="grid md:grid-cols-3 gap-6">
                 {[
                   { name: "Sarah, 21 ans", role: "Étudiante @ Sorbonne", text: "La fonction pause m'a fait économiser 34€ pendant mon voyage à Bali cet été. Une vraie révolution.", color: "bg-electric-blue/5" },
                   { name: "Marc, 24 ans", role: "Designer Freelance", text: "Enfin un FAI qui ne double pas le prix après 12 mois. Et le débit est monstrueux.", color: "bg-neon-purple/5" },
                   { name: "Léa, 19 ans", role: "En échange Erasmus", text: "Installation instantanée. L'appli est super fluide. Le support sur WhatsApp ? Le rêve.", color: "bg-neon-pink/5" },
                 ].map((review, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -10 }}
                      className={`p-8 rounded-2xl ${review.color} border border-transparent hover:border-gray-200 transition-all`}
                    >
                       <div className="flex text-brand-gold mb-4">
                          {[...Array(5)].map((_,j) => <Star key={j} size={16} fill="currentColor" />)}
                       </div>
                       <p className="text-lg font-medium text-brand-navy mb-6">"{review.text}"</p>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">{review.name[0]}</div>
                          <div>
                             <div className="font-bold text-brand-navy">{review.name}</div>
                             <div className="text-xs text-gray-500 uppercase tracking-wide">{review.role}</div>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Comparison */}
        <section className="py-24 bg-gray-50">
           <div className="container mx-auto px-6">
              <SectionHeader title="Pourquoi B.iG gagne" />
              <ComparisonTable />
           </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-white">
           <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto bg-brand-navy rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
                 {/* Decorative Glow */}
                 <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue blur-[120px] opacity-30 rounded-full pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-pink blur-[120px] opacity-30 rounded-full pointer-events-none"></div>

                 <div className="relative z-10 text-center">
                    <h2 className="text-3xl font-bold mb-2">Le Pack B.iG</h2>
                    <p className="text-gray-400 mb-8">Tout ce dont vous avez besoin. Rien de superflu.</p>
                    
                    <div className="flex justify-center items-baseline gap-2 mb-8">
                       <span className="text-7xl md:text-9xl font-black text-brand-gold tracking-tighter">16,99€</span>
                       <span className="text-xl text-gray-400">/ mois</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-y-4 gap-x-12 text-left max-w-2xl mx-auto mb-12">
                       {[
                         "Fibre Internet 300Mbps", "80Go Data Mobile 5G",
                         "Appels & SMS Illimités", "Pause GRATUITE (2 mois/an)",
                         "Report de Data GRATUIT", "Prix Bloqué 24 Mois",
                         "Pas de frais d'activation", "Résiliation facile après 12 mois"
                       ].map((feat, i) => (
                          <div key={i} className="flex items-center gap-3">
                             <div className="w-5 h-5 rounded-full bg-neon-green flex items-center justify-center">
                               <Check size={12} className="text-brand-navy font-bold" strokeWidth={4} />
                             </div>
                             <span className="font-medium text-lg">{feat}</span>
                          </div>
                       ))}
                    </div>

                    <Button variant="hot" size="lg" className="w-full md:w-auto min-w-[300px] text-xl !rounded-full">
                       Essai gratuit 14 jours
                    </Button>
                    <p className="mt-6 text-sm text-gray-500">Aucune carte bancaire requise pour l'essai.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-gray-50">
           <div className="container mx-auto px-6 max-w-3xl">
              <SectionHeader title="Une question ?" subtitle="C'est simple, mais voici les détails." />
              <div className="space-y-2">
                 <FAQItem question="C'est quoi exactement la fonction PAUSE ?" answer="Vous pouvez suspendre votre abonnement jusqu'à 2 mois par an. Pendant cette période, vous payez 0€. Pas d'internet, pas de facture. Idéal pour les vacances d'été ou les stages. Vous réactivez instantanément depuis l'app." />
                 <FAQItem question="Le report de data fonctionne vraiment ?" answer="Oui. Si vous avez 80 Go et n'en utilisez que 20, les 60 Go restants sont ajoutés au mois suivant. Vous pouvez cumuler jusqu'à 200 Go au total." />
                 <FAQItem question="Le prix est-il vraiment bloqué ?" answer="Absolument. Le prix auquel vous souscrivez est celui que vous paierez pendant au moins 24 mois. Nous garantissons aucune hausse liée à l'inflation ou frais cachés durant cette période." />
                 <FAQItem question="Quelle est la vitesse de la fibre ?" answer="Vous bénéficiez de débits symétriques jusqu'à 300 Mbps en téléchargement et en envoi. Faible latence, parfait pour le gaming et le streaming 4K." />
              </div>
           </div>
        </section>

        {/* Trust / Final CTA */}
        <section className="py-24 bg-brand-navy text-white text-center">
           <div className="container mx-auto px-6">
               <div className="grid md:grid-cols-3 gap-12 mb-16 border-b border-white/10 pb-16">
                  <div className="flex flex-col items-center gap-4">
                     <Shield size={48} className="text-electric-blue" />
                     <h3 className="font-bold text-xl">Sécurisé & Privé</h3>
                     <p className="text-gray-400 text-sm">Chiffrement bancaire et conformité RGPD totale.</p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                     <Globe size={48} className="text-neon-pink" />
                     <h3 className="font-bold text-xl">Réseau Bouygues</h3>
                     <p className="text-gray-400 text-sm">Propulsé par l'infrastructure fibre la plus fiable de France.</p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                     <MessageCircle size={48} className="text-neon-green" />
                     <h3 className="font-bold text-xl">Support WhatsApp 24/7</h3>
                     <p className="text-gray-400 text-sm">Des vrais humains. Pas de robots. Réponse moyenne en 2 min.</p>
                  </div>
               </div>

               <h2 className="text-4xl font-bold mb-6">Prêt à changer ?</h2>
               <p className="text-xl text-gray-400 mb-8">Les 1 000 premiers inscrits ce mois-ci reçoivent un pack data bonus de 20 Go.</p>
               
               <form onSubmit={handleFormSubmit} className="max-w-md mx-auto flex flex-col gap-4">
                   <div className="flex gap-2 bg-white p-1 rounded-lg">
                      <input 
                        type="email" 
                        placeholder="Entrez votre email" 
                        className="flex-1 px-4 py-3 text-brand-navy outline-none rounded-md"
                        required
                      />
                      <Button className="!py-3">Je Rejoins</Button>
                   </div>
                   <p className="text-xs text-gray-500">En rejoignant, vous acceptez nos Conditions de Service.</p>
               </form>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-gray-500 py-16 border-t border-white/5">
         <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
            <div className="col-span-2 md:col-span-1">
               <div className="text-white font-black text-xl mb-4">B.iG <span className="text-electric-blue">FLEX</span></div>
               <p className="mb-4">L'Internet construit pour la nouvelle génération.</p>
               <div className="flex gap-4">
                  <Twitter className="hover:text-white cursor-pointer transition-colors" size={20} />
                  <Instagram className="hover:text-white cursor-pointer transition-colors" size={20} />
                  <Youtube className="hover:text-white cursor-pointer transition-colors" size={20} />
               </div>
            </div>
            
            <div>
               <h4 className="text-white font-bold mb-4">Produit</h4>
               <ul className="space-y-2">
                  <li><a href="#" className="hover:text-electric-blue">Fonctionnalités</a></li>
                  <li><a href="#" className="hover:text-electric-blue">Tarifs</a></li>
                  <li><a href="#" className="hover:text-electric-blue">Couverture</a></li>
                  <li><a href="#" className="hover:text-electric-blue">Test de débit</a></li>
               </ul>
            </div>
             <div>
               <h4 className="text-white font-bold mb-4">Entreprise</h4>
               <ul className="space-y-2">
                  <li><a href="#" className="hover:text-electric-blue">À propos</a></li>
                  <li><a href="#" className="hover:text-electric-blue">Carrières</a></li>
                  <li><a href="#" className="hover:text-electric-blue">Presse</a></li>
                  <li><a href="#" className="hover:text-electric-blue">Blog</a></li>
               </ul>
            </div>
             <div>
               <h4 className="text-white font-bold mb-4">Aide</h4>
               <ul className="space-y-2">
                  <li><a href="#" className="hover:text-electric-blue">Centre d'aide</a></li>
                  <li><a href="#" className="hover:text-electric-blue">Contact</a></li>
                  <li><a href="#" className="hover:text-electric-blue">Communauté</a></li>
                  <li><a href="#" className="hover:text-electric-blue">État du réseau</a></li>
               </ul>
            </div>
             <div>
               <h4 className="text-white font-bold mb-4">Légal</h4>
               <ul className="space-y-2">
                  <li><a href="#" className="hover:text-electric-blue">Confidentialité</a></li>
                  <li><a href="#" className="hover:text-electric-blue">CGV</a></li>
                  <li><a href="#" className="hover:text-electric-blue">Cookies</a></li>
               </ul>
            </div>
         </div>
         <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs">
            &copy; 2025 B.iG FLEX par Bouygues Telecom. Tous droits réservés.
         </div>
      </footer>
    </div>
  );
};

export default App;
