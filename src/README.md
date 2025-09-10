# Modern Campus Management System

A responsive web application for campus management built with React, TypeScript, and Tailwind CSS v4.

## Features

- **Role-based Authentication**: Admin/Authority, Class Representative (CR), and Student roles
- **Room Management**: Real-time status tracking for Panaroma Building (student classrooms) and Nexus Building (faculty rooms)
- **Equipment Tracking**: Monitor projectors, ACs, smart boards, and other classroom equipment
- **Anonymous Complaints**: Students can submit complaints without logging in
- **Lab Assistant Assignment**: Authority and CR users can assign lab assistants to rooms
- **History Tracking**: Timeline view of reported issues for each room
- **Theme Customization**: Blue/Purple themes with dark/light mode support
- **Responsive Design**: Optimized for both desktop and mobile viewports

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Animations**: Motion (Framer Motion)
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd modern-campus-management
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/
│   └── main.tsx          # Application entry point
├── components/           # React components
│   ├── ui/              # Shadcn/ui components
│   └── figma/           # Figma-related components
├── styles/
│   └── globals.css      # Global styles and theme variables
├── App.tsx              # Main application component
└── package.json
```

## Authentication

The system supports three user roles:

1. **Admin/Authority**: Full system access, can assign lab assistants
2. **Class Representative (CR)**: Can manage room issues and assign lab assistants
3. **Students**: View-only access, can submit anonymous complaints

### Demo Credentials

- **Admin**: admin@university.edu / admin123
- **CR**: cr@university.edu / cr123
- **Student**: student@university.edu / student123

## Building Management

### Panaroma Building (Student Classrooms)

- Rooms: P101-P110, P201-P210, P301-P310
- Features: Equipment status, complaint submission, history tracking

### Nexus Building (Faculty Rooms)

- Displays as "Faculty Room" with distinctive badges
- Faculty-only access with enhanced privacy

## Theme Customization

The application supports:

- **Color Themes**: Blue (default) and Purple
- **Display Modes**: Light and Dark
- **Responsive Typography**: Minimum 16px font size on mobile

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
