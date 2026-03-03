import React, { useState, useEffect } from 'react';
import { Power } from 'lucide-react';
import './ThemeToggle.css';
export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        setTheme('light');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.removeItem('theme'); 
    }, []);
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };
    const handleMouseEnter = () => {
        const alternateTheme = theme === 'light' ? 'dark' : 'light';
        if (alternateTheme === 'dark') {
            document.documentElement.style.setProperty('--prefetch-bg', 'var(--color-azul-medianoche)');
        } else {
            document.documentElement.style.setProperty('--prefetch-bg', 'var(--color-crema)');
        }
    };
    return (
        <div className="theme-toggle-wrapper" onMouseEnter={handleMouseEnter}>
            <label className="theme-toggle">
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
                {}
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
