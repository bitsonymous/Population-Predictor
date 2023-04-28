// function to calculate the interpolated population for a given year
function interpolatePopulation(year) {
    let x = [1990, 1995, 2000, 2005, 2010, 2015, 2020];
    let y = [33636, 36245, 38878, 41573, 43997, 46156, 48784];
    let yp = 0;
    let p;
    for (let i = 0; i < x.length; i++) {
        p = 1;
        for (let j = 0; j < x.length; j++) {
            if (i !== j) {
                p *= (year - x[j]) / (x[i] - x[j]);
            }
        }
        yp += p * y[i];
    }
    return yp;
}

// get form elements
const form = document.getElementById('pop-form');
const yearInput = document.getElementById('year-input');
const predictBtn = document.getElementById('predict-btn');
const resultContainer = document.getElementById('result-container');

// function to handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // get input value and calculate interpolated population
    const year = parseInt(yearInput.value);
    const population = interpolatePopulation(year);

    // display result
    resultContainer.innerText = `The predicted population in ${year} is ${population.toFixed(2)} / 100.\n Data for this result is collected from these of datas
    1990, 1995, 2000, 2005, 2010, 2015, 2020`;''});
