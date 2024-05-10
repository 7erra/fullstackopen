interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (days: Array<number>, target: number): Result => {
  const average = days.reduce((a, b) => a + b, 0) / days.length;
  let rating = 1;
  let ratingDescription = 'unfortunately you did not achieve your goals this week. try again next week!'
  if (average >= target) {
    rating = 3;
    ratingDescription = 'very nice! you achieved your goals this week!';
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength: days.length,
    trainingDays: days.filter(day => day > 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

