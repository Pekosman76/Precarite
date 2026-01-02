import React, { useState, useMemo } from 'react';
import Calculator from './components/Calculator';
import InfoSection from './components/InfoSection';
import Faq from './components/Faq';
import { CalculationState, TerminationReason, CalculationResult, CalculationMode } from './types';

const App: React.FC = () => {
  const [formData, setFormData] = useState<CalculationState>({
    mode: 'SIMPLE',
    monthlySalary: '',
    durationMonths: '',
    totalGrossInput: '',
    rate: '10',
    reason: TerminationReason.NORMAL_END,
    isSpecialContract: false,
  });

  const currentYear = new Date().getFullYear();

  const result = useMemo((): CalculationResult => {
    let totalGross = 0;
    let baseLabel = "";

    if (formData.mode === 'SIMPLE') {
      const salary = parseFloat(formData.monthlySalary.replace(',', '.').replace(/\s/g, '')) || 0;
      const duration = parseFloat(formData.durationMonths) || 0;
      totalGross = salary * duration;
      baseLabel = `${formData.monthlySalary || '0'} € × ${formData.durationMonths || '0'} mois`;
    } else {
      totalGross = parseFloat(formData.totalGrossInput.replace(',', '.').replace(/\s/g, '')) || 0;
      baseLabel = `${totalGross} € (Saisie directe)`;
    }

    const rateNum = parseInt(formData.rate) / 100;
    
    let isDue = true;
    let message = "La prime de fin de CDD est due car le contrat arrive à son terme normal.";

    if (formData.reason === TerminationReason.EMPLOYEE_RESIGNATION) {
      isDue = false;
      message = "La prime n'est pas due en cas de rupture anticipée à votre initiative.";
    } else if (formData.reason === TerminationReason.GROSS_MISCONDUCT) {
      isDue = false;
      message = "La prime n'est pas due en cas de licenciement pour faute grave ou lourde.";
    } else if (formData.reason === TerminationReason.CDI_REFUSAL) {
      isDue = false;
      message = "La prime n'est pas due si vous refusez un CDI pour le même poste ou un poste équivalent.";
    } else if (formData.reason === TerminationReason.UNKNOWN) {
      isDue = true;
      message = "Attention : l'éligibilité à l'indemnité de fin de contrat dépend du motif exact. En cas de doute, elle est généralement due sauf exceptions.";
    }

    if (formData.isSpecialContract) {
      isDue = false;
      message = "Attention : Les contrats particuliers n'ouvrent généralement pas droit à la prime de précarité légale.";
    }

    const prime = isDue ? totalGross * rateNum : 0;

    return {
      totalGrossSalary: totalGross,
      primeAmount: prime,
      isDue: isDue,
      message: message,
      calculationDetails: {
        baseLabel: baseLabel,
        rateValue: formData.rate
      }
    };
  }, [formData]);

  const handleReset = () => {
    setFormData({
      mode: 'SIMPLE',
      monthlySalary: '',
      durationMonths: '',
      totalGrossInput: '',
      rate: '10',
      reason: TerminationReason.NORMAL_END,
      isSpecialContract: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-stone-100 py-6 px-4 shadow-soft">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            Prime de précarité CDD – <span className="text-[#8da191]">Calculateur simple et gratuit</span>
          </h1>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8 space-y-12">
        <section className="bg-amber-50 border-l-4 border-amber-300 p-4 rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-800">
                Ce simulateur fournit une estimation basée sur le régime général du droit du travail. Les conventions collectives peuvent prévoir des dispositions plus favorables pour votre <strong>indemnité de fin de contrat</strong>.
              </p>
            </div>
          </div>
        </section>

        <p className="text-stone-500 text-xs md:text-sm text-center -mt-8">
          Simulateur de prime de précarité {currentYear}, gratuit et simple à utiliser. Calculez rapidement votre indemnité de précarité CDD en {currentYear}.
        </p>

        <Calculator formData={formData} setFormData={setFormData} result={result} onReset={handleReset} />

        <InfoSection />

        <Faq />

        <section className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
          <h2 className="text-xl font-bold mb-4">Sources officielles</h2>
          <ul className="space-y-2">
            <li>
              <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F803" target="_blank" rel="noopener noreferrer" className="text-[#8da191] hover:underline flex items-center gap-2">
                <span>Service-Public : Indemnité de fin de contrat (prime de précarité)</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </li>
            <li>
              <a href="https://code.travail.gouv.fr/contribution/2098-dans-le-cadre-dun-cdd-quel-est-le-montant-de-lindemnite-de-fin-de-contrat" target="_blank" rel="noopener noreferrer" className="text-[#8da191] hover:underline flex items-center gap-2">
                <span>Code du travail : Montant de l'indemnité de fin de contrat</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 px-4 mt-auto">
        <div className="max-w-4xl mx-auto space-y-8 text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p>
                Hébergement : OVHcloud SAS – 2 rue Kellermann, 59100 Roubaix – France.
              </p>
            </div>
            <div className="md:text-right">
              <p className="font-semibold text-white mb-2">Outil gratuit d'estimation</p>
              <p>Site informatif indépendant.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800">
            <p className="mb-4">
              Ce site ne collecte ni ne conserve directement de données personnelles.<br />
              Toutefois, des services tiers tels que Google AdSense peuvent utiliser des cookies ou des identifiants afin de diffuser des annonces personnalisées ou non.<br />
              Vous pouvez en savoir plus sur l’utilisation des données par Google ici : 
              <span className="text-[#8da191] ml-1">https://policies.google.com/technologies/ads</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;