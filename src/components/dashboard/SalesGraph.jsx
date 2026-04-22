import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalesGraph = () => {
  const data = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: [22, 35, 18, 28, 45, 62, 55, 48, 38, 52, 41, 33, 29, 44],
        backgroundColor: '#3b82f6',
        borderRadius: 6,              //  rounded blocks (figma feel)
        barThickness: 18,             //  control width
        hoverBackgroundColor: '#2563eb'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false }     // cleaner look
      },
      y: {
        min: 0,
        max: 80,
        ticks: { stepSize: 20 },
        grid: {
          color: '#e5e7eb'           // light grid like figma
        }
      }
    }
  };

  return (
    <div className="card" style={{ height: '380px' }}>
      <h3 style={{ marginBottom: '20px' }}>Sale Analytics</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesGraph;