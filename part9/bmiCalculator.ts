const caluclateBMI = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2)
  if (bmi < 16) {
    return "Under weight (servere thinness)";
  } else if (bmi < 17) {
    return "Under weight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Under weight (Mild thinness)";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight (pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  } else if (bmi > 40) {
    return "Obese (Class III)";
  }
}

const [, , weight, height] = process.argv.map(x => Number(x))
if (isNaN(weight) || isNaN(height)) {
  throw new Error("Invalid input");
}

console.log(caluclateBMI(weight, height))
