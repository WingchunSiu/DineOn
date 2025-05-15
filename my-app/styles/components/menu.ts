import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography, fontSize } from '../theme/typography';

export const menuStyles = StyleSheet.create({
  container: {
    paddingBottom: spacing.lg
  },
  categorySection: {
    marginTop: spacing.lg
  },
  categoryTitle: {
    ...typography.subtitle,
    marginBottom: spacing.sm,
    color: colors.text.primary
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light
  },
  featuredItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: spacing.md
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: spacing.md
  },
  featuredImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: spacing.sm
  },
  itemText: {
    fontSize: fontSize.base,
    fontWeight: '500',
    flex: 1
  },
  featuredText: {
    ...typography.subtitle,
    textAlign: 'center'
  },
  errorText: {
    fontSize: fontSize.md,
    textAlign: 'center',
    color: colors.status.error,
    marginTop: spacing.lg
  }
}); 