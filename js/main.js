let currentChart = null;

// Set default Chart.js theme
Chart.defaults.color = '#ffffff';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const entry = {};
        
        headers.forEach((header, index) => {
            entry[header.trim()] = values[index].trim();
        });
        
        data.push(entry);
    }
    
    return { headers, data };
}

function generateChart() {
    const chartType = document.getElementById('chartType').value;
    const rawData = document.getElementById('dataInput').value;
    
    if (!rawData) {
        alert('Please input some data first!');
        return;
    }
    
    const { headers, data } = parseCSV(rawData);
    
    // Destroy existing chart if it exists
    if (currentChart) {
        currentChart.destroy();
    }
    
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    
    const chartData = {
        labels: data.map(item => item[headers[0]]),
        datasets: [{
            label: headers[1],
            data: data.map(item => parseFloat(item[headers[1]])),
            backgroundColor: [
                'rgba(66, 133, 244, 0.5)',
                'rgba(219, 68, 55, 0.5)',
                'rgba(244, 180, 0, 0.5)',
                'rgba(15, 157, 88, 0.5)',
                'rgba(171, 71, 188, 0.5)',
            ],
            borderColor: [
                'rgba(66, 133, 244, 1)',
                'rgba(219, 68, 55, 1)',
                'rgba(244, 180, 0, 1)',
                'rgba(15, 157, 88, 1)',
                'rgba(171, 71, 188, 1)',
            ],
            borderWidth: 2
        }]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#ffffff'
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#ffffff'
                }
            }
        }
    };
    
    currentChart = new Chart(ctx, {
        type: chartType,
        data: chartData,
        options: options
    });
}

// Example data to show when page loads
document.getElementById('dataInput').value = `Category,Value
A,10
B,20
C,15
D,25
E,30`;
