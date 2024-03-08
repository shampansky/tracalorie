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
    this._displayCaloriesProgress();
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
    const progressEl = document.querySelector('#calorie-progress');
    if (caloriesRemainingEl) {
      const remaining = this._calorieLimit - this._totalCalories;
      caloriesRemainingEl.innerHTML = this._calorieLimit - this._totalCalories;

      if (remaining <= 0) {
        caloriesRemainingEl.closest('.card')?.classList.remove('bg-light');
        caloriesRemainingEl.closest('.card')?.classList.add('bg-danger');
        progressEl?.classList.remove('bg-success');
        progressEl?.classList.add('bg-danger');
      } else {
        caloriesRemainingEl.closest('.card')?.classList.add('bg-light');
        caloriesRemainingEl.closest('.card')?.classList.remove('bg-danger');
        progressEl?.classList.add('bg-success');
        progressEl?.classList.remove('bg-danger');
      }
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.querySelector('#calorie-progress');
    if (progressEl) {
      const percentage = (this._totalCalories / this._calorieLimit) * 100;
      progressEl.style.width = `${Math.min(100, percentage)}%`;
    }
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
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

// const tracker = new CalorieTracker();

// const breakfast = new Meal('Breakfast', 400);
// const lunch = new Meal('Lunch', 3350);

// tracker.addMeal(breakfast);
// tracker.addMeal(lunch);
// const run = new Workout('Morning Run', 350);
// tracker.addWorkout(run);

// console.log(tracker);

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .querySelector('#meal-form')
      ?.addEventListener('submit', this._newMeal.bind(this));

    document
      .querySelector('#workout-form')
      ?.addEventListener('submit', this._newWorkout.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();
    const name = document.querySelector('#meal-name');
    const calories = document.querySelector('#meal-calories');

    if (!name.value || !calories.value) {
      alert('Please fill in all fields');
      return;
    }

    const meal = new Meal(name.value, +calories.value);
    this._tracker.addMeal(meal);
    name.value = '';
    calories.value = '';

    const collapseMeal = document.querySelector('#collapse-meal');
    if (collapseMeal) {
      const bsCollapse = new bootstrap.Collapse(collapseMeal, { toggle: true });
    }
  }

  _newWorkout(e) {
    e.preventDefault();
    const name = document.querySelector('#workout-name');
    const calories = document.querySelector('#workout-calories');

    if (!name.value || !calories.value) {
      alert('Please fill in all fields');
      return;
    }

    const workout = new Workout(name.value, +calories.value);
    this._tracker.addWorkout(workout);
    name.value = '';
    calories.value = '';

    const collapseWorkout = document.querySelector('#collapse-workout');
    if (collapseWorkout) {
      const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
        toggle: true,
      });
    }
  }
}

const app = new App();
