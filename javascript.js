document.addEventListener('DOMContentLoaded', () => {
    const endpointURL = 'https://api.covidtracking.com/v1/us/20200501.json'; // Updated API endpoint URL
  
    fetch(endpointURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        const dateSelect = document.getElementById('dateSelect');
        const barContainer = document.getElementById('barContainer');
        const pieContainer = document.getElementById('pieContainer');
      
  
        const selectedData = data; // Use the fetched data directly since there is no date selection
  
        const chartData = {
          positiveIncrease: selectedData.positiveIncrease,
          negativeIncrease: selectedData.negativeIncrease,
          deathIncrease: selectedData.deathIncrease,
          hospitalizedCumulative: selectedData.hospitalizedCumulative,
          inIcuCumulative: selectedData.inIcuCumulative,
          totalTestResults: selectedData.totalTestResults,
          totalTestResultsIncrease: selectedData.totalTestResultsIncrease,
          hospitalizedCurrently: selectedData.hospitalizedCurrently,
          death: selectedData.death,
          inIcuCurrently: selectedData.inIcuCurrently,
          onVentilatorCurrently: selectedData.onVentilatorCurrently,
          pending: selectedData.pending,
          hospitalized: selectedData.hospitalized
        };
  
        renderBarChart(chartData);
        renderPieChart(chartData);
        renderLineChart(chartData);
        renderAreaChart(chartData);
        renderScatterChart(chartData);
  
        // Function to render the Highcharts bar chart
        function renderBarChart(data) {
          barContainer.innerHTML = ''; // Clear the previous chart if any
  
          Highcharts.chart('barContainer', {
            chart: {
              type: 'bar'
            },
            title: {
              text: 'COVID-19 Data'
            },
            xAxis: {
              categories: ['Positive Increase', 'Negative Increase', 'Death Increase', 'Hospitalized Cumulative', 'In ICU Cumulative']
            },
            yAxis: {
              title: {
                text: 'Counts'
              }
            },
            series: [
              {
                name: 'USA',
                data: [
                  data.positiveIncrease,
                  data.negativeIncrease,
                  data.deathIncrease,
                  data.hospitalizedCumulative,
                  data.inIcuCumulative
                ]
              }
            ]
          });
        }
  
        // Function to render the Highcharts pie chart
        function renderPieChart(data) {
          pieContainer.innerHTML = ''; // Clear the previous chart if any
  
          Highcharts.chart('pieContainer', {
            chart: {
              type: 'pie'
            },
            title: {
              text: 'COVID-19 Data Distribution'
            },
            series: [
              {
                name: 'USA',
                data: [
                  { name: 'Positive Cases', y: data.positiveIncrease },
                  { name: 'Negative Cases', y: data.negativeIncrease },
                  { name: 'Hospitalized', y: data.hospitalized },
                  { name: 'Deaths', y: data.death }
                ]
              }
            ]
          });
  
          // Display formatted numbers in HTML elements
          const positiveElement = document.getElementById('positive');
          const positiveIncreaseElement = document.getElementById('positiveIncrease');
          const negativeElement = document.getElementById('negative');
          const negativeIncreaseElement = document.getElementById('negativeIncrease');
          const deathElement = document.getElementById('death');
          const hospitalizedElement = document.getElementById('hospitalized');
  
          positiveElement.textContent = formatNumber(data.positiveIncrease);
          positiveIncreaseElement.textContent = '+' + formatNumber(data.positiveIncrease);
          negativeElement.textContent = formatNumber(data.negativeIncrease);
          negativeIncreaseElement.textContent = '-' + formatNumber(data.negativeIncrease);
          deathElement.textContent = formatNumber(data.death);
          hospitalizedElement.textContent = formatNumber(data.hospitalized);
        }
  

  

  
        // Function to format numbers with commas
        function formatNumber(number) {
          return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      })
      .catch(error => {
        console.log('An error occurred:', error);
      });
  });
  