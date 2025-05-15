import { View, type ViewProps } from 'react-native';
import { theme } from '../styles';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  return <View style={[{ backgroundColor: theme.background }, style]} {...otherProps} />;
}
