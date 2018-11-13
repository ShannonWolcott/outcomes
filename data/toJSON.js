/* eslint-env node */   
const fs = require('fs');
const CSV = require('csv-string');

const file = fs.readFileSync('alumni.csv', 'utf8');

const [fields, ...rows] = CSV.parse(file);

const data = rows
    .map(row => {
        const obj = {};
        fields.forEach((field, i) => {
            obj[field] = row[i];
        });
        return obj;
    })
    .map(data => {
        return {
            women: !!data.women,
            otherMinority: !!data.otherMinority,
            LBGTQ: !!data.LBGTQ,
            africanAmerican: !!data.africanAmerican,
            veteran: !!data.veteran,
            latinx: !!data.latinx,
            chip: data.chip === 'TRUE',
            gradYear: data.gradYear ? +new Number(data.gradYear) : '',
            isGrad: data.isGrad === 'Yes',
            isEmployed: data.isEmployed,
            interimWork: data.interimWork === 'Yes',
            interimWorkType: data.interimWorkType,
            annualizedSalary: data.annualizedSalary ? +new Number(data.annualizedSalary) : '',
            positionType: data.positionType,
            searchWeeks: +new Number(data.searchWeeks)
        };
    });

fs.writeFileSync('outcomes.json', JSON.stringify(data, true, 2));