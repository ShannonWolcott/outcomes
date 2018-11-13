import filters from './filters.js';
import summary from './summary.js';

fetch('data/outcomes.json')
    .then(result => result.json())
    .then(outcomes => {
        filters.load(outcomes, filter => {
            const filtered = applyFilters(outcomes, filter);
            summary.load(filtered);
        });

        summary.load(outcomes);
    });

function applyFilters(outcomes, { years, demos }) {
    return outcomes.filter(o => {
        if(!years.includes(o.gradYear)) return false;

        const hasGender = (!demos.women && !demos.men)
            || (demos.women && o.women)
            || (demos.men && !o.women);

        const hasBinary = !demos.LBGTQ
            || (demos.LBGTQ && demos.women && demos.men)
            || (demos.LBGTQ && o.LBGTQ);

        const hasRace = (!demos.africanAmerican && !demos.latinx && !demos.otherMinority && !demos.white)
            || (demos.africanAmerican && o.africanAmerican)
            || (demos.latinx && o.latinx)
            || (demos.otherMinority && o.otherMinority)
            || (demos.white && (
                !o.africanAmerican && 
                !o.latinx && 
                !o.otherMinority));

        return hasGender && hasBinary && hasRace;
    });
}
/*
{ value: 'women', label: 'Women' },
{ value: 'men', label: 'Men' },
{ value: 'LBGTQ', label: 'LBGTQ' },
{ value: 'africanAmerican', label: 'African American' },
{ value: 'latinx', label: 'Latinx' },
{ value: 'otherMinority', label: 'Other Minority' },
{ value: 'white', label: 'White or Asian' },
{ value: 'veteran', label: 'Veterans' }
*/