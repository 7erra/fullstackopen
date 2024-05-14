import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (isNaN(weight) || isNaN(height)) {
    res.send({
      error: "malformatted parameters"
    });
  } else {
    res.send({
      weight: weight,
      height: height,
      bmi: calculateBMI(height, weight)
    });
  }
});

app.get("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.send({
      error: "parameters missing"
    });
  }
  if (isNaN(Number(target)) || daily_exercises.some((day: number) => isNaN(Number(day)))) {
    res.send({
      error: "malformatted parameters"
    });
  }
  res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
