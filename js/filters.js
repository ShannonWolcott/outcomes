import html from './html.js';

const makeCheckbox = name => (value, label = value) => html`
    <label>
        <input name="${name}" 
            type="checkbox" 
            value="${value}" 
            checked>
        ${label}
    </label>
`;

const makeYear = makeCheckbox('years');
const makeDemo = makeCheckbox('demos');

const form = document.getElementById('filters');
const yearsFields = document.querySelector('fieldset.years');
const demosFields = document.querySelector('fieldset.demos');

export default {
    load(outcomes, onFilter) {
        this.outcomes = outcomes;
        this.onFilter = onFilter;
        this.loadYears();
        this.loadDemographics();
        form.addEventListener('change', () => {
            const data = new FormData(form);
            const years = data.getAll('years').map(y => +y);
            const demos = demoCodes.reduce((d, { value }) => {
                d[value] = false;
                return d;
            }, {});
            data.getAll('demos').forEach(value => demos[value] = true);

            onFilter({ years, demos });
        });
    },
    loadYears() {
        const years = new Set(this.outcomes.map(o => o.gradYear));
        years.forEach(year => {
            yearsFields.appendChild(makeYear(year));
        });
    },
    loadDemographics() {
        demoCodes.forEach(({ value, label }) => {
            demosFields.appendChild(makeDemo(value, label));
        });
    }
};

const demoCodes = [
    { value: 'women', label: 'Women' },
    { value: 'men', label: 'Men' },
    { value: 'LBGTQ', label: 'LBGTQ' },
    { value: 'africanAmerican', label: 'African American' },
    { value: 'latinx', label: 'Latinx' },
    { value: 'otherMinority', label: 'Other Minority' },
    { value: 'white', label: 'White or Asian' },
    { value: 'veteran', label: 'Veterans' }
];