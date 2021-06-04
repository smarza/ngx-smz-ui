export const BASIC = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          { x: 'Jan', y: 12, data: { value: 12 } },
          { x: 'Feb', y: 19, data: { value: 19 } },
          { x: 'Mar', y: 3, data: { value: 3 } },
          { x: 'Apr', y: 5, data: { value: 5 } },
          { x: 'May', y: 2, data: { value: 2 } },
          { x: 'Jun', y: 3, data: { value: 3 } }
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

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
  options: {
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
  options: {
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
  options: {
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
  options: {
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
  options: {
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
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [5, 15, 5, 25, 20],
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
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      }
    }
  }
};

export const PIE = {
  type: 'pie',
  data: {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [5, 15, 5, 25, 20],
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
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart'
      }
    }
  }
};

export const POLAR_AREA = {
  type: 'polarArea',
  data: {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [5, 15, 5, 25, 20],
        extraData: [
          { x: 'Jan', y: 5, data: { value: 5 } },
          { x: 'Feb', y: 15, data: { value: 15 } },
          { x: 'Mar', y: 5, data: { value: 5 } },
          { x: 'Apr', y: 25, data: { value: 25 } },
          { x: 'May', y: 20, data: { value: 20 } }
        ],
        backgroundColor: [
          '#4dc9f644',
          '#f6701944',
          '#f5379444',
          '#537bc444',
          '#acc23644'
        ]
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Chart.js Polar Area Chart'
      }
    }
  }
};

export const COMBO = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
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
        borderColor: '#537bc4',
        backgroundColor: '#537bc477',
        borderWidth: 2,
        order: 1
      },
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
        borderColor: '#f53794',
        backgroundColor: '#f53794',
        type: 'line',
        order: 0
      }
    ]
  },
  options: {
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
