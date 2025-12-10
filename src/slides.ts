import type { WrappedStats } from './types';

export function createSlides(stats: WrappedStats): HTMLElement[] {
  return [
    createIntroSlide(stats),
    createActivitiesSlide(stats),
    createDistanceSlide(stats),
    createTimeSlide(stats),
    createCaloriesSlide(stats),
    createElevationSlide(stats),
    createConsistencySlide(stats),
    createHeartRateSlide(stats),
    createTopMomentSlide(stats),
    createOutroSlide(stats),
  ];
}

function createIntroSlide(stats: WrappedStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  slide.innerHTML = `
    <div class="slide-title">Your ${stats.year}</div>
    <div class="stat-value" style="font-size: 4rem; margin: 3rem 0;">Garmin (un)Wrapped</div>
    <p style="font-size: 1.5rem;">Let's see what you accomplished</p>
  `;
  return slide;
}

function createActivitiesSlide(stats: WrappedStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  slide.innerHTML = `
    <div class="slide-title">You completed</div>
    <div class="stat-value">${stats.totalActivities.toLocaleString()}</div>
    <div class="stat-label">activities</div>
    <p>That's ${Math.round(stats.totalActivities / 12)} per month on average</p>
  `;
  return slide;
}

function createDistanceSlide(stats: WrappedStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const km = (stats.totalDistance / 1000).toFixed(0);
  const miles = (stats.totalDistance / 1609.34).toFixed(0);

  slide.innerHTML = `
    <div class="slide-title">You traveled</div>
    <div class="stat-value">${parseInt(km).toLocaleString()}</div>
    <div class="stat-label">kilometers</div>
    <p>That's ${miles} miles, or ${(stats.totalDistance / 40075000 * 100).toFixed(1)}% around the Earth</p>
  `;
  return slide;
}

function createTimeSlide(stats: WrappedStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const hours = Math.floor(stats.totalDuration / 3600);
  const days = (hours / 24).toFixed(1);

  slide.innerHTML = `
    <div class="slide-title">You spent</div>
    <div class="stat-value">${hours.toLocaleString()}</div>
    <div class="stat-label">hours moving</div>
    <p>That's ${days} full days of activity</p>
  `;
  return slide;
}

function createCaloriesSlide(stats: WrappedStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const pizzas = Math.round(stats.totalCalories / 285); // average slice

  slide.innerHTML = `
    <div class="slide-title">You burned</div>
    <div class="stat-value">${(stats.totalCalories / 1000).toFixed(0)}k</div>
    <div class="stat-label">calories</div>
    <p>Equivalent to ${pizzas.toLocaleString()} slices of pizza</p>
  `;
  return slide;
}

function createElevationSlide(stats: WrappedStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const everests = (stats.totalElevationGain / 8849).toFixed(2);

  slide.innerHTML = `
    <div class="slide-title">You climbed</div>
    <div class="stat-value">${(stats.totalElevationGain / 1000).toFixed(1)}k</div>
    <div class="stat-label">meters of elevation</div>
    <p>That's ${everests} times the height of Mount Everest</p>
  `;
  return slide;
}

function createConsistencySlide(stats: WrappedStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const percentage = ((stats.activeDays / 365) * 100).toFixed(0);

  slide.innerHTML = `
    <div class="slide-title">You were active</div>
    <div class="stat-value">${stats.activeDays}</div>
    <div class="stat-label">days this year</div>
    <p>That's ${percentage}% of the year. Consistency is key!</p>
  `;
  return slide;
}

function createHeartRateSlide(stats: WrappedStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';

  slide.innerHTML = `
    <div class="slide-title">Your heart</div>
    <div class="stat-value">${stats.avgHeartRate}</div>
    <div class="stat-label">average BPM during activities</div>
    <p>Peak heart rate: ${stats.maxHeartRate} BPM</p>
  `;
  return slide;
}

function createTopMomentSlide(stats: WrappedStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const longestKm = (stats.longestDistance / 1000).toFixed(1);
  const hours = Math.floor(stats.longestDuration / 3600);
  const minutes = Math.floor((stats.longestDuration % 3600) / 60);

  slide.innerHTML = `
    <div class="slide-title">Your longest adventure</div>
    <div class="stat-value" style="font-size: 3.5rem;">${longestKm} km</div>
    <div class="stat-label">in ${hours}h ${minutes}m</div>
    <p style="margin-top: 2rem;">An incredible achievement!</p>
  `;
  return slide;
}

function createOutroSlide(stats: WrappedStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';

  slide.innerHTML = `
    <div class="slide-title">${stats.year} was your year</div>
    <p style="font-size: 1.5rem; margin: 2rem 0;">
      ${stats.totalActivities} activities<br>
      ${(stats.totalDistance / 1000).toFixed(0)} km covered<br>
      ${Math.floor(stats.totalDuration / 3600)} hours of movement
    </p>
    <p style="font-size: 1.8rem; font-weight: 700; margin-top: 3rem;">
      Here's to an even stronger ${stats.year + 1}
    </p>
  `;
  return slide;
}
