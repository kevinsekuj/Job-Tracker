import { Box, Typography } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SkillsPage = ({ skillsMap, totalJobs }) => {
  skillsMap.set("Python", 3);
  skillsMap.set("JavaScript", 6);
  skillsMap.set("Go", 2);
  totalJobs += 3;

  const options = {
    scales: {
      y: {
        min: 0,
        max: totalJobs,
      },
      x: {},
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Most Popular Skills",
      },
    },
  };

  const data = {
    labels: [...skillsMap.keys()],
    datasets: [
      {
        label: "Skill frequency",
        data: [...skillsMap.values()],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Box sx={{ margin: "5% auto 0 auto", width: "60%" }}>
      <Bar options={options} data={data} />
      <Box
        sx={{
          marginTop: "1%",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography variant="h3" marginBottom="1%">
          Popular Skills
        </Typography>

        <Box>
          {[...skillsMap.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(element => (
              <Typography key={element}>
                <strong>{element[0]}</strong> appeared in{" "}
                <strong>{Math.floor((element[1] / totalJobs) * 100)}</strong>%
                of your job applications.
              </Typography>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SkillsPage;
