import React from 'react';
import { Text, View } from 'react-native';

const parseStyledText = (text) => {
  // Split dulu per line
  const lines = text.split('\n');
  const result = [];

  lines.forEach((line, lineIndex) => {
    // Cek numbered list: mulai dengan angka + titik
    const isNumbered = /^\d+\.\s/.test(line);
    // Hilangkan numbering default biar nggak digandakan
    let content = isNumbered ? line.replace(/^\d+\.\s/, '') : line;

    // Sekarang split untuk tag bold/italic
    const parts = content.split(/(\[bold\]|\[\/bold\]|\[italic\]|\[\/italic\])/g);
    let isBold = false;
    let isItalic = false;

    // Jika numbered, tambahin nomor prefix, kalau bukan numbered tinggal bullet
    const prefix = isNumbered
      ? line.match(/^\d+\./)[0] + ' '
      : '• ';

    // Render prefix sebagai bagian terpisah
    result.push(
      <Text
        key={`line-${lineIndex}-prefix`}
        style={{ fontSize: 14, lineHeight: 22 }}
      >
        {prefix}
      </Text>
    );

    // Render sisanya per part
    parts.forEach((part, idx) => {
      if (part === '[bold]') isBold = true;
      else if (part === '[/bold]') isBold = false;
      else if (part === '[italic]') isItalic = true;
      else if (part === '[/italic]') isItalic = false;
      else if (part) {
        result.push(
          <Text
            key={`line-${lineIndex}-part-${idx}`}
            style={{
              fontSize: 14,
              lineHeight: 22,
              fontWeight: isBold ? 'bold' : 'normal',
              fontStyle: isItalic ? 'italic' : 'normal',
            }}
          >
            {part}
          </Text>
        );
      }
    });

    // Setelah tiap line, tambahin break
    result.push(<Text key={`br-${lineIndex}`}>{'\n'}</Text>);
  });

  return result;
};

export default function StyledDescription({ description, style }) {
  if (!description) return null;

  return (
    <View style={style}>
      <Text>
        {parseStyledText(description)}
      </Text>
    </View>
  );
}
