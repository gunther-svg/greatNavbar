
"use client";

import React, { useState } from 'react';
import {
    Box,
    Fab,
    Zoom,
    Tooltip,
    createTheme,
    ThemeProvider,
    CssBaseline,
    Typography,
    Container,
    Paper
} from '@mui/material';
import { Home, User, Settings, Menu, X, Briefcase } from 'lucide-react';

// 1. Custom Theme Definition (Orange & Blue)
const theme = createTheme({
    palette: {
        primary: {
            main: '#FF6D00', // Vibrant Deep Orange
            dark: '#E65100',
            contrastText: '#fff',
        },
        secondary: {
            main: '#2962FF', // Snappy Royal Blue
            dark: '#0039CB',
            contrastText: '#fff',
        },
        background: {
            default: '#F4F6F8', // Soft background to make the punch-hole effect pop
        },
    },
});

// 2. Navigation Items
// Added a 'Briefcase' icon to represent job searches!
const navItems = [
    { id: 'home', icon: <Home size={20} />, label: 'Home', href: '/' },
    { id: 'profile', icon: <User size={20} />, label: 'Profile', href: '/profile' },
    { id: 'jobs', icon: <Briefcase size={20} />, label: 'Remote Jobs', href: '/jobs' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
];

function FloatingNav() {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    // Reusable bouncy transition string
    const snappyTransition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 32,
                left: 32,
                display: 'flex',
                flexDirection: 'column-reverse',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            {/* --- Main Toggle Button (Primary Orange) --- */}
            <Fab
                color="primary"
                onClick={toggleOpen}
                aria-label="toggle navigation"
                sx={{
                    width: 64,
                    height: 64,
                    // The border acts as a mask against the line, enforcing the punch-hole look
                    border: `4px solid ${theme.palette.background.default}`,
                    boxShadow: '0 8px 24px rgba(255, 109, 0, 0.4)',
                    transition: snappyTransition,
                    transform: open ? 'rotate(180deg) scale(0.95)' : 'rotate(0deg) scale(1)',
                    '&:hover': {
                        transform: open ? 'rotate(180deg) scale(1)' : 'rotate(0deg) scale(1.05)',
                        backgroundColor: 'primary.dark',
                    },
                }}
            >
                {open ? <X size={28} /> : <Menu size={28} />}
            </Fab>

            {/* --- Expandable List Container --- */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2, // Space between list and main button
                    pointerEvents: open ? 'auto' : 'none', // Prevent invisible clicks when closed
                }}
            >
                {/* --- The Line Punch Hole Effect --- */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: '6px',
                        backgroundColor: 'secondary.main',
                        // Animate height from bottom to top
                        height: open ? '100%' : '0%',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 0,
                        borderRadius: '4px',
                        transition: 'height 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        opacity: open ? 1 : 0,
                        boxShadow: '0 2px 8px rgba(41, 98, 255, 0.3)',
                    }}
                />

                {/* --- Nav Icons (Secondary Blue) --- */}
                {navItems.map((item, index) => (
                    <Zoom
                        key={item.id}
                        in={open}
                        style={{
                            // Stagger the entrance for that snappy cascade feel
                            transitionDelay: open ? `${index * 60}ms` : '0ms',
                        }}
                        timeout={400}
                    >
                        {/* In a Next.js environment, wrap Tooltip with:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <Link href={item.href} passHref legacyBehavior> ... </Link> 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */}
                        <Tooltip title={item.label} placement="right" arrow>
                            <Fab
                                size="small"
                                color="secondary"
                                aria-label={item.label}
                                sx={{
                                    zIndex: 1,
                                    width: 48,
                                    height: 48,
                                    // Thick border matching the background makes it "punch through" the line
                                    border: `4px solid ${theme.palette.background.default}`,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    transition: 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                                    '&:hover': {
                                        transform: 'scale(1.2)',
                                        backgroundColor: 'secondary.dark',
                                        borderColor: '#fff',
                                    },
                                }}
                            >
                                {item.icon}
                            </Fab>
                        </Tooltip>
                    </Zoom>
                ))}
            </Box>
        </Box>
    );
}

// ----------------------------------------------------------------------
// PREVIEW WRAPPER (Demonstrates the layout so you can see it in action)
// ----------------------------------------------------------------------
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" sx={{ pt: 10, pb: 20 }}>
                <Typography variant="h3" fontWeight="900" color="primary" gutterBottom>
                    Dynamic Floating Navbar
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    A snappy, emotion-driven collapsible FAB built with Material UI for Next.js.
                </Typography>

                <Paper sx={{ p: 4, mt: 4, borderRadius: 4, boxShadow: '0 12px 32px rgba(0,0,0,0.05)' }}>
                    <Typography variant="body1" paragraph>
                        Look to the <strong>bottom-left</strong> corner of your screen.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Clicking the orange primary floating action button triggers a bouncy, cubic-bezier transition, expanding the vertical menu.
                    </Typography>
                    <Typography variant="body1" color="secondary.main" fontWeight="bold">
                        Notice how the blue icons visually "punch through" the solid vertical line!
                    </Typography>
                </Paper>
            </Container>

            {/* The component you requested */}
            <FloatingNav />
        </ThemeProvider>
    );
}

```
