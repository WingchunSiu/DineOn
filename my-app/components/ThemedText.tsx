import { Text, type TextProps, StyleSheet } from 'react-native';
import { theme, typography } from '../styles';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: theme.text },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: typography.body,
  defaultSemiBold: typography.bodySemiBold,
  title: typography.title,
  subtitle: typography.subtitle,
  link: {
    ...typography.body,
    color: theme.tint,
    lineHeight: 30
  }
});
