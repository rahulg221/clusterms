export const darkTheme = {
  colors: {
    // Backgrounds (inverted)
    bgPure: 'rgb(12, 12, 12)', // Pure black app background
    bgDark: 'rgb(18, 18, 18)',           // Most surfaces
    bgElevated: 'rgba(255, 255, 255, 0.03)', // Flexible surfaces
    bgLight: 'rgb(24, 24, 24)',          // Dark gray for inputs, blocks
    
    // Text colors (inverted from light mode)
    textPrimary: '#ffffff',      // Bright white for high contrast
    textLight: 'rgba(255, 255, 255, 0.75)',
    textFaint: 'rgba(255, 255, 255, 0.35)',
    textSecondary: 'rgb(0, 0, 0)',

    // Primary color
    primary: 'rgb(233, 217, 113)',            // Vibrant yellow (bright and energetic)
    primaryHover: 'rgb(253, 241, 159)',       // Slightly lighter yellow for hover effect
    primaryLight: 'rgba(255, 214, 10, 0.1)', // Transparent yellow for borders/glows
    primaryDark: 'rgb(211, 177, 9)', // Transparent yellow for borders/glows

    // Accent (Highlight / Spark)
    accent: 'rgb(233, 217, 113)',              // Bold yellow-gold for standout elements
    accentHover: 'rgba(255, 221, 0, 0.4)',   // Glowing hover yellow
    accentLight: 'rgba(255, 221, 0, 0.1)',   // Light yellow for borders/glows

    // Inverted dot color (was black on white)
    dotColor: 'rgba(255, 255, 255, 0.1)',
    topNotePad: 'rgb(255, 255, 255)',     
    treeNode: 'rgb(30, 30, 30)',
    overlay: 'rgba(0, 0, 0, 0.4)',

    // Semantic folder palette (flipped to work on dark)
    colorOne: 'rgb(255, 193, 7)',         // Stays bright for highlights
    colorTwo: 'transparent',             // Notepad background
    colorThree: 'rgba(255, 255, 255, 0.2)',  // Dots and lines on notepad
    colorFour: 'rgb(0, 0, 0)',        // Neutral dark base

    taskBackground: 'rgba(241, 85, 85, 0.05)',
    eventBackground: 'rgba(97, 141, 224, 0.05)',
    taskColor: 'rgb(244, 118, 118)',   // pastel coral
    eventColor: 'rgb(128, 168, 241)',  // pastel blue

    // Utility / Semantic
    border: '#444444',           // Dark gray borders
    error: '#ef9a9a',            // Soft pinkish-red error
    success: '#81c784',          // Green for success (kept same)
    warning: '#fbc02d',          // Vibrant yellow for warnings (kept same)
    info: '#64b5f6',             // Light blue (kept same)
    disabled: '#4a4a4a'          // Muted charcoal gray for disabled elements
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '10px',
    lg: '15px',
    xl: '24px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
  },
  fonts: {
    primary: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
  },
  fontSize: {
    xxs: '0.7rem',     // 12px
    xs: '0.75rem',     // 12px
    sm: '0.8rem',    // 14px
    base: '0.85rem', // 15px
    md: '0.9rem',        // 15px
    lg: '0.95rem',    // 16px
    xl: '1rem',     // 20px
    xxl: '1.1rem',  
  },
};

export const lightTheme = {
  colors: {
  // Backgrounds
  bgPure: 'rgb(252, 252, 252)',
  bgDark: 'rgb(255, 255, 255)',                     // White app background
  bgElevated: 'rgba(0, 0, 0, 0.025)',     // Subtle card background
  bgLight: 'rgb(234, 234, 234)',                    // Light gray for inputs, code blocks

  // Text colors
  textPrimary: '#0a0a0a',                // High-contrast black text
  textLight: '#444444',                  // Dark gray for secondary text
  textFaint: 'rgba(0, 0, 0, 0.5)',
  textSecondary: 'rgb(0, 0, 0)',              // Replaces dark theme white secondary

  // Primary color
  primary: 'rgb(255, 214, 10)',            // Vibrant yellow (bright and energetic)
  primaryHover: 'rgb(255, 230, 70)',       // Slightly lighter yellow for hover effect
  primaryLight: 'rgba(255, 214, 10, 0.1)', // Transparent yellow for borders/glows
  primaryDark: 'rgb(211, 177, 9)', // Transparent yellow for borders/glows

  // Accent (Highlight / Spark)
  accent: 'rgb(0, 0, 0)',              // Bold yellow-gold for standout elements
  accentHover: 'rgba(255, 221, 0, 0.4)',   // Glowing hover yellow
  accentLight: 'rgba(255, 221, 0, 0.1)',   // Light yellow for borders/glows

  // Dot color (reversed for light bg)
  dotColor: 'rgba(0, 0, 0, 0.3)', 
  topNotePad: 'rgba(0, 0, 0, 0.9)',
  treeNode: 'rgb(235, 235, 235)',
  overlay: 'rgba(0, 0, 0, 0.4)',

  // Semantic folder palette (light versions of the dark theme)
  colorOne: 'rgb(0, 0, 0)',                   // Highlight color
  colorTwo: 'rgb(255, 255, 255)',         // Notepad background
  colorThree: 'rgba(0, 0, 0, 0.2)',         // Dots and lines on notepad
  colorFour: 'rgb(187, 187, 187)',

  taskBackground: 'rgba(240, 46, 46, 0.05)',
  eventBackground: 'rgba(53, 114, 228, 0.05)',
  taskColor: 'rgb(240, 46, 46)',   // pastel coral
  eventColor: 'rgb(53, 114, 228)',  // pastel blue

  // Utility / Semantic
  border: '#444444',           // Dark gray borders
  error: '#ef9a9a',            // Soft pinkish-red error
  success: '#81c784',          // Green for success (kept same)
  warning: '#fbc02d',          // Vibrant yellow for warnings (kept same)
  info: '#64b5f6',             // Light blue (kept same)
  disabled: '#4a4a4a'          // Muted charcoal gray for disabled elements
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '10px',
    lg: '15px',
    xl: '24px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
  },
  fonts: {
    primary: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
  },
  fontSize: {
    xxs: '0.7rem',     // 12px
    xs: '0.75rem',     // 12px
    sm: '0.8rem',    // 14px
    base: '0.85rem', // 15px
    md: '0.9rem',        // 15px
    lg: '0.95rem',    // 16px
    xl: '1rem',     // 20px
    xxl: '1.2rem',  
  },
};

export type ThemeType = typeof darkTheme;
