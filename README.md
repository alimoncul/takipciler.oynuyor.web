# takipciler.oynuyor - Maç Geçmişi

## ✨ Features

- **📊 Match History**: View detailed results from your Instagram Following Game battles
- **🔍 Player Search**: Search for specific players in match standings
- **📅 Date Filtering**: Filter matches by date
- **📱 Mobile Responsive**: Works seamlessly on all devices
- **🇹🇷 Turkish Language**: Fully localized in Turkish
- **🎨 Modern UI**: Built with React and Tailwind CSS

## 🛠️ Development

### Prerequisites
- Node.js 20+
- npm

### Installation
```bash
cd results
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## 📁 Project Structure

```
results/
├── src/
│   ├── components/         # React components
│   │   ├── MatchCard.jsx  # Individual match display
│   │   ├── MatchDetails.jsx # Detailed match view with search
│   │   ├── DateFilter.jsx # Date filtering component
│   │   └── PlayerAvatar.jsx # Player avatar component
│   ├── hooks/
│   │   └── useMatchData.js # Match data loading hook
│   ├── assets/            # Static assets
│   ├── App.jsx           # Main application
│   └── main.jsx          # React entry point
├── public/               # Public assets
└── dist/                # Build output
```

## 🎮 Data Format

The app expects match files in the `public/matches/` folder in JSON format:

```json
{
  "matchId": "match_123456789",
  "timestamp": "2025-08-24T07:45:25.283Z",
  "totalPlayers": 384,
  "standings": [
    {
      "position": 1,
      "username": "player_name",
      "displayName": "Player Name",
      "eliminations": 8,
      "timeOfDeath": null,
      "survivedFor": {
        "totalSeconds": 66,
        "formatted": "1:06"
      }
    }
  ]
}
```

### File Structure
```
results/
└── public/
    └── matches/
        ├── match_123456789.json
        ├── match_987654321.json
        └── ...
```

## 🚀 Deployment

### Automatic Deployment (Recommended)

The app automatically deploys to GitHub Pages when you push changes to the `results/` folder:

1. Push changes to the main branch
2. GitHub Actions will build and deploy automatically
3. Visit `https://your-username.github.io/takipciler.oynuyor/results/`

### Manual Deployment

```bash
npm run deploy
```

## 🎨 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD

## 📝 License

This project is part of the Instagram Following Game suite.