import type { AllActivitiesStats } from './types';

export function createAllActivitiesSlides(stats: AllActivitiesStats): HTMLElement[] {
  const slides = [
    createIntroSlide(stats),
    createTotalDistanceSlide(stats),
    createTopActivitySlide(stats),
  ];

  // Add slides for each activity type (up to top 3)
  stats.activitiesByType.slice(0, 3).forEach(activity => {
    slides.push(createActivitySlide(activity));
  });

  // Add best month and streak slides
  slides.push(
    createBestMonthSlide(stats),
    createStreakSlide(stats),
    createOutroSlide(stats),
  );

  return slides;
}

function createIntroSlide(stats: AllActivitiesStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';

  const activityList = stats.activitiesByType
    .map(a => a.type)
    .join(', ')
    .replace(/, ([^,]*)$/, ' & $1'); // Replace last comma with &

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">Your ${stats.year}</div>
    <div class="stat-value" style="font-size: 3.5rem; margin: 3rem 0;">Fitness Wrapped</div>
    <p style="font-size: 1.5rem;">${activityList}</p>
  `;
  return slide;
}

function createTotalDistanceSlide(stats: AllActivitiesStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const totalKm = stats.totalDistance.toFixed(1);
  const marathons = (stats.totalDistance / 42.195).toFixed(1);

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">You covered</div>
    <div class="stat-value">${totalKm}</div>
    <div class="stat-label">kilometers</div>
    <p>That's equivalent to ${marathons} marathons!</p>
  `;
  return slide;
}

function createTopActivitySlide(stats: AllActivitiesStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const topActivity = stats.activitiesByType[0];
  const percentage = topActivity.percentage.toFixed(0);

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">Your top activity</div>
    <div class="stat-value" style="font-size: 4rem;">${topActivity.type}</div>
    <div class="stat-label">${topActivity.totalDistance.toFixed(1)} km</div>
    <p>${percentage}% of your total distance</p>
  `;
  return slide;
}

function createActivitySlide(activity: { type: string; totalDistance: number; totalMonths: number; avgDistancePerMonth: number; bestMonth: { month: string; distance: number } }): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const bestMonth = activity.bestMonth.month.split(' ')[0]; // Extract month name

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">${activity.type}</div>
    <div class="stat-value">${activity.totalDistance.toFixed(1)}</div>
    <div class="stat-label">kilometers in ${activity.totalMonths} months</div>
    <p>Best month: ${bestMonth} (${activity.bestMonth.distance.toFixed(1)} km)</p>
  `;
  return slide;
}

function createBestMonthSlide(stats: AllActivitiesStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';
  const bestMonth = stats.milestones.bestMonth.month;

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">Your best month</div>
    <div class="stat-value" style="font-size: 4rem;">${bestMonth}</div>
    <div class="stat-label">${stats.milestones.bestMonth.distance.toFixed(1)} km</div>
    <p>You were unstoppable!</p>
  `;
  return slide;
}

function createStreakSlide(stats: AllActivitiesStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">Your longest streak</div>
    <div class="stat-value">${stats.milestones.bestStreak}</div>
    <div class="stat-label">consecutive months</div>
    <p>That's dedication!</p>
  `;
  return slide;
}

function createOutroSlide(stats: AllActivitiesStats): HTMLElement {
  const slide = document.createElement('div');
  slide.className = 'story-slide';

  const activitySummary = stats.activitiesByType
    .map(a => `${a.totalDistance.toFixed(1)} km ${a.type.toLowerCase()}`)
    .join('<br>');

  slide.innerHTML = `
    <div class="slide-header">Garmin (un)Wrapped</div>
    <div class="slide-title">${stats.year} in numbers</div>
    <p style="font-size: 1.5rem; margin: 2rem 0; line-height: 1.8;">
      ${activitySummary}<br>
      <br>
      ${stats.totalMonths} months active<br>
      ${stats.milestones.bestStreak} month streak
    </p>
    <p style="font-size: 1.8rem; font-weight: 700; margin-top: 3rem;">
      Here's to moving even more in ${stats.year + 1}
    </p>
  `;
  return slide;
}
