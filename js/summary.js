import { mean, median } from './stats.js';

const countDisplay = document.getElementById('count');
const graduatedDisplay = document.getElementById('graduated');
const graduatedSubDisplay = document.getElementById('graduated-sub');
const employedDisplay = document.getElementById('employed');
const employedSubDisplay = document.getElementById('employed-sub');
const interimDisplay = document.getElementById('interim');
const interimSubDisplay = document.getElementById('interim-sub');
const seekingDisplay = document.getElementById('seeking');
const seekingSubDisplay = document.getElementById('seeking-sub');

const meanDisplay = document.getElementById('mean');
const medianDisplay = document.getElementById('median');
const monthsDisplay = document.getElementById('months');

export default {
    load(outcomes) {
        countDisplay.textContent = outcomes.length;
        const categories = getCategories(outcomes);
        graduatedDisplay.textContent = formatPercent(categories.graduated / outcomes.length);
        graduatedSubDisplay.textContent = categories.graduated;
        employedDisplay.textContent = formatPercent(categories.employed / categories.graduated);
        employedSubDisplay.textContent = categories.employed;
        interimDisplay.textContent = formatPercent(categories.interim / categories.graduated);
        interimSubDisplay.textContent = categories.interim;
        seekingDisplay.textContent = formatPercent(categories.seeking / categories.graduated);
        seekingSubDisplay.textContent = categories.seeking;

        const salaries = getSalaries(outcomes);
        meanDisplay.textContent = formatDollar(mean(salaries));
        medianDisplay.textContent = formatDollar(median(salaries));
        monthsDisplay.textContent = getMonths(outcomes);
    }
};

const getCategories = outcomes => outcomes.reduce((c, o) => {
    if(o.isGrad) c.graduated++;
    else return c;

    if(o.isEmployed === 'Yes') c.employed++;
    else if(o.interimWork) c.interim++;
    else c.seeking++;

    return c;
}, { graduated: 0, employed: 0, interim: 0, seeking: 0 });

const getSalaries = outcomes => outcomes
    .map(outcome => outcome.annualizedSalary)
    .filter(salary => !!salary);

const getMonths = outcomes => {
    const weeks = outcomes
        .filter(outcome => outcome.isGrad && outcome.isEmployed === 'Yes')
        .map(outcome => outcome.searchWeeks);

    return (mean(weeks) / 4.2).toFixed(1);
};

const usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3
});

const percent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumSignificantDigits: 3
});

const formatDollar = amount => amount ? usd.format(amount) : '-';

const formatPercent = value => value ? percent.format(value) : '-';

  