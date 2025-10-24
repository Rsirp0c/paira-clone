# Paira Profile Card - React Implementation

A pixel-perfect React implementation of the Paira MVP profile card design from Figma.

## Features

- **Mobile-First Design**: Optimized for 393px width (iPhone size)
- **Swipeable Card Interface**: Profile cards with swipe-to-connect functionality
- **Custom Styling**: Tailwind CSS with custom color palette and design tokens
- **Custom Fonts**: DM Serif Display and Plus Jakarta Sans via Google Fonts
- **Interactive Elements**: Animated buttons with hover effects
- **Status Bar & Navigation**: Complete iOS-style status bar and bottom tab navigation

## Tech Stack

- **React 18.3.1**: Modern React with hooks
- **Vite 6.0.1**: Fast build tool and dev server
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Google Fonts**: DM Serif Display, Plus Jakarta Sans

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
app-clone/
├── src/
│   ├── assets/
│   │   └── figmaAssets.js       # Image URLs from Figma
│   ├── components/
│   │   ├── ProfileCard.jsx      # Main profile card component
│   │   └── TabBar.jsx           # Bottom navigation bar
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles & Tailwind imports
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies

```

## Design Features

### Color Palette

- **Primary Neutral**: `#f7f7f1` (50), `#a7a7a3` (300), `#5e5e5c` (700), `#3d3d3b` (900), `#1e1e1d` (950)
- **Primary Blue**: `#605cff` (500)
- **Primary Yellow**: `#fbff5c` (50)
- **Base Card**: `#232421`
- **Base Tag**: `rgba(63,63,58,0.3)`

### Typography

- **Headings**: DM Serif Display
- **Body**: Plus Jakarta Sans
- **Status Bar**: SF Pro

### Interactive Elements

- Close button (dismiss profile)
- Premium ping button (send connection request)
- Handshake button (accept connection)
- Tab navigation (People/Request)
- Settings button

## Components

### ProfileCard

The main component displaying:
- User profile photo
- Name with verification badge
- Job title and location
- Interest/skill tags
- Stacked background cards for next profiles
- Action buttons for interactions

### TabBar

Bottom navigation with three tabs:
- Notes
- Chat
- User profile

## Customization

To customize the design:

1. **Colors**: Edit `tailwind.config.js` under `theme.extend.colors`
2. **Fonts**: Modify font imports in `src/index.css`
3. **Profile Data**: Update the content in `ProfileCard.jsx`
4. **Images**: Replace image URLs in `src/assets/figmaAssets.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.
