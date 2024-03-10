class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories();
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
    Storage.updateTotalCalories(this._totalCalories);
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateTotalCalories(this._totalCalories);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);
    this._totalCalories -= this._meals[index].calories;
    Storage.updateTotalCalories(this._totalCalories);
    this._meals.splice(index, 1);
    this._render();
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((meal) => meal.id === id);
    this._totalCalories += this._workouts[index].calories;
    Storage.updateTotalCalories(this._totalCalories);
    this._workouts.splice(index, 1);
    this._render();
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._render();
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    Storage.setCalorieLimit(calorieLimit);
    this._displayCaloriesLimit();
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

  _displayNewMeal(meal) {
    const mealsEl = document.querySelector('#meal-items');
    const mealEl = document.createElement('div');
    mealEl.classList.add('card', 'my-2');
    mealEl.setAttribute('data-id', meal.id);
    mealEl.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    mealsEl.appendChild(mealEl);
  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.querySelector('#workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.classList.add('card', 'my-2');
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div
            class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    workoutsEl.appendChild(workoutEl);
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

class Storage {
  static getCalorieLimit(defaultLimit = 2500) {
    const calorieLimit = localStorage.getItem('calorieLimit');
    return +calorieLimit || defaultLimit;
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }

  static getTotalCalories(defaultCalories = 0) {
    const totalCalories = localStorage.getItem('totalCalories');
    return +totalCalories || defaultCalories;
  }

  static updateTotalCalories(calories) {
    localStorage.setItem('totalCalories', calories);
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .querySelector('#meal-form')
      ?.addEventListener('submit', this._newItem.bind(this, 'meal'));

    document
      .querySelector('#workout-form')
      ?.addEventListener('submit', this._newItem.bind(this, 'workout'));

    document
      .querySelector('#meal-items')
      ?.addEventListener('click', this._removeItem.bind(this, 'meal'));

    document
      .querySelector('#workout-items')
      ?.addEventListener('click', this._removeItem.bind(this, 'workout'));

    document
      .querySelector('#filter-meals')
      ?.addEventListener('input', this._filterItems.bind(this, 'meal'));

    document
      .querySelector('#filter-workouts')
      ?.addEventListener('input', this._filterItems.bind(this, 'workout'));

    document
      .querySelector('#reset')
      ?.addEventListener('click', this._reset.bind(this));

    document
      .querySelector('#limit-form')
      ?.addEventListener('submit', this._setLimit.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();
    const name = document.querySelector(`#${type}-name`);
    const calories = document.querySelector(`#${type}-calories`);

    if (!name.value || !calories.value) {
      alert('Please fill in all fields');
      return;
    }

    if (type === 'meal') {
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addWorkout(workout);
    }

    name.value = '';
    calories.value = '';

    const collapseItem = document.querySelector(`#collapse-${type}`);
    if (collapseItem) {
      const bsCollapse = new bootstrap.Collapse(collapseItem, { toggle: true });
    }
  }

  _removeItem(type, e) {
    e.preventDefault();
    if (e.target.closest('.delete') && confirm('Are you sure?')) {
      const card = e.target.closest('[data-id]');
      if (!card) return;
      const id = card?.dataset.id;
      if (!id) return;

      type === 'meal'
        ? this._tracker.removeMeal(id)
        : this._tracker.removeWorkout(id);
      card.remove();
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      console.log(item.querySelector('h4').textContent);
      const name = item.querySelector('h4').textContent;
      if (name.toLowerCase().includes(text)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  _reset() {
    this._tracker.reset();
    document.querySelector('#meal-items').innerHTML = '';
    document.querySelector('#workout-items').innerHTML = '';
    document.querySelector('#filter-meals').value = '';
    document.querySelector('#filter-workouts').value = '';
  }

  _setLimit(e) {
    e.preventDefault();

    const limit = document.querySelector('#limit');
    if (!limit) return;
    if (limit.value === '') {
      alert('Please add a limit');
    }

    this._tracker.setLimit(+limit.value);
    limit.value = '';

    const modalEl = document.querySelector('#limit-modal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}

const app = new App();
