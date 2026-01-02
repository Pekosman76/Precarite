// app.js - Logique de calcul et interactivité Vanilla pour Prime de précarité CDD

document.addEventListener('DOMContentLoaded', () => {
    // --- Éléments du DOM ---
    const elements = {
        seoTagline: document.getElementById('seo-tagline'),
        btnModeSimple: document.getElementById('btn-mode-simple'),
        btnModeTotal: document.getElementById('btn-mode-total'),
        inputsSimple: document.getElementById('inputs-simple'),
        inputsTotal: document.getElementById('inputs-total'),
        inputSalary: document.getElementById('input-monthly-salary'),
        inputDuration: document.getElementById('input-duration'),
        inputTotalGrossInput: document.getElementById('input-total-gross-input'),
        selectReason: document.getElementById('select-reason'),
        checkSpecial: document.getElementById('check-special'),
        btnReset: document.getElementById('btn-reset'),
        displayPrime: document.getElementById('display-prime'),
        displayTotalGrossVal: document.getElementById('display-total-gross-val'),
        displayFormula: document.getElementById('display-formula'),
        displayRate: document.getElementById('display-rate'),
        displayFinalTotal: document.getElementById('display-final-total'),
        resultMessageBox: document.getElementById('result-message-box'),
        specialWarning: document.getElementById('special-warning'),
        faqList: document.getElementById('faq-list')
    };

    // --- État initial ---
    let state = {
        mode: 'SIMPLE', // SIMPLE ou TOTAL
        rate: '10'      // '10' ou '6'
    };

    // --- Initialisation SEO ---
    const currentYear = new Date().getFullYear();
    if (elements.seoTagline) {
        elements.seoTagline.textContent = `Simulateur de prime de précarité ${currentYear}, gratuit et simple à utiliser. Calculez rapidement votre indemnité de précarité CDD en ${currentYear}.`;
    }

    // --- Helpers ---
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    const parseNum = (str) => {
        if (!str) return 0;
        // Gère "1 234,56", "1234,56", "1234.56"
        return parseFloat(str.toString().replace(',', '.').replace(/\s/g, '')) || 0;
    };

    // --- Logique de Calcul ---
    const updateCalculations = () => {
        let totalGross = 0;
        let baseLabel = "";

        // 1. Détermination du cumul brut
        if (state.mode === 'SIMPLE') {
            const salary = parseNum(elements.inputSalary.value);
            const duration = parseFloat(elements.inputDuration.value) || 0;
            totalGross = salary * duration;
            baseLabel = `${elements.inputSalary.value || '0'} € × ${duration} mois`;
        } else {
            totalGross = parseNum(elements.inputTotalGrossInput.value);
            baseLabel = `Cumul brut total saisi`;
        }

        // 2. Éligibilité et Message
        let isDue = true;
        let message = "La prime de fin de CDD est due car le contrat arrive à son terme normal.";
        let messageClass = "bg-green-50 text-green-800";

        const reason = elements.selectReason.value;
        if (reason === 'EMPLOYEE_RESIGNATION') {
            isDue = false;
            message = "La prime n'est pas due en cas de rupture anticipée à votre initiative.";
            messageClass = "bg-red-100 text-red-800";
        } else if (reason === 'GROSS_MISCONDUCT') {
            isDue = false;
            message = "La prime n'est pas due en cas de licenciement pour faute grave ou lourde.";
            messageClass = "bg-red-100 text-red-800";
        } else if (reason === 'CDI_REFUSAL') {
            isDue = false;
            message = "La prime n'est pas due si vous refusez un CDI pour le même poste ou un poste équivalent.";
            messageClass = "bg-red-100 text-red-800";
        } else if (reason === 'UNKNOWN') {
            isDue = true; // On affiche la prime par défaut
            message = "Attention : l'éligibilité dépend du motif exact. En cas de doute, elle est généralement due sauf exceptions.";
            messageClass = "bg-amber-50 text-amber-800";
        }

        // Cas contrat particulier
        if (elements.checkSpecial.checked) {
            isDue = false;
            message = "Attention : Les contrats particuliers n'ouvrent généralement pas droit à la prime de précarité légale.";
            messageClass = "bg-red-100 text-red-800";
            elements.specialWarning.classList.remove('hidden');
        } else {
            elements.specialWarning.classList.add('hidden');
        }

        // 3. Calcul Final
        const rateValue = parseInt(state.rate) / 100;
        const prime = isDue ? (totalGross * rateValue) : 0;

        // 4. Mise à jour de l'UI
        elements.displayPrime.textContent = formatCurrency(prime);
        elements.displayTotalGrossVal.textContent = formatCurrency(totalGross);
        elements.displayFormula.textContent = `↳ ${baseLabel}`;
        elements.displayRate.textContent = `${state.rate} %`;
        elements.displayFinalTotal.textContent = formatCurrency(prime);
        
        elements.resultMessageBox.textContent = message;
        elements.resultMessageBox.className = `text-sm p-4 rounded-xl leading-relaxed font-medium ${messageClass}`;

        // Couleur dynamique du montant
        if (isDue) {
            elements.displayPrime.classList.remove('text-red-600');
            elements.displayPrime.classList.add('text-[#8da191]');
        } else {
            elements.displayPrime.classList.remove('text-[#8da191]');
            elements.displayPrime.classList.add('text-red-600');
        }
    };

    // --- Événements ---

    // Toggle Mode
    elements.btnModeSimple.addEventListener('click', () => {
        state.mode = 'SIMPLE';
        elements.btnModeSimple.classList.add('bg-stone-800', 'text-white', 'border-stone-800');
        elements.btnModeSimple.classList.remove('bg-white', 'text-stone-600', 'border-stone-100');
        elements.btnModeTotal.classList.add('bg-white', 'text-stone-600', 'border-stone-100');
        elements.btnModeTotal.classList.remove('bg-stone-800', 'text-white', 'border-stone-800');
        elements.inputsSimple.classList.remove('hidden');
        elements.inputsTotal.classList.add('hidden');
        updateCalculations();
    });

    elements.btnModeTotal.addEventListener('click', () => {
        state.mode = 'TOTAL';
        elements.btnModeTotal.classList.add('bg-stone-800', 'text-white', 'border-stone-800');
        elements.btnModeTotal.classList.remove('bg-white', 'text-stone-600', 'border-stone-100');
        elements.btnModeSimple.classList.add('bg-white', 'text-stone-600', 'border-stone-100');
        elements.btnModeSimple.classList.remove('bg-stone-800', 'text-white', 'border-stone-800');
        elements.inputsTotal.classList.remove('hidden');
        elements.inputsSimple.classList.add('hidden');
        updateCalculations();
    });

    // Inputs
    [elements.inputSalary, elements.inputDuration, elements.inputTotalGrossInput, elements.selectReason, elements.checkSpecial].forEach(el => {
        el.addEventListener('input', updateCalculations);
    });

    // Radios Taux
    document.querySelectorAll('input[name="rate"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.rate = e.target.value;
            updateCalculations();
        });
    });

    // Reset
    elements.btnReset.addEventListener('click', () => {
        elements.inputSalary.value = '';
        elements.inputDuration.value = '';
        elements.inputTotalGrossInput.value = '';
        elements.selectReason.value = 'NORMAL_END';
        elements.checkSpecial.checked = false;
        document.querySelector('input[name="rate"][value="10"]').checked = true;
        state.rate = '10';
        elements.btnModeSimple.click(); // Reset mode UI
        updateCalculations();
    });

    // --- Restauration FAQ ---
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

    if (elements.faqList) {
        FAQ_ITEMS.forEach((item, index) => {
            const faqDiv = document.createElement('div');
            faqDiv.className = "border-b border-stone-200 last:border-0";
            
            const button = document.createElement('button');
            button.className = "w-full py-4 text-left flex justify-between items-center group";
            button.innerHTML = `
                <span class="font-medium text-stone-800 group-hover:text-[#78927b] transition-colors">${item.q}</span>
                <svg class="w-5 h-5 transition-transform duration-200 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            `;

            const contentDiv = document.createElement('div');
            contentDiv.className = "overflow-hidden transition-all duration-300 max-h-0";
            contentDiv.innerHTML = `<p class="text-stone-600 text-sm leading-relaxed pb-4">${item.a}</p>`;

            button.addEventListener('click', () => {
                const isOpen = contentDiv.classList.contains('max-h-40');
                // Fermeture des autres (optionnel, ici on laisse multi-ouvert)
                contentDiv.classList.toggle('max-h-40', !isOpen);
                contentDiv.classList.toggle('max-h-0', isOpen);
                button.querySelector('svg').classList.toggle('rotate-180', !isOpen);
                button.querySelector('svg').classList.toggle('text-[#78927b]', !isOpen);
            });

            faqDiv.appendChild(button);
            faqDiv.appendChild(contentDiv);
            elements.faqList.appendChild(faqDiv);
        });
    }

    // Initialisation du calcul au chargement
    updateCalculations();
});
