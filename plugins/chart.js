import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      chart: () => Chart
    }
  }
})
