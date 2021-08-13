export const VERTICAL_BAR = {
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
        borderColor: '#000FF00',
        backgroundColor: '#00FF0077'
      }
    ]
  },
  config: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }
};

export const HORIZONTAL_BAR = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [
          { y: 'Jan', x: 5, data: { value: 5 } },
          { y: 'Feb', x: 10, data: { value: 10 } },
          { y: 'Mar', x: 15, data: { value: 15 } },
          { y: 'Apr', x: 50, data: { value: 50 } },
          { y: 'May', x: 75, data: { value: 75 } },
          { y: 'Jun', x: 45, data: { value: 45 } }
        ],
        borderColor: '#FF0000',
        backgroundColor: '#FF000077'
      },
      {
        label: 'Dataset 2',
        data: [
          { y: 'Jan', x: 7, data: { value: 7 } },
          { y: 'Feb', x: 7, data: { value: 7 } },
          { y: 'Mar', x: 10, data: { value: 10 } },
          { y: 'Apr', x: 60, data: { value: 60 } },
          { y: 'May', x: 30, data: { value: 30 } },
          { y: 'Jun', x: 60, data: { value: 60 } }
        ],
        borderColor: '#0000CC',
        backgroundColor: '#0000CC77'
      }
    ]
  },
  config: {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  }
};

export const STACKED_BAR = {
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
        backgroundColor: '#FF0000'
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
        backgroundColor: '#0000FF'
      },
      {
        label: 'Dataset 3',
        data: [
          { x: 'Jan', y: 2, data: { value: 2 } },
          { x: 'Feb', y: 15, data: { value: 15 } },
          { x: 'Mar', y: 5, data: { value: 5 } },
          { x: 'Apr', y: 30, data: { value: 30 } },
          { x: 'May', y: 30, data: { value: 30 } },
          { x: 'Jun', y: 10, data: { value: 10 } }
        ],
        backgroundColor: '#00FF0077'
      }
    ]
  },
  config: {
    plugins: {
      title: {
        display: true,
        text: 'Bar Chart - Stacked'
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  }
};

export const ROUNDED_BAR = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Data 1',
        data: [
          { x: 'Jan', y: 5, data: { value: 5 } },
          { x: 'Feb', y: 10, data: { value: 10 } },
          { x: 'Mar', y: 15, data: { value: 15 } },
          { x: 'Apr', y: 50, data: { value: 50 } },
          { x: 'May', y: 75, data: { value: 75 } },
          { x: 'Jun', y: 45, data: { value: 45 } }
        ],
        borderColor: '#FF0000',
        backgroundColor: '#FF000077',
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false
      },
      {
        label: 'Data 2',
        data: [
          { x: 'Jan', y: 7, data: { value: 7 } },
          { x: 'Feb', y: 7, data: { value: 7 } },
          { x: 'Mar', y: 10, data: { value: 10 } },
          { x: 'Apr', y: 60, data: { value: 60 } },
          { x: 'May', y: 30, data: { value: 30 } },
          { x: 'Jun', y: 60, data: { value: 60 } }
        ],
        borderColor: '#5500FF',
        backgroundColor: '#5500FF77',
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false
      }
    ]
  },
  config: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }
};

export const LINE = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [
          { x: 'Jan', y: 25, data: { value: 25 } },
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
          { x: 'Feb', y: 45, data: { value: 45 } },
          { x: 'Mar', y: 55, data: { value: 55 } },
          { x: 'Apr', y: 60, data: { value: 60 } },
          { x: 'May', y: 30, data: { value: 30 } },
          { x: 'Jun', y: 60, data: { value: 60 } }
        ],
        borderColor: '#5500FF',
        backgroundColor: '#5500FF77'
      }
    ]
  },
  config: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Line Chart'
      }
    }
  }
};

export const DOUGHNUT = {
  type: 'doughnut',
  data: {
    labels: ['Green', 'Blue', 'Orange', 'Red', 'Yellow'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [25, 20, 15, 5, 5],
        extraData: [
          { x: 'Jan', y: 5, data: { value: 5 } },
          { x: 'Feb', y: 15, data: { value: 15 } },
          { x: 'Mar', y: 5, data: { value: 5 } },
          { x: 'Apr', y: 25, data: { value: 25 } },
          { x: 'May', y: 20, data: { value: 20 } }
        ],
        backgroundColor: ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236']
      }
    ]
  },
  config: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
    }
  }
};

export const PIE = {
  type: 'pie',
  data: {
    labels: ['Green', 'Blue', 'Orange', 'Red', 'Yellow'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [25, 20, 15, 5, 5],
        extraData: [
          { x: 'Jan', y: 5, data: { value: 5 } },
          { x: 'Feb', y: 15, data: { value: 15 } },
          { x: 'Mar', y: 5, data: { value: 5 } },
          { x: 'Apr', y: 25, data: { value: 25 } },
          { x: 'May', y: 20, data: { value: 20 } }
        ],
        backgroundColor: ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236']
      }
    ]
  },
  config: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
    }
  }
};

export const POLAR_AREA = {
  type: 'polarArea',
  data: {
    labels: ['Green', 'Blue', 'Orange', 'Red', 'Yellow'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [25, 20, 15, 5, 5],
        extraData: [
          { x: 'Jan', y: 5, data: { value: 5 } },
          { x: 'Feb', y: 15, data: { value: 15 } },
          { x: 'Mar', y: 5, data: { value: 5 } },
          { x: 'Apr', y: 25, data: { value: 25 } },
          { x: 'May', y: 20, data: { value: 20 } }
        ],
        backgroundColor: ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236'],
        hoverBackgroundColor: ['#4dc9f644', '#f6701944', '#f5379444', '#537bc444', '#acc23644']

      }
    ]
  },
  config: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
    }
  }
};

export const COMBO = {
  data: {
    datasets: [
      {
        type: 'bar',
        fill: true,
        backgroundColor: '#537bc477',
        borderColor: '#537bc4',
        borderWidth: 2,
        data: [
          { x: 'Jan', y: 7, data: { value: 7 } },
          { x: 'Feb', y: 45, data: { value: 45 } },
          { x: 'Mar', y: 55, data: { value: 55 } },
          { x: 'Apr', y: 60, data: { value: 60 } },
          { x: 'May', y: 30, data: { value: 30 } },
          { x: 'Jun', y: 60, data: { value: 60 } }
        ],
        label: 'Dataset 2',
        order: 1
      },
      {
        type: 'line',
        fill: false,
        backgroundColor: '#f53794',
        borderColor: '#f53794',
        borderWidth: 2,
        tension: 0,
        data: [
          { x: 'Jan', y: 25, data: { value: 25 } },
          { x: 'Feb', y: 10, data: { value: 10 } },
          { x: 'Mar', y: 15, data: { value: 15 } },
          { x: 'Apr', y: 50, data: { value: 50 } },
          { x: 'May', y: 75, data: { value: 75 } },
          { x: 'Jun', y: 45, data: { value: 45 } }
        ],
        label: 'Dataset 1',
        order: 0
      }
    ],
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun'
    ],
  },
  type: 'bar',
  config: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Chart.js Combined Line/Bar Chart'
      }
    }
  }
};

export const IAGM = {
  data: {
    datasets: [
      {
        type: 'line',
        fill: false,
        backgroundColor: '#be5651ff',
        borderColor: '#be5651',
        borderWidth: 3.0,
        pointBackgroundColor: '#be5651ff',
        pointBorderColor: '#be5651ff',
        pointRadius: 5,
        tension: 0.0,
        yAxisID: 'y',
        pointStyle: 'triangle',
        data: [
          {
            x: 'JAN/2021',
            y: 2.0,
            data: []
          },
          {
            x: 'FEV/2021',
            y: 3.0,
            data: []
          },
          {
            x: 'MAR/2021',
            y: 3.0,
            data: []
          },
          {
            x: 'ABR/2021',
            y: 4.0,
            data: []
          },
          {
            x: 'MAI/2021',
            y: 5.0,
            data: []
          },
          {
            x: 'JUN/2021',
            y: 5.0,
            data: []
          }
        ],
        id: 'concluded',
        label: 'Mudanças Concluídas',
      },
      {
        type: 'bar',
        fill: true,
        backgroundColor: '#9db167',
        borderColor: '#9db167',
        barPercentage: 0.5,
        yAxisID: 'y1',
        data: [
          {
            x: 'JAN/2021',
            y: 28.6,
            data: []
          },
          {
            x: 'FEV/2021',
            y: 27.3,
            data: []
          },
          {
            x: 'MAR/2021',
            y: 21.4,
            data: []
          },
          {
            x: 'ABR/2021',
            y: 26.7,
            data: []
          },
          {
            x: 'MAI/2021',
            y: 33.3,
            data: []
          },
          {
            x: 'JUN/2021',
            y: 18.5,
            data: []
          }
        ],
        id: 'iagm',
        label: 'IAGM',
        borderWidth: 2.0,
      },
      {
        type: 'line',
        fill: false,
        backgroundColor: '#4e81bdff',
        borderColor: '#4e81bd',
        borderWidth: 3.0,
        pointBackgroundColor: '#4e81bdff',
        pointBorderColor: '#4e81bd',
        pointRadius: 5,
        tension: 0.0,
        yAxisID: 'y',
        pointStyle: 'rectRot',
        data: [
          {
            x: 'JAN/2021',
            y: 7.0,
            data: []
          },
          {
            x: 'FEV/2021',
            y: 11.0,
            data: []
          },
          {
            x: 'MAR/2021',
            y: 14.0,
            data: []
          },
          {
            x: 'ABR/2021',
            y: 15.0,
            data: []
          },
          {
            x: 'MAI/2021',
            y: 15.0,
            data: []
          },
          {
            x: 'JUN/2021',
            y: 27.0,
            data: []
          }
        ],
        id: 'open',
        label: 'Total de Mudanças',
      },
    ],
    labels: [
      'JAN/2021',
      'FEV/2021',
      'MAR/2021',
      'ABR/2021',
      'MAI/2021',
      'JUN/2021'
    ]
  },
  type: 'bar',
  config: {
    layout: {
      padding: { top: 5, left: 0, right: 0, bottom: 0 }
    },
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'nearest',
      axis: 'xy'
    },
    scales: {
      y: {
        display: true,
        position: 'left',
        grid: {
          drawOnChartArea: true
        },
        title: {
          display: true,
          text: 'Qtde de Mudanças',
          padding: { top: 0, left: 0, right: 0, bottom: 10 }
        },
      },
      y1: {
        display: true,
        position: 'right',
        min: 0.0,
        max: 100.0,
        ticks: {
          stepSize: 25
        },
        grid: {
          drawOnChartArea: false
        },
        title: {
          display: true,
          text: 'IAGM (%)',
          color: 'black',
        }
      }
    },
    plugins: {
      title: {
        color: 'cornflowerblue',
        display: true,
        font: {
          size: 16,
        },
        padding: { top: 20, left: 0, right: 0, bottom: 20 },
        text: 'Índice de Atendimento de Gestão de Mudanças',
        align: 'center',
      },
      tooltip: {
        intersect: false,
        enabled: true,
        mode: 'nearest',
      },
      legend: {
        align: 'start',
        display: true,
        labels: {
          usePointStyle: true
        },
        position: 'bottom',
        title: {
          display: true,
          padding: {
            top: 20,
          },
          position: 'start',
          text: 'Legenda',
        },
      }
    }
  }
};