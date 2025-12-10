import { parseGarminCSV, parseGarminStepsCSV } from './csvParser';
import { calculateAllActivitiesStats } from './allActivitiesStats';
import { calculateStepsStats } from './stepsStats';
import { createAllActivitiesSlides } from './allActivitiesSlides';
import { createStepsSlides } from './stepsSlides';
import html2canvas from 'html2canvas';
import './style.css';
import type { AllActivitiesStats, StepsStats } from './types';

type AspectRatio = 'square' | 'story' | 'landscape';

class WrappedApp {
  private currentSlideIndex = 0;
  private slides: HTMLElement[] = [];
  private activitiesStats: AllActivitiesStats | null = null;
  private stepsStats: StepsStats | null = null;
  private selectedRatio: AspectRatio = 'square';
  private uploadedFiles: File[] = [];

  constructor() {
    this.init();
  }

  private init() {
    // Show upload screen and set up handlers
    this.setupUploadHandlers();
  }

  private setupUploadHandlers() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    const processBtn = document.getElementById('process-btn');

    // Click to browse
    dropZone?.addEventListener('click', () => fileInput.click());

    // Drag and drop
    dropZone?.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });

    dropZone?.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-over');
    });

    dropZone?.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      const files = Array.from(e.dataTransfer?.files || []);
      this.handleFiles(files);
    });

    // File input change
    fileInput?.addEventListener('change', (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      this.handleFiles(files);
    });

    // Process button
    processBtn?.addEventListener('click', () => this.processFiles());
  }

  private handleFiles(files: File[]) {
    const csvFiles = files.filter(f => f.name.endsWith('.csv'));
    this.uploadedFiles = [...this.uploadedFiles, ...csvFiles];

    const fileList = document.getElementById('file-list');
    const processBtn = document.getElementById('process-btn');

    if (this.uploadedFiles.length > 0 && fileList && processBtn) {
      fileList.classList.remove('hidden');
      processBtn.classList.remove('hidden');

      fileList.innerHTML = this.uploadedFiles
        .map(f => `<div class="file-item">${f.name}</div>`)
        .join('');
    }
  }

  private async processFiles() {
    const loadingScreen = document.getElementById('loading-screen');
    const uploadScreen = document.getElementById('upload-screen');
    const loadingText = document.getElementById('loading-text');

    // Show loading
    uploadScreen?.classList.remove('active');
    loadingScreen?.classList.add('active');

    try {
      // Parse all CSV files based on their type
      const allActivityData = [];
      const allStepsData = [];

      for (const file of this.uploadedFiles) {
        if (loadingText) {
          loadingText.textContent = `Parsing ${file.name}...`;
        }

        // Detect CSV type by filename
        if (file.name.toLowerCase().includes('steps')) {
          const data = await parseGarminStepsCSV(file);
          allStepsData.push(...data);
        } else {
          // Assume it's an activity distance CSV
          const data = await parseGarminCSV(file);
          allActivityData.push(...data);
        }
      }

      if (loadingText) {
        loadingText.textContent = 'Calculating your stats...';
      }

      // Calculate stats for all activities
      if (allActivityData.length > 0) {
        this.activitiesStats = calculateAllActivitiesStats(allActivityData);
      }

      // Calculate steps stats
      if (allStepsData.length > 0) {
        this.stepsStats = calculateStepsStats(allStepsData);
      }

      // Show wrapped
      setTimeout(() => {
        this.showWrapped();
      }, 500);
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files. Please check the console for details.');
      uploadScreen?.classList.add('active');
      loadingScreen?.classList.remove('active');
    }
  }

  private showWrapped() {
    if (!this.activitiesStats && !this.stepsStats) {
      console.error('No stats available');
      alert('No data was successfully parsed. Please check your CSV files.');
      return;
    }

    // Hide all screens, show wrapped
    const uploadScreen = document.getElementById('upload-screen');
    const loadingScreen = document.getElementById('loading-screen');
    const wrappedScreen = document.getElementById('wrapped-screen');

    uploadScreen?.classList.remove('active');
    loadingScreen?.classList.remove('active');
    wrappedScreen?.classList.add('active');

    // Create slides by combining both types
    this.slides = [];

    // Add activity slides if available
    if (this.activitiesStats) {
      this.slides.push(...createAllActivitiesSlides(this.activitiesStats));
    }

    // Add steps slides if available
    if (this.stepsStats) {
      this.slides.push(...createStepsSlides(this.stepsStats));
    }

    const storyContainer = document.getElementById('story-container');

    if (storyContainer) {
      this.slides.forEach((slide) => storyContainer.appendChild(slide));
      this.showSlide(0);
      this.setupNavigation();
      this.setupKeyboardNavigation();
    }
  }

  private showSlide(index: number) {
    this.slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    this.currentSlideIndex = index;
    this.updateNavigation();
  }

  private updateNavigation() {
    const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;
    const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
    const progressDots = document.getElementById('progress-dots');

    if (prevBtn) {
      prevBtn.disabled = this.currentSlideIndex === 0;
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentSlideIndex === this.slides.length - 1;
    }

    // Update progress dots
    if (progressDots) {
      progressDots.innerHTML = '';
      this.slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        if (i === this.currentSlideIndex) {
          dot.classList.add('active');
        }
        progressDots.appendChild(dot);
      });
    }
  }

  private setupNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn?.addEventListener('click', () => {
      if (this.currentSlideIndex > 0) {
        this.showSlide(this.currentSlideIndex - 1);
      }
    });

    nextBtn?.addEventListener('click', () => {
      if (this.currentSlideIndex < this.slides.length - 1) {
        this.showSlide(this.currentSlideIndex + 1);
      }
    });
  }

  private setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && this.currentSlideIndex > 0) {
        this.showSlide(this.currentSlideIndex - 1);
      } else if (e.key === 'ArrowRight' && this.currentSlideIndex < this.slides.length - 1) {
        this.showSlide(this.currentSlideIndex + 1);
      }
    });

    // Setup share button
    const shareBtn = document.getElementById('share-btn');
    shareBtn?.addEventListener('click', () => this.shareCurrentSlide());

    // Setup ratio selector
    const ratioButtons = document.querySelectorAll('.ratio-btn');
    ratioButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const ratio = target.dataset.ratio as AspectRatio;

        // Update active state
        ratioButtons.forEach((b) => b.classList.remove('active'));
        target.classList.add('active');

        // Store selected ratio
        this.selectedRatio = ratio;

        // Update capture area aspect ratio
        this.updateCaptureAreaRatio(ratio);
      });
    });
  }

  private updateCaptureAreaRatio(ratio: AspectRatio) {
    const captureArea = document.getElementById('capture-area');
    if (!captureArea) return;

    // Update aspect ratio
    switch (ratio) {
      case 'square':
        captureArea.style.aspectRatio = '1 / 1';
        break;
      case 'story':
        captureArea.style.aspectRatio = '9 / 16';
        break;
      case 'landscape':
        captureArea.style.aspectRatio = '16 / 9';
        break;
    }
  }

  private async shareCurrentSlide() {
    const shareBtn = document.getElementById('share-btn');
    if (!shareBtn) return;

    // Show loading state
    shareBtn.style.opacity = '0.5';
    shareBtn.style.pointerEvents = 'none';

    try {
      const captureArea = document.getElementById('capture-area');
      if (!captureArea) return;

      // Store original inline styles so we can restore them
      const originalStyles = new Map<HTMLElement, string>();

      // Force white color inline on all text elements BEFORE capturing
      const textElements = captureArea.querySelectorAll('.slide-title, p, div, span, .stat-value, .stat-label');
      textElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        originalStyles.set(htmlEl, htmlEl.style.cssText);
        htmlEl.style.color = '#ffffff !important';
      });

      // Capture only the capture area
      const canvas = await html2canvas(captureArea, {
        backgroundColor: '#667eea',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
      });

      // Restore original styles
      textElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const original = originalStyles.get(htmlEl);
        if (original !== undefined) {
          htmlEl.style.cssText = original;
        }
      });

      // Convert to blob directly
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        // Try to use Web Share API if available (mobile)
        if (navigator.share && navigator.canShare) {
          try {
            const file = new File([blob], 'garmin-unwrapped.png', { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: 'Garmin (un)Wrapped',
                text: 'Check out my fitness year!',
              });
              return;
            }
          } catch (err) {
            console.log('Share API not available, falling back to download');
          }
        }

        // Fallback: download the image
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `garmin-unwrapped-${this.selectedRatio}-${this.currentSlideIndex + 1}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (err) {
      console.error('Error capturing slide:', err);
      alert('Failed to capture slide. Please try again.');
    } finally {
      // Reset button state
      shareBtn.style.opacity = '1';
      shareBtn.style.pointerEvents = 'auto';
    }
  }
}

// Initialize app
new WrappedApp();
