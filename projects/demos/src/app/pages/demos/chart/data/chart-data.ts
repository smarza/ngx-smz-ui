export const VERTICAL_BAR_MODEL = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [
          { x: 'Jan', y: 5, data: { value: 5 } },
          { x: 'Feb', y: 10, data: { value: 10 } },
          { x: 'Mar', y: 15, data: { value: 15 } },
          { x: 'Apr', y: 50, data: { value: 50 } },
          { x: 'May', y: 75, data: { value: 75 } },
          { x: 'Jun', y: 45, data: { value: 45 } }
        ],
        borderColor: '#FF0000',
        backgroundColor: '#FF000077'
      },
      {
        label: 'Dataset 2',
        data: [
          { x: 'Jan', y: 7, data: { value: 7 } },
          { x: 'Feb', y: 7, data: { value: 7 } },
          { x: 'Mar', y: 10, data: { value: 10 } },
          { x: 'Apr', y: 60, data: { value: 60 } },
          { x: 'May', y: 30, data: { value: 30 } },
          { x: 'Jun', y: 60, data: { value: 60 } }
        ],
        borderColor: '#00FF00',
        backgroundColor: '#00FF0077'
      }
    ]
  },
  config: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { text: 'Gráfico a partir de modelo' }
    }
  }
};
