# Fitness (Un)Wrapped

A privacy-focused, client-only fitness activity wrapped experience inspired by Spotify Wrapped. Upload your Garmin CSV data and visualize your fitness journey with beautiful slides.

![Demo](https://img.shields.io/badge/demo-available-brightgreen) ![Privacy](https://img.shields.io/badge/privacy-100%25%20client--side-blue)

## ✨ Features

- 📊 **Activity Statistics**: View total distance, top activities, best months, and more
- 🚶 **Steps Tracking**: Analyze your daily step patterns and achievements
- 🎨 **Beautiful Slides**: Animated, shareable slides showcasing your fitness journey
- 🔒 **100% Private**: All processing happens in your browser - no data leaves your device
- 🎉 **Confetti Celebrations**: Fun animations to celebrate your achievements
- ⌨️ **Keyboard Navigation**: Use arrow keys or click buttons to navigate
- 📱 **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fitness-unwrapped.git
   cd fitness-unwrapped
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to http://localhost:5173/

## 📁 Project Structure

```
wrapped/
├── public/
│   └── sample_data/         # Sample CSV files for testing
├── src/
│   ├── components/          # React components
│   │   ├── shared/         # Shared components (BigStatSlide, etc.)
│   │   ├── general/        # General slide components
│   │   └── steps/          # Steps-specific components
│   ├── parser/             # CSV parsing utilities
│   ├── *.ts                # Stats calculation modules
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # App entry point
├── styles/
│   └── main.css            # All styling and animations
└── package.json
```

## 📊 Using Your Own Data

### Supported Data Formats

This app works with Garmin CSV exports:

- **Total Distance.csv** - Your activity distances over time
- **Steps.csv** - Your daily step counts

### How to Upload

1. **Export from Garmin Connect**
   - Log into Garmin Connect
   - Go to Settings → My Data → Export Data
   - Download your CSV files

2. **Upload to the App**
   - Click "Upload your files" on the homepage
   - Select your CSV files
   - Wait for processing
   - Enjoy your wrapped!

### Sample Data

Click "Use sample data" to see the app in action with mock data.

## 🎨 Customization

### Adding New Slide Types

Create a new component in `src/components/` following the pattern:

```typescript
export const MyCustomSlide: React.FC = ({ data }) => {
  return (
    <BigStatSlide
      title="Your Title"
      value={data.value}
      label="units"
      description="Optional description"
    />
  );
};
```

### Styling

Key customization points in `styles/main.css`:

- **Colors & Gradients**: Modify `:root` CSS variables
- **Slide Transitions**: Update `.story-slide` animations
- **Confetti**: Customize animation in `.confetti` keyframes
- **Typography**: Update font families and sizes

### Adding New Activity Types

Update `src/utils.ts` to add icons for new activity types:

```typescript
const icons: Record<string, string> = {
  running: "🏃",
  cycling: "🚴",
  // Add your activity type here
  yourActivity: "🏋️",
};
```

## 🏗️ Building for Production

```bash
npm run build
```

Deploy the `dist/` folder to any static hosting service:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- [Firebase Hosting](https://firebase.google.com/products/hosting)

## 🔒 Privacy

This application is **100% client-side**. Your data:

- ✅ Never leaves your browser
- ✅ Is not stored on any server
- ✅ Is not tracked or analytics
- ✅ Is not shared with third parties

All processing happens locally in your browser using JavaScript.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Areas where help is needed:

- Adding support for more fitness tracker data formats (Fitbit, Apple Health, etc.)
- Improving the UI/UX
- Adding new slide types and visualizations
- Internationalization (i18n)
- Accessibility improvements

### Development Guidelines

- Use TypeScript for type safety
- Follow the existing component structure
- Keep styles in `styles/main.css`
- Test with sample data before submitting PRs

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by Spotify Wrapped
- Built with React + TypeScript
- Uses Vite for fast development and building

## ⭐ Show Your Support

If you found this project helpful, consider:

- ⭐ Starring this repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

## 📧 Contact

- Feedback: hi@tidefield.dev
- GitHub Issues: [Create an issue](https://github.com/yourusername/fitness-unwrapped/issues)
