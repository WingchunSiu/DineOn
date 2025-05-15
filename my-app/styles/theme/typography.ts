export const fontFamily = {
  regular: 'Nunito-Regular',
  bold: 'Nunito-Bold',
  semiBold: 'Nunito-SemiBold'
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
  display: 36,
  hero: 50
};

export const lineHeight = {
  xs: 16,
  sm: 20,
  base: 24,
  md: 28,
  lg: 32,
  xl: 36,
  xxl: 40
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const
};

export const typography = {
  title: {
    fontSize: fontSize.xxxl,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.bold
  },
  subtitle: {
    fontSize: fontSize.xl,
    lineHeight: lineHeight.md,
    fontWeight: fontWeight.bold
  },
  body: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.regular
  },
  bodySemiBold: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.semiBold
  },
  caption: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.regular
  },
  button: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.bold
  }
}; 