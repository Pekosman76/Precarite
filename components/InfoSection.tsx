import React from 'react';

const InfoSection: React.FC = () => {
  const sections = [
    { id: 'definition', title: "1. Qu'est-ce que la prime de précarité ?" },
    { id: 'raison', title: "2. Pourquoi existe-t-elle ?" },
    { id: 'quand', title: "3. Dans quels cas est-elle due ?" },
    { id: 'exclusions', title: "4. Dans quels cas n'est-elle pas versée ?" },
    { id: 'taux', title: "5. Différence entre taux 10 % et 6 %" },
    { id: 'contrats', title: "6. Saisonnier et contrats pro" },
    { id: 'impots', title: "7. Prime de précarité et impôts" },
    { id: 'exemples', title: "8. Exemples concrets de calcul" }
  ];

  return (
    <section className="space-y-12 py-8 border-t border-stone-100">
      <h2 className="text-3xl font-bold text-stone-900 text-center">Comprendre la prime de précarité CDD</h2>
      
      {/* Sommaire - Simple liste non cliquable */}
      <nav className="bg-stone-50 p-6 rounded-2xl border border-stone-100 max-w-2xl mx-auto shadow-sm">
        <p className="font-bold text-stone-800 mb-4 uppercase text-xs tracking-widest text-center">Sections informatives</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm">
          {sections.map(s => (
            <li key={s.id} className="text-stone-600 flex items-center gap-2">
              <span className="w-1 h-1 bg-[#8da191] rounded-full"></span>
              {s.title}
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <article id="definition" className="space-y-3">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8da191] rounded-full"></span>
            1. Qu'est-ce que la prime de précarité ?
          </h3>
          <p className="text-stone-600 leading-relaxed text-sm">
            Officiellement appelée « <strong>indemnité de fin de contrat</strong> », la prime de précarité est un complément de salaire versé à un employé à l'issue d'un contrat à durée déterminée (CDD). Cette <strong>prime de fin de CDD</strong> vise à compenser l'instabilité liée à ce type de contrat temporaire.
          </p>
        </article>

        <article id="raison" className="space-y-3">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8da191] rounded-full"></span>
            2. Pourquoi existe-t-elle ?
          </h3>
          <p className="text-stone-600 leading-relaxed text-sm">
            En droit du travail français, le contrat à durée indéterminée (CDI) est la norme. Le CDD est une exception qui place le salarié dans une situation de "précarité". La prime est là pour rééquilibrer cette situation financièrement au moment du départ de l'entreprise.
          </p>
        </article>

        <article id="quand" className="space-y-3">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8da191] rounded-full"></span>
            3. Dans quels cas est-elle due ?
          </h3>
          <p className="text-stone-600 leading-relaxed text-sm">
            Elle est due dès lors que le CDD arrive à son terme normal et qu'il n'est pas immédiatement suivi d'un CDI dans la même entreprise. Elle s'applique à la majorité des CDD classiques (accroissement d'activité, remplacement de salarié).
          </p>
        </article>

        <article id="exclusions" className="space-y-3">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8da191] rounded-full"></span>
            4. Dans quels cas n'est-elle pas versée ?
          </h3>
          <p className="text-stone-600 leading-relaxed text-sm">
            Les exclusions principales sont : rupture anticipée par le salarié, licenciement pour faute grave, refus d'un CDI proposé, CDD d'usage, contrats aidés (CUI), et CDD conclus avec des étudiants pendant leurs vacances scolaires.
          </p>
        </article>

        <article id="taux" className="space-y-3">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8da191] rounded-full"></span>
            5. Différence entre taux 10 % et 6 %
          </h3>
          <p className="text-stone-600 leading-relaxed text-sm">
            Le <strong>calcul prime de précarité 10 %</strong> est la règle légale. Toutefois, une convention ou un accord de branche peut prévoir de ramener ce taux à 6 % minimum, à condition qu'en contrepartie, l'employeur facilite l'accès à la formation professionnelle pour le salarié.
          </p>
        </article>

        <article id="contrats" className="space-y-3">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8da191] rounded-full"></span>
            6. Saisonnier et contrats pro
          </h3>
          <p className="text-stone-600 leading-relaxed text-sm">
            Le CDD saisonnier, le contrat d'apprentissage et le contrat de professionnalisation sont des régimes dérogatoires. Par défaut, la loi ne prévoit pas de prime pour ces contrats, sauf si la convention collective de l'entreprise est plus favorable au salarié.
          </p>
        </article>

        <article id="impots" className="space-y-3">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8da191] rounded-full"></span>
            7. Prime de précarité et impôts
          </h3>
          <p className="text-stone-600 leading-relaxed text-sm">
            L'indemnité de fin de contrat est considérée comme un complément de salaire. Elle est donc intégralement soumise à l'impôt sur le revenu et aux cotisations sociales (CSG, CRDS). On parle alors de <strong>prime de précarité brut</strong> qui sera net après déductions.
          </p>
        </article>

        <article id="exemples" className="space-y-3">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8da191] rounded-full"></span>
            8. Exemples concrets de calcul
          </h3>
          <p className="text-stone-600 leading-relaxed text-sm">
            Pour un CDD de 3 mois à 2000 € brut : 6000 € cumulés. Prime à 10 % = 600 €. Pour un CDD de 6 mois à 1800 € brut avec un taux réduit à 6 % : 10 800 € cumulés. Prime = 648 €. Utilisez notre simulateur pour un calcul précis.
          </p>
        </article>
      </div>
    </section>
  );
};

export default InfoSection;