export const IAGM_CSHARP = {
  "data": {
    "datasets": [
      {
        "type": "line",
        "fill": false,
        "backgroundColor": "#BE5651ff",
        "borderColor": "#BE5651",
        "borderWidth": 3.0,
        "pointBackgroundColor": "#BE5651",
        "pointBorderColor": "#BE5651",
        "pointRadius": 5.0,
        "tension": 0.0,
        "yAxisID": "y",
        "pointStyle": "triangle",
        "data": [
          {
            "x": "JAN/2021",
            "y": 2.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 3.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 3.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 4.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 5.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 5.0,
            "data": []
          }
        ],
        "id": "concluded",
        "label": "Mudanças Concluídas",
        "normalized": true,
        "order": 0
      },
      {
        "type": "bar",
        "fill": true,
        "backgroundColor": "#9DB167ff",
        "borderColor": "#9DB167",
        "borderWidth": 2.0,
        "barPercentage": 0.5,
        "pointBackgroundColor": "#9DB167",
        "pointBorderColor": "#9DB167",
        "yAxisID": "y1",
        "data": [
          {
            "x": "JAN/2021",
            "y": 28.6,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 27.3,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 21.4,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 26.7,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 33.3,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 18.5,
            "data": []
          }
        ],
        "id": "iagm",
        "label": "IAGM",
        "normalized": true,
        "order": 2
      },
      {
        "type": "line",
        "fill": false,
        "backgroundColor": "#4E81BDff",
        "borderColor": "#4E81BD",
        "borderWidth": 3.0,
        "pointBackgroundColor": "#4E81BD",
        "pointBorderColor": "#4E81BD",
        "pointRadius": 5.0,
        "tension": 0.0,
        "yAxisID": "y",
        "pointStyle": "rectRot",
        "data": [
          {
            "x": "JAN/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 11.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 14.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 15.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 15.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 27.0,
            "data": []
          }
        ],
        "id": "open",
        "label": "Total de Mudanças",
        "normalized": true,
        "order": 1
      }
    ],
    "labels": [
      "JAN/2021",
      "FEV/2021",
      "MAR/2021",
      "ABR/2021",
      "MAI/2021",
      "JUN/2021"
    ]
  },
  "type": "bar",
  "config": {
    "responsive": true,
    "layout": {
      "padding": {
        "top": 5.0,
        "right": 0.0,
        "bottom": 0.0,
        "left": 0.0
      }
    },
    "interaction": {
      "intersect": false,
      "mode": "nearest",
      "axis": "xy"
    },
    "scales": {
      "y": {
        "display": true,
        "min": 0.0,
        "position": "left",
        "title": {
          "display": true,
          "padding": {
            "top": 0.0,
            "right": 0.0,
            "bottom": 10.0,
            "left": 0.0
          },
          "text": "Qtde de mudanças"
        },
        "type": "linear"
      },
      "y1": {
        "display": true,
        "grid": {
          "drawOnChartArea": false
        },
        "min": 0.0,
        "max": 100.0,
        "position": "right",
        "ticks": {
          "stepSize": 25.0
        },
        "title": {
          "display": true,
          "text": "IAGM (%)"
        },
        "type": "linear"
      }
    },
    "plugins": {
      "title": {
        "color": "cornflowerblue",
        "display": true,
        "font": {
          "size": 16.0
        },
        "padding": {
          "top": 32.0,
          "bottom": 32.0
        },
        "text": "Índice de Atendimento de Gestão de Mudanças",
        "align": "center"
      },
      "tooltip": {
        "intersect": false,
        "enabled": true,
        "mode": "nearest"
      },
      "legend": {
        "align": "start",
        "display": true,
        "labels": {
          "usePointStyle": true
        },
        "position": "bottom",
        "title": {
          "display": true,
          "padding": {
            "top": 20.0,
            "right": 0.0,
            "bottom": 0.0,
            "left": 0.0
          },
          "position": "start",
          "text": "Legenda"
        }
      }
    }
  }
};

export const COMBO_CHSARP = {
  "data": {
    "datasets": [
      {
        "type": "bar",
        "fill": true,
        "backgroundColor": "#537bc477",
        "borderColor": "#537bc4",
        "borderWidth": 2.0,
        "pointBackgroundColor": "#537bc4",
        "pointBorderColor": "#537bc4",
        "data": [
          {
            "x": "JAN/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 45.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 55.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 60.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 30.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 60.0,
            "data": []
          }
        ],
        "id": "Dataset 2",
        "label": "Dataset 2",
        "normalized": true,
        "order": 1
      },
      {
        "type": "line",
        "fill": false,
        "backgroundColor": "#f53794ff",
        "borderColor": "#f53794",
        "borderWidth": 2.0,
        "pointBackgroundColor": "#f53794",
        "pointBorderColor": "#f53794",
        "tension": 0.0,
        "data": [
          {
            "x": "JAN/2021",
            "y": 25.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 10.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 15.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 50.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 75.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 45.0,
            "data": []
          }
        ],
        "id": "Dataset 1",
        "label": "Dataset 1",
        "normalized": true,
        "order": 0
      }
    ],
    "labels": [
      "JAN/2021",
      "FEV/2021",
      "MAR/2021",
      "ABR/2021",
      "MAI/2021",
      "JUN/2021"
    ]
  },
  "type": "bar",
  "config": {
    "responsive": true,
    "interaction": {
      "intersect": false,
      "mode": "nearest",
      "axis": "xy"
    },
    "plugins": {
      "title": {
        "display": true,
        "text": "Chart.js Combined Line/Bar Chart"
      },
      "tooltip": {
        "intersect": false,
        "enabled": true,
        "mode": "nearest"
      },
      "legend": {
        "display": true,
        "position": "top"
      }
    }
  }
};

export const LINE_CSHARP = {
  "data": {
    "datasets": [
      {
        "type": "line",
        "fill": false,
        "backgroundColor": "#FF000077",
        "borderColor": "#FF0000",
        "pointBackgroundColor": "#FF0000",
        "pointBorderColor": "#FF0000",
        "tension": 0.0,
        "data": [
          {
            "x": "JAN/2021",
            "y": 25.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 10.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 15.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 50.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 75.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 45.0,
            "data": []
          }
        ],
        "id": "Dataset 1",
        "label": "Dataset 1",
        "normalized": true,
        "order": 0
      },
      {
        "type": "line",
        "fill": false,
        "backgroundColor": "#5500FF77",
        "borderColor": "#5500FF",
        "pointBackgroundColor": "#5500FF",
        "pointBorderColor": "#5500FF",
        "tension": 0.0,
        "data": [
          {
            "x": "JAN/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 45.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 55.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 60.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 30.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 60.0,
            "data": []
          }
        ],
        "id": "Dataset 2",
        "label": "Dataset 2",
        "normalized": true,
        "order": 1
      }
    ],
    "labels": [
      "JAN/2021",
      "FEV/2021",
      "MAR/2021",
      "ABR/2021",
      "MAI/2021",
      "JUN/2021"
    ]
  },
  "type": "line",
  "config": {
    "responsive": true,
    "interaction": {
      "intersect": false,
      "mode": "nearest",
      "axis": "xy"
    },
    "plugins": {
      "title": {
        "display": true,
        "text": "Line Chart"
      },
      "tooltip": {
        "intersect": false,
        "enabled": true,
        "mode": "nearest"
      },
      "legend": {
        "display": true,
        "position": "top"
      }
    }
  }
};

export const ROUNDED_BAR_CSHARP = {
  "data": {
    "datasets": [
      {
        "backgroundColor": "#FF000077",
        "borderColor": "#FF0000",
        "borderWidth": 2.0,
        "borderRadius": 5.0,
        "pointBackgroundColor": "#FF0000",
        "pointBorderColor": "#FF0000",
        "data": [
          {
            "x": "JAN/2021",
            "y": 5.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 10.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 15.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 50.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 75.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 45.0,
            "data": []
          }
        ],
        "borderSkipped": false,
        "id": "Data 1",
        "label": "Data 1",
        "normalized": true,
        "order": 0
      },
      {
        "backgroundColor": "#5500FF77",
        "borderColor": "#5500FF",
        "borderWidth": 2.0,
        "borderRadius": 5.0,
        "pointBackgroundColor": "#5500FF",
        "pointBorderColor": "#5500FF",
        "data": [
          {
            "x": "JAN/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 10.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 60.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 30.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 60.0,
            "data": []
          }
        ],
        "borderSkipped": false,
        "id": "Data 2",
        "label": "Data 2",
        "normalized": true,
        "order": 1
      }
    ],
    "labels": [
      "JAN/2021",
      "FEV/2021",
      "MAR/2021",
      "ABR/2021",
      "MAI/2021",
      "JUN/2021"
    ]
  },
  "type": "bar",
  "config": {
    "responsive": true,
    "interaction": {
      "intersect": false,
      "mode": "nearest",
      "axis": "xy"
    },
    "plugins": {
      "tooltip": {
        "intersect": false,
        "enabled": true,
        "mode": "nearest"
      },
      "legend": {
        "display": true,
        "position": "top"
      }
    }
  }
};

export const STACKED_BAR_CSHARP = {
  "data": {
    "datasets": [
      {
        "backgroundColor": "#FF0000ff",
        "borderColor": "#FF0000",
        "pointBackgroundColor": "#FF0000",
        "pointBorderColor": "#FF0000",
        "data": [
          {
            "x": "JAN/2021",
            "y": 5.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 10.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 15.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 50.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 75.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 45.0,
            "data": []
          }
        ],
        "id": "Data 1",
        "label": "Dataset 1",
        "normalized": true,
        "order": 0
      },
      {
        "backgroundColor": "#0000FFff",
        "borderColor": "#0000FF",
        "pointBackgroundColor": "#0000FF",
        "pointBorderColor": "#0000FF",
        "data": [
          {
            "x": "JAN/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 10.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 60.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 30.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 60.0,
            "data": []
          }
        ],
        "id": "Data 2",
        "label": "Dataset 2",
        "normalized": true,
        "order": 1
      },
      {
        "backgroundColor": "#00FF00ff",
        "borderColor": "#00FF00",
        "pointBackgroundColor": "#00FF00",
        "pointBorderColor": "#00FF00",
        "data": [
          {
            "x": "JAN/2021",
            "y": 2.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 15.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 5.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 30.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 30.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 10.0,
            "data": []
          }
        ],
        "id": "Data 3",
        "label": "Dataset 3",
        "normalized": true,
        "order": 2
      }
    ],
    "labels": [
      "JAN/2021",
      "FEV/2021",
      "MAR/2021",
      "ABR/2021",
      "MAI/2021",
      "JUN/2021"
    ]
  },
  "type": "bar",
  "config": {
    "responsive": true,
    "interaction": {
      "intersect": false,
      "mode": "nearest",
      "axis": "xy"
    },
    "scales": {
      "x": {
        "display": true,
        "stacked": true
      },
      "y": {
        "display": true,
        "stacked": true
      }
    },
    "plugins": {
      "title": {
        "display": true,
        "text": "Bar Chart - Stacked"
      },
      "tooltip": {
        "intersect": false,
        "enabled": true,
        "mode": "nearest"
      },
      "legend": {
        "display": true,
        "position": "top"
      }
    }
  }
};

export const HORIZONTAL_BAR_CSHARP = {
  "data": {
    "datasets": [
      {
        "backgroundColor": "#FF000077",
        "borderColor": "#FF0000",
        "borderWidth": 2.0,
        "pointBackgroundColor": "#FF0000",
        "pointBorderColor": "#FF0000",
        "data": [
          {
            "x": "JAN/2021",
            "y": 5.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 10.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 15.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 50.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 75.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 45.0,
            "data": []
          }
        ],
        "id": "Data 1",
        "label": "Dataset 1",
        "normalized": true,
        "order": 0
      },
      {
        "backgroundColor": "#0000CC77",
        "borderColor": "#0000CC",
        "borderWidth": 2.0,
        "pointBackgroundColor": "#0000CC",
        "pointBorderColor": "#0000CC",
        "data": [
          {
            "x": "JAN/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 10.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 60.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 30.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 60.0,
            "data": []
          }
        ],
        "id": "Data 2",
        "label": "Dataset 2",
        "normalized": true,
        "order": 1
      }
    ],
    "labels": [
      "JAN/2021",
      "FEV/2021",
      "MAR/2021",
      "ABR/2021",
      "MAI/2021",
      "JUN/2021"
    ]
  },
  "type": "bar",
  "config": {
    "responsive": true,
    "interaction": {
      "intersect": false,
      "mode": "nearest",
      "axis": "xy"
    },
    "scales": {
      "x": {
        "display": true,
        "stacked": true
      },
      "y": {
        "display": true,
        "stacked": true
      }
    },
    "plugins": {
      "tooltip": {
        "intersect": false,
        "enabled": true,
        "mode": "nearest"
      },
      "legend": {
        "display": true,
        "position": "right"
      }
    },
    "indexAxis": "y"
  }
};

export const VERTICAL_BAR_CSHARP = {
  "data": {
    "datasets": [
      {
        "backgroundColor": "#FF000077",
        "borderColor": "#FF0000",
        "borderWidth": 0.0,
        "pointBackgroundColor": "#FF0000",
        "pointBorderColor": "#FF0000",
        "data": [
          {
            "x": "JAN/2021",
            "y": 5.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 10.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 15.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 50.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 75.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 45.0,
            "data": []
          }
        ],
        "id": "Data 1",
        "label": "Dataset 1",
        "normalized": true,
        "order": 0
      },
      {
        "backgroundColor": "#00FF0077",
        "borderColor": "#00FF00",
        "borderWidth": 0.0,
        "pointBackgroundColor": "#00FF00",
        "pointBorderColor": "#00FF00",
        "data": [
          {
            "x": "JAN/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "FEV/2021",
            "y": 7.0,
            "data": []
          },
          {
            "x": "MAR/2021",
            "y": 10.0,
            "data": []
          },
          {
            "x": "ABR/2021",
            "y": 60.0,
            "data": []
          },
          {
            "x": "MAI/2021",
            "y": 30.0,
            "data": []
          },
          {
            "x": "JUN/2021",
            "y": 60.0,
            "data": []
          }
        ],
        "id": "Data 2",
        "label": "Dataset 2",
        "normalized": true,
        "order": 1
      }
    ],
    "labels": [
      "JAN/2021",
      "FEV/2021",
      "MAR/2021",
      "ABR/2021",
      "MAI/2021",
      "JUN/2021"
    ]
  },
  "type": "bar",
  "config": {
    "responsive": true,
    "interaction": {
      "intersect": false,
      "mode": "nearest",
      "axis": "xy"
    },
    "plugins": {
      "tooltip": {
        "intersect": false,
        "enabled": true,
        "mode": "nearest"
      },
      "legend": {
        "display": true,
        "position": "top"
      }
    }
  }
};
