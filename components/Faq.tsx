
import React, { useState } from 'react';

const FAQ_ITEMS = [
  { q: "La prime de précarité est-elle imposable ?", a: "Oui, elle est soumise à l'impôt sur le revenu comme un salaire classique." },
  { q: "Est-elle due en CDD saisonnier ?", a: "Non, sauf si un accord collectif ou une clause du contrat le prévoit explicitement." },
  { q: "Est-elle versée en cas de CDI après CDD ?", a: "Non, si le salarié enchaîne immédiatement sur un CDI (sans interruption) sur le même poste ou un poste similaire." },
  { q: "Quand est-elle payée ?", a: "Elle doit être versée à la fin du contrat, en même temps que le dernier salaire, et figurer sur le solde de tout compte." },
  { q: "Peut-on la négocier ?", a: "Non, c'est un droit légal d'ordre public. L'employeur ne peut pas vous demander d'y renoncer, mais le taux peut être discuté s'il n'y a pas d'accord de branche." },
  { q: "Est-elle obligatoire ?", a: "Oui, dès lors que les conditions de versement sont remplies. L'absence de mention dans le contrat ne dispense pas l'employeur." },
  { q: "Prime de précarité et arrêt maladie ?", a: "Les périodes d'arrêt maladie suspendent le contrat mais ne réduisent pas le droit à la prime sur les salaires effectivement perçus." },
  { q: "Prime de précarité et temps partiel ?", a: "Absolument. Elle s'applique exactement de la même manière, basée sur le salaire brut perçu au prorata du temps travaillé." },
  { q: "Est-elle indiquée sur le solde de tout compte ?", a: "Oui, elle doit apparaître distinctement sur le dernier bulletin de paie et le reçu pour solde de tout compte." },
  { q: "Que faire en cas de non-paiement ?", a: "Contactez d'abord votre employeur (LRAR). Si le litige persiste, le Conseil de Prud'hommes est la juridiction compétente." }
];

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 text-left flex justify-between items-center group"
      >
        <span className="font-medium text-stone-800 group-hover:text-[#78927b] transition-colors">{q}</span>
        <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#78927b]' : 'text-stone-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-4' : 'max-h-0'}`}>
        <p className="text-stone-600 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
      <h2 className="text-2xl font-bold mb-6">Questions fréquentes (FAQ)</h2>
      <div className="divide-y divide-stone-100">
        {FAQ_ITEMS.map((item, idx) => (
          <FaqItem key={idx} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
};

export default Faq;
