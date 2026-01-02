import React from 'react';
import { CalculationState, TerminationReason, CalculationResult, CalculationMode } from '../types';

interface Props {
  formData: CalculationState;
  setFormData: React.Dispatch<React.SetStateAction<CalculationState>>;
  result: CalculationResult;
  onReset: () => void;
}

const Calculator: React.FC<Props> = ({ formData, setFormData, result, onReset }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Form Card */}
      <div className="bg-white p-6 rounded-2xl shadow-soft border border-stone-100 space-y-6">
        <h2 className="text-xl font-bold text-stone-900 border-b border-stone-50 pb-4">Calculer ma prime</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Méthode de saisie</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setFormData(prev => ({ ...prev, mode: 'SIMPLE' }))}
                className={`flex-1 py-2 px-3 text-xs font-medium border rounded-lg transition-all ${formData.mode === 'SIMPLE' ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-600 border-stone-100 hover:bg-stone-50'}`}
              >
                Salaire mensuel
              </button>
              <button 
                onClick={() => setFormData(prev => ({ ...prev, mode: 'TOTAL' }))}
                className={`flex-1 py-2 px-3 text-xs font-medium border rounded-lg transition-all ${formData.mode === 'TOTAL' ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-600 border-stone-100 hover:bg-stone-50'}`}
              >
                Cumul brut total
              </button>
            </div>
          </div>

          {formData.mode === 'SIMPLE' ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Salaire brut (€)</label>
                <input 
                  type="text" 
                  placeholder="Ex: 1850"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8da191] outline-none transition-all text-sm"
                  value={formData.monthlySalary}
                  onChange={(e) => setFormData(prev => ({ ...prev, monthlySalary: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Durée (mois)</label>
                <input 
                  type="number" 
                  placeholder="Ex: 6"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8da191] outline-none transition-all text-sm"
                  value={formData.durationMonths}
                  onChange={(e) => setFormData(prev => ({ ...prev, durationMonths: e.target.value }))}
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Total des salaires bruts perçus (€)</label>
              <input 
                type="text" 
                placeholder="Ex: 12450,80"
                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8da191] outline-none transition-all text-sm"
                value={formData.totalGrossInput}
                onChange={(e) => setFormData(prev => ({ ...prev, totalGrossInput: e.target.value }))}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Taux de la prime</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer p-3 border border-stone-100 rounded-lg flex-1 transition-colors hover:bg-stone-50">
                <input 
                  type="radio" 
                  checked={formData.rate === '10'} 
                  onChange={() => setFormData(prev => ({ ...prev, rate: '10' }))}
                  className="w-4 h-4 accent-[#8da191]"
                />
                <span className="text-sm font-medium">10 % (Défaut)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 border border-stone-100 rounded-lg flex-1 transition-colors hover:bg-stone-50">
                <input 
                  type="radio" 
                  checked={formData.rate === '6'} 
                  onChange={() => setFormData(prev => ({ ...prev, rate: '6' }))}
                  className="w-4 h-4 accent-[#8da191]"
                />
                <span className="text-sm font-medium">6 % (Accord)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Motif de fin de contrat</label>
            <select 
              className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8da191] outline-none transition-all text-sm"
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value as TerminationReason }))}
            >
              <option value={TerminationReason.NORMAL_END}>Fin normale du CDD</option>
              <option value={TerminationReason.EMPLOYEE_RESIGNATION}>Rupture anticipée (Salarié)</option>
              <option value={TerminationReason.GROSS_MISCONDUCT}>Faute grave / Licenciement</option>
              <option value={TerminationReason.CDI_REFUSAL}>Refus d'un CDI proposé</option>
              <option value={TerminationReason.UNKNOWN}>Autre / Je ne sais pas</option>
            </select>
          </div>

          <label className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg border border-stone-100 cursor-pointer">
            <input 
              type="checkbox" 
              className="mt-1 w-4 h-4 accent-[#8da191]"
              checked={formData.isSpecialContract}
              onChange={(e) => setFormData(prev => ({ ...prev, isSpecialContract: e.target.checked }))}
            />
            <span className="text-xs text-stone-600 leading-tight">
              Il s'agit d'un contrat particulier (saisonnier, apprentissage, professionnalisation, CUI, contrat d'usage).
            </span>
          </label>
        </div>

        <button 
          onClick={onReset}
          className="w-full py-2 text-xs font-medium text-stone-400 hover:text-stone-700 transition-colors uppercase tracking-wider"
        >
          Réinitialiser
        </button>
      </div>

      {/* Result Card */}
      <div className={`p-6 rounded-2xl shadow-soft border transition-all duration-300 sticky top-8 ${result.isDue ? 'bg-white border-stone-100' : 'bg-red-50 border-red-100'}`}>
        <h2 className="text-xl font-bold text-stone-900 border-b border-stone-50 pb-4 mb-6">Estimation de la prime</h2>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-stone-500 text-xs uppercase tracking-wider font-semibold">Indemnité estimée</p>
            <p className={`text-5xl font-bold mt-1 ${result.isDue ? 'text-[#8da191]' : 'text-red-600'}`}>
              {formatCurrency(result.primeAmount)}
            </p>
          </div>

          <div className="bg-stone-50 rounded-xl p-5 space-y-3 text-sm border border-stone-100/50">
            <p className="font-bold text-stone-800 text-xs uppercase mb-2 tracking-tight">Détail du calcul</p>
            <div className="flex justify-between items-center text-stone-600">
              <span>Salaire brut total</span>
              <span className="font-semibold text-stone-900">{formatCurrency(result.totalGrossSalary)}</span>
            </div>
            <div className="text-[10px] text-stone-400 font-mono italic">
              ↳ {result.calculationDetails.baseLabel}
            </div>
            <div className="flex justify-between items-center text-stone-600 pt-1">
              <span>Taux appliqué</span>
              <span className="font-semibold text-stone-900">{formData.rate} %</span>
            </div>
            <div className="border-t border-stone-200 pt-3 flex justify-between font-bold text-stone-900 text-lg">
              <span>Prime brute</span>
              <span>{formatCurrency(result.primeAmount)}</span>
            </div>
          </div>

          {formData.isSpecialContract && (
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r">
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                <p className="text-xs text-orange-900 leading-normal">
                  <strong>Contrat particulier :</strong> La prime de précarité légale n'est généralement pas due pour les saisonniers, apprentis ou contrats de professionnalisation.
                </p>
              </div>
            </div>
          )}

          <div className="pt-2">
            <p className={`text-sm p-4 rounded-xl leading-relaxed font-medium ${result.isDue ? 'bg-green-50 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {result.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;