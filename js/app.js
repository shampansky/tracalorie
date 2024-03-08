class CalorieTracker {
  constructor() {
    this._calorieLimit = 2500;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }

  // Public API

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  // Private Methods

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.querySelector('#calories-total');
    if (totalCaloriesEl) {
      totalCaloriesEl.innerHTML = this._totalCalories;
    }
  }

  _displayCaloriesLimit() {
    const caloriesLimitEl = document.querySelector('#calories-limit');
    if (caloriesLimitEl) {
      caloriesLimitEl.innerHTML = this._calorieLimit;
    }
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.querySelector('#calories-consumed');
    if (caloriesConsumedEl) {
      const consumed = this._meals.reduce(
        (total, meal) => total + meal.calories,
        0
      );
      caloriesConsumedEl.innerHTML = consumed;
    }
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.querySelector('#calories-burned');
    if (caloriesBurnedEl) {
      const burned = this._workouts.reduce(
        (total, workout) => total + workout.calories,
        0
      );
      caloriesBurnedEl.innerHTML = burned;
    }
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.querySelector('#calories-remaining');
    if (caloriesRemainingEl) {
      caloriesRemainingEl.innerHTML = this._calorieLimit - this._totalCalories;
    }
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
const lunch = new Meal('Lunch', 350);

tracker.addMeal(breakfast);
tracker.addMeal(lunch);
const run = new Workout('Morning Run', 350);
tracker.addWorkout(run);

console.log(tracker);
