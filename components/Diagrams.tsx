
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertTriangle } from 'lucide-react';

// --- DATA ROLLOVER CHART ---
export const DataRolloverChart: React.FC = () => {
  // Month 1: 60 used, 20 left. Month 2: 80 new + 20 left = 100.
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="flex justify-between w-full mb-4 text-sm font-bold text-gray-400">
         <span>MOIS 1</span>
         <span>MOIS 2</span>
      </div>
      
      <div className="flex gap-4 items-center w-full">
        {/* Month 1 Pie */}
        <div className="relative w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center overflow-hidden bg-gray-50">
           <motion.div 
             initial={{ height: 0 }}
             whileInView={{ height: '75%' }}
             transition={{ duration: 1, delay: 0.2 }}
             className="absolute bottom-0 w-full bg-blue-500/20 z-0"
           />
           <div className="z-10 text-center">
              <div className="text-xs text-gray-500">UTILISÉ</div>
              <div className="font-bold text-brand-navy">60 Go</div>
           </div>
           {/* Rollover segment */}
           <motion.div 
             className="absolute top-0 w-full bg-neon-green h-1/4 opacity-50"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 0.5 }}
             transition={{ delay: 1 }}
           />
        </div>

        <div className="flex-1 h-1 bg-gray-100 relative">
            <motion.div 
               className="absolute top-0 left-0 h-full bg-neon-green"
               initial={{ width: 0 }}
               whileInView={{ width: '100%' }}
               transition={{ duration: 0.8, delay: 1 }}
            />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-neon-green whitespace-nowrap">
               GARDEZ 20 Go
            </div>
        </div>

        {/* Month 2 Pie */}
        <div className="relative w-40 h-40 rounded-full border-8 border-neon-green flex items-center justify-center bg-white shadow-[0_0_20px_rgba(0,221,0,0.3)]">
           <div className="text-center">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ type: "spring", delay: 1.8 }}
              >
                <div className="text-3xl font-black text-neon-green">100 Go</div>
                <div className="text-xs font-bold text-gray-400">DISPONIBLE</div>
              </motion.div>
           </div>
        </div>
      </div>
      
      <p className="mt-6 text-xs text-center text-gray-400 italic max-w-xs">
         Les data non utilisées du Mois 1 sont ajoutées au Mois 2. Plafond de report de 200 Go.
      </p>
    </div>
  );
};

// --- PRICE LOCK TIMELINE ---
export const PriceLockTimeline: React.FC = () => {
  return (
    <div className="w-full py-4">
       <h3 className="text-center font-bold text-gray-400 mb-8 uppercase tracking-widest">Prix sur 2 ans</h3>
       
       <div className="relative h-64 flex items-end justify-around gap-4 px-4 border-b border-gray-200">
          
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
             <div className="w-full h-px bg-gray-100 border-dashed border-t border-gray-200"></div>
             <div className="w-full h-px bg-gray-100 border-dashed border-t border-gray-200"></div>
             <div className="w-full h-px bg-gray-100 border-dashed border-t border-gray-200"></div>
          </div>

          {/* Competitors */}
          <div className="w-1/3 h-full flex flex-col justify-end relative">
             <div className="text-center mb-2">
                <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded">Autres</span>
             </div>
             <div className="flex items-end justify-center gap-1 h-full">
                <motion.div 
                  initial={{ height: '10%' }}
                  whileInView={{ height: '40%' }}
                  transition={{ duration: 0.5 }}
                  className="w-1/3 bg-gray-300 rounded-t opacity-50"
                />
                <motion.div 
                  initial={{ height: '10%' }}
                  whileInView={{ height: '60%' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-1/3 bg-gray-400 rounded-t opacity-50"
                />
                <motion.div 
                  initial={{ height: '10%' }}
                  whileInView={{ height: '85%' }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="w-1/3 bg-red-400 rounded-t relative"
                >
                    <div className="absolute -top-6 w-full text-center text-xs font-bold text-red-500">35€+</div>
                </motion.div>
             </div>
             <div className="mt-2 text-center text-xs text-gray-400">Hausses</div>
          </div>

          {/* B.iG FLEX */}
          <div className="w-1/3 h-full flex flex-col justify-end z-10">
             <div className="text-center mb-2">
                <span className="text-xs font-bold text-brand-navy bg-brand-gold px-2 py-1 rounded">B.iG</span>
             </div>
             <motion.div 
                className="w-full bg-brand-gold rounded-t-lg shadow-lg relative flex items-center justify-center"
                initial={{ height: 0 }}
                whileInView={{ height: '40%' }}
                transition={{ type: "spring", delay: 0.6 }}
             >
                <div className="absolute top-4 text-brand-navy font-black text-xl">16,99€</div>
                <div className="absolute bottom-4 text-brand-navy/50 text-xs font-bold">FIXE</div>
             </motion.div>
             <div className="mt-2 text-center text-xs font-bold text-brand-gold">Bloqué 24 Mois</div>
          </div>
       </div>
    </div>
  )
}

// --- COMPARISON TABLE ---
export const ComparisonTable: React.FC = () => {
  const features = [
     { name: "Prix Mensuel", big: "16,99€", others: "20€-35€" },
     { name: "Prix Bloqué", big: "24 Mois", others: "12 Mois" },
     { name: "Option Pause", big: true, others: false },
     { name: "Report de Data", big: true, others: false },
     { name: "Frais d'activation", big: "0€", others: "49€" },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100 bg-white">
       <table className="w-full min-w-[600px]">
          <thead>
             <tr className="bg-brand-navy text-white">
                <th className="p-6 text-left font-bold text-lg">Avantage</th>
                <th className="p-6 text-center font-black text-2xl text-brand-gold bg-white/10 w-1/3">B.iG FLEX</th>
                <th className="p-6 text-center font-bold text-gray-400 w-1/3">FAI Traditionnels</th>
             </tr>
          </thead>
          <tbody>
             {features.map((feat, i) => (
                <motion.tr 
                   key={i} 
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ margin: "-50px" }}
                   transition={{ delay: i * 0.1 }}
                   className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i === features.length - 1 ? 'border-none' : ''}`}
                >
                   <td className="p-6 font-medium text-gray-700">{feat.name}</td>
                   <td className="p-6 text-center font-bold text-brand-navy bg-brand-light/30">
                      {feat.big === true ? 
                        <div className="flex justify-center"><div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center"><Check className="text-neon-green" strokeWidth={3} /></div></div> : 
                        <span className="text-lg">{feat.big}</span>
                      }
                   </td>
                   <td className="p-6 text-center text-gray-500">
                      {feat.others === false ? 
                        <div className="flex justify-center"><X className="text-red-400" /></div> : 
                        <span>{feat.others}</span>
                      }
                   </td>
                </motion.tr>
             ))}
          </tbody>
       </table>
    </div>
  )
}
