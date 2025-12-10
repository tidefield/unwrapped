import type { MonthlyActivityData, WeeklyStepsData } from './types';

export async function parseGarminStepsCSV(file: File): Promise<WeeklyStepsData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = parseStepsCSV(text);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

function parseStepsCSV(text: string): WeeklyStepsData[] {
  const lines = text.split('\n').filter(line => line.trim());
  const data: WeeklyStepsData[] = [];

  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    if (values.length >= 2) {
      const date = values[0]?.trim();
      const steps = parseInt(values[1]?.trim());

      if (date && !isNaN(steps)) {
        data.push({
          date,
          steps,
        });
      }
    }
  }

  return data;
}

export async function parseGarminCSV(file: File): Promise<MonthlyActivityData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = parseActivityCSV(text);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

function parseActivityCSV(text: string): MonthlyActivityData[] {
  const lines = text.split('\n').filter(line => line.trim());
  const data: MonthlyActivityData[] = [];

  // Skip first line (title) and header line
  for (let i = 2; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    if (values.length >= 3) {
      const month = values[0]?.trim();
      const activityType = values[1]?.trim();
      const distance = parseFloat(values[2]?.trim());

      if (month && activityType && !isNaN(distance)) {
        data.push({
          month,
          activityType,
          distance,
        });
      }
    }
  }

  return data;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}
