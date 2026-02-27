import React, { useState, useEffect } from 'react';
import { Power } from 'lucide-react';
import './ThemeToggle.css';

export default function ThemeToggle() {
    // Default to 'light' as requested
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Enforce Light Mode on every reload (The "Sacred Timeline")
        setTheme('light');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.removeItem('theme'); // Clear any persisted state to be safe
    }, []);

    const toggleTheme = () => {
        // Toggle logic: If light, go dark. If dark, go light.
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <div className="theme-toggle-wrapper">
            <label className="theme-toggle">
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />

                {/* The Neumorphic Circle */}
                <span className="power-button">
                    <Power
                        size={19}
                        className="power-icon"
                        strokeWidth={2.5}
                    />
                </span>
            </label>
        </div>
    );
}
