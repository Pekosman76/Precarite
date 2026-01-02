// Logique interactive du calculateur de prime de précarité CDD (Vanilla JS)
document.addEventListener('DOMContentLoaded', () => {
    // Éléments UI
    const seoTagline = document.getElementById('seo-tagline');
    const btnModeSimple = document.getElementById('btn-mode-simple');
    const btnModeTotal = document.getElementById('btn-mode-total');
    const inputsSimple = document.getElementById('inputs-simple');
    const inputsTotal = document.getElementById('inputs-total');
    
    const inputSalary = document.getElementById('input-monthly-salary') as HTMLInputElement;
    const inputDuration = document.getElementById('input-duration') as HTMLInputElement;
    const inputTotalGross = document.getElementById('input-total-gross-input') as HTMLInputElement;
    const selectReason = document.getElementById('select-reason') as HTMLSelectElement;
    const checkSpecial = document.getElementById('check-special') as HTMLInputElement;
    const btnReset = document.getElementById('btn-reset');
    
    const displayPrime = document.getElementById('display-prime');
    const displayTotalGrossVal = document.getElementById('display-total-gross-val');
    const displayFormula = document.getElementById('display-formula');
    const displayRate = document.getElementById('display-rate');
    const displayFinalTotal = document.getElementById('display-final-total');
    const resultMsg = document.getElementById('result-message-box');
    const resultContainer = document.getElementById('result-container');
    const specialWarning = document.getElementById('special-warning');
    const faqList = document.getElementById('faq-list');

    // État local
    let state = {
        mode: 'SIMPLE',
        rate: '10'
    };

    const currentYear = new Date().getFullYear();
    if (seoTagline) {
        seoTagline.textContent = `Simulateur de prime de précarité ${currentYear}, gratuit et simple à utiliser. Calculez rapidement votre indemnité de précarité CDD en ${currentYear}.`;
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(val);
    };

    const parseNum = (str: string) => {
        return parseFloat(str.replace(',', '.').replace(/\s/g, '')) || 0;
    };

    const updateUI = () => {
        let totalGross = 0;
        let baseLabel = "";

        if (state.mode === 'SIMPLE') {
            const salary = parseNum(inputSalary.value);
            const duration = parseFloat(inputDuration.value) || 0;
            totalGross = salary * duration;
            baseLabel = `${salary} € × ${duration} mois`;
        } else {
            totalGross = parseNum(inputTotalGross.value);
            baseLabel = `${totalGross} € (Saisie directe)`;
        }

        const rateNum = parseInt(state.rate) / 100;
        let isDue = true;
        let message = "La prime de fin de CDD est due car le contrat arrive à son terme normal.";

        const reason = selectReason.value;
        if (reason === 'EMPLOYEE_RESIGNATION') {
            isDue = false;
            message = "La prime n'est pas due en cas de rupture anticipée à votre initiative.";
        } else if (reason === 'GROSS_MISCONDUCT') {
            isDue = false;
            message = "La prime n'est pas due en cas de licenciement pour faute grave ou lourde.";
        } else if (reason === 'CDI_REFUSAL') {
            isDue = false;
            message = "La prime n'est pas due si vous refusez un CDI pour le même poste ou un poste équivalent.";
        } else if (reason === 'UNKNOWN') {
            message = "Attention : l'éligibilité dépend du motif exact. En cas de doute, elle est généralement due sauf exceptions.";
        }

        if (checkSpecial.checked) {
            isDue = false;
            message = "Attention : Les contrats particuliers n'ouvrent généralement pas droit à la prime légale.";
            specialWarning?.classList.remove('hidden');
        } else {
            specialWarning?.classList.add('hidden');
        }

        const prime = isDue ? totalGross * rateNum : 0;

        // Mise à jour visuelle
        if (displayPrime) displayPrime.textContent = formatCurrency(prime);
        if (displayTotalGrossVal) displayTotalGrossVal.textContent = formatCurrency(totalGross);
        if (displayFormula) displayFormula.textContent = `↳ ${baseLabel}`;
        if (displayRate) displayRate.textContent = `${state.rate} %`;
        if (displayFinalTotal) displayFinalTotal.textContent = formatCurrency(prime);
        if (resultMsg) {
            resultMsg.textContent = message;
            resultMsg.className = `text-sm p-4 rounded-xl leading-relaxed font-medium ${isDue ? 'bg-green-50 text-green-800' : 'bg-red-100 text-red-800'}`;
        }
        
        if (resultContainer) {
            resultContainer.className = `p-6 rounded-2xl shadow-soft border transition-all duration-300 sticky top-8 ${isDue ? 'bg-white border-stone-100' : 'bg-red-50 border-red-100'}`;
            const amountEl = displayPrime as HTMLElement;
            amountEl.className = `text-5xl font-bold mt-1 ${isDue ? 'text-[#8da191]' : 'text-red-600'}`;
        }
    };

    // Events
    btnModeSimple?.addEventListener('click', () => {
        state.mode = 'SIMPLE';
        btnModeSimple.className = "flex-1 py-2 px-3 text-xs font-medium border rounded-lg transition-all bg-stone-800 text-white border-stone-800";
        btnModeTotal!.className = "flex-1 py-2 px-3 text-xs font-medium border rounded-lg transition-all bg-white text-stone-600 border-stone-100 hover:bg-stone-50";
        inputsSimple?.classList.remove('hidden');
        inputsTotal?.classList.add('hidden');
        updateUI();
    });

    btnModeTotal?.addEventListener('click', () => {
        state.mode = 'TOTAL';
        btnModeTotal.className = "flex-1 py-2 px-3 text-xs font-medium border rounded-lg transition-all bg-stone-800 text-white border-stone-800";
        btnModeSimple!.className = "flex-1 py-2 px-3 text-xs font-medium border rounded-lg transition-all bg-white text-stone-600 border-stone-100 hover:bg-stone-50";
        inputsTotal?.classList.remove('hidden');
        inputsSimple?.classList.add('hidden');
        updateUI();
    });

    [inputSalary, inputDuration, inputTotalGross, selectReason, checkSpecial].forEach(el => {
        el?.addEventListener('input', updateUI);
    });

    document.querySelectorAll('input[name="rate"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.rate = (e.target as HTMLInputElement).value;
            updateUI();
        });
    });

    btnReset?.addEventListener('click', () => {
        inputSalary.value = '';
        inputDuration.value = '';
        inputTotalGross.value = '';
        selectReason.value = 'NORMAL_END';
        checkSpecial.checked = false;
        state.mode = 'SIMPLE';
        state.rate = '10';
        (document.querySelector('input[name="rate"][value="10"]') as HTMLInputElement).checked = true;
        btnModeSimple?.click();
        updateUI();
    });

    // FAQ - Restauration de l'intégralité des 10 questions
    const faqItems = [
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

    if (faqList) {
        faqList.innerHTML = ''; // Évite les doublons si le HTML contenait déjà des éléments
        faqItems.forEach(item => {
            const div = document.createElement('div');
            div.className = "border-b border-stone-200 last:border-0";
            div.innerHTML = `
                <button class="w-full py-4 text-left flex justify-between items-center group faq-btn">
                    <span class="font-medium text-stone-800 group-hover:text-[#78927b] transition-colors">${item.q}</span>
                    <svg class="w-5 h-5 transition-transform duration-200 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div class="faq-ans overflow-hidden transition-all duration-300 max-h-0">
                    <p class="text-stone-600 text-sm leading-relaxed pb-4">${item.a}</p>
                </div>
            `;
            faqList.appendChild(div);
            
            const btn = div.querySelector('.faq-btn');
            const ans = div.querySelector('.faq-ans');
            const icon = div.querySelector('svg');
            
            btn?.addEventListener('click', () => {
                const isOpen = ans?.classList.contains('max-h-40');
                ans?.classList.toggle('max-h-40', !isOpen);
                ans?.classList.toggle('max-h-0', isOpen);
                icon?.classList.toggle('rotate-180', !isOpen);
            });
        });
    }

    updateUI();
});