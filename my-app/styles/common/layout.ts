import { StyleSheet } from 'react-native';
import { spacing, padding, margin } from '../theme/spacing';

export const layout = StyleSheet.create({
  container: {
    flex: 1,
    padding: padding.container
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  section: {
    marginVertical: margin.section
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    paddingVertical: padding.section.vertical,
    paddingHorizontal: padding.section.horizontal
  }
}); 