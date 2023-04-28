// function to calculate the interpolated population for a given year
function interpolatePopulation(year, x, y) {
    let result = 0;
    for (let i = 0; i < x.length; i++) {
        let term = y[i];
        for (let j = 0; j < x.length; j++) {
            if (j !== i) {
                term = term * (year - x[j]) / (x[i] - x[j]);
            }
        }
        result += term;
    }
    return result;
}

// get form elements and chart canvas
const form = document.getElementById('pop-form');
const currentPopInput = document.getElementById('current-pop');
const growthRateInput = document.getElementById('growth-rate');
const yearsInput = document.getElementById('years');
const predictBtn = document.getElementById('predict-btn');
const chartCanvas = document.getElementById('pop-chart');

// set default chart options
Chart.defaults.global.legend.display = false;
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.elements.line.fill = false;

// initialize empty chart
const chart = new Chart(chartCanvas, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: [],
            borderColor: '#4CAF50',
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    stepSize: 1
                }
            }]
        }
    }
});

// function to update chart with predicted population values
function updateChart(labels, data) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

// function to display prediction result
function displayResult(result) {
    const resultContainer = document.getElementById('prediction-result');
    resultContainer.innerText = `The predicted population in ${yearsInput.value} years is ${result.toFixed(2)}.`;
}

// function to handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // get form values
    const currentPop = parseInt(currentPopInput.value);
    const growthRate = parseInt(growthRateInput.value);
    const years = parseInt(yearsInput.value);

    // calculate population for each year
    let yearsArr = [];
    let popsArr = [];
    for (let i = 0; i <= years; i++) {
        yearsArr.push(i);
        popsArr.push(interpolatePopulation(i, [0, 10], [currentPop, currentPop * (1 + (growthRate/100) * 10)]));
    }

    // update chart and display result
    updateChart(yearsArr, popsArr);
    displayResult(popsArr[years]);
});
