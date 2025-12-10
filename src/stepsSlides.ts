import type { StepsStats } from './types';

export function createStepsSlides(stats: StepsStats): HTMLElement[] {
  return [
    createStepsIntroSlide(stats),
    createTotalStepsSlide(stats),
    createAverageStepsSlide(stats),
    createBestWeekSlide(stats),
    createBestMonthSlide(stats),
  ];
}

function createStepsIntroSlide(stats: StepsStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">Your ${stats.year}</div>
    <div class="stat-value" style="font-size: 3.5rem; margin: 3rem 0;">Step Count</div>
    <p style="font-size: 1.5rem;">Let's see how far you walked</p>
  `;
  return slide;
}

function createTotalStepsSlide(stats: StepsStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const totalSteps = stats.totalSteps.toLocaleString();

  // Fun fact: average stride is about 0.762 meters
  const distanceKm = ((stats.totalSteps * 0.762) / 1000).toFixed(1);

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">You walked</div>
    <div class="stat-value">${totalSteps}</div>
    <div class="stat-label">steps</div>
    <p>That's about ${distanceKm} km!</p>
  `;
  return slide;
}

function createAverageStepsSlide(stats: StepsStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const avgSteps = stats.averageStepsPerDay.toLocaleString();

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">Daily average</div>
    <div class="stat-value">${avgSteps}</div>
    <div class="stat-label">steps per day</div>
    <p>Keep moving forward!</p>
  `;
  return slide;
}

function createBestWeekSlide(stats: StepsStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const bestSteps = stats.bestWeek.steps.toLocaleString();
  const weekDate = new Date(stats.bestWeek.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">Your best week</div>
    <div class="stat-value">${bestSteps}</div>
    <div class="stat-label">steps (week of ${weekDate})</div>
    <p>You were on fire!</p>
  `;
  return slide;
}

function createBestMonthSlide(stats: StepsStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const bestSteps = stats.bestMonth.steps.toLocaleString();

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">Your best month</div>
    <div class="stat-value" style="font-size: 4rem;">${stats.bestMonth.month}</div>
    <div class="stat-label">${bestSteps} steps</div>
    <p>Incredible consistency!</p>
  `;
  return slide;
}
