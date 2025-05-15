export const colors = {
  primary: {
    main: '#990000',
    light: '#b30000'
  },
  secondary: {
    main: '#0a7ea4',
    light: '#0c8fb8'
  },
  text: {
    primary: '#11181C',
    secondary: '#687076'
  },
  background: {
    primary: '#ffffff',
    secondary: '#F8F9FA'
  },
  status: {
    success: 'green',
    warning: 'orange',
    error: 'red'
  },
  border: {
    light: '#ddd',
    medium: '#ccc'
  }
};

// Single light theme configuration
export const theme = {
  text: colors.text.primary,
  background: colors.background.primary,
  tint: colors.secondary.main,
  icon: colors.text.secondary,
  tabIconDefault: colors.text.secondary,
  tabIconSelected: colors.secondary.main
}; 