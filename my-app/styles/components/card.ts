import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, padding } from '../theme/spacing';
import { typography, fontSize } from '../theme/typography';

export const cardStyles = StyleSheet.create({
  container: {
    width: 320,
    height: 280,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: colors.background.primary,
    padding: 0,
    marginBottom: spacing.md
  },
  title: {
    ...typography.bodySemiBold,
    width: '100%',
    textAlign: 'center',
    marginTop: spacing.sm
  },
  text: {
    fontSize: fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    width: '100%',
    marginBottom: spacing.sm
  },
  image: {
    height: 180,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  status: {
    fontStyle: 'italic',
    fontSize: fontSize.md,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.md
  }
}); 