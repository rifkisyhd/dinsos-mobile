import React from "react";
import { Text, View } from "react-native";

const parseStyledText = (text, boldColor = "#000") => {
    const lines = text.split("\n");
    const result = [];

    lines.forEach((line, lineIndex) => {
        const isNumbered = /^\d+\.\s/.test(line);
        let content = isNumbered ? line.replace(/^\d+\.\s/, "") : line;

        const parts = content.split(
            /(\[bold\]|\[\/bold\]|\[italic\]|\[\/italic\])/g,
        );
        let isBold = false;
        let isItalic = false;

        const prefix = isNumbered ? line.match(/^\d+\./)[0] + " " : "";

        result.push(
            <Text
                key={`line-${lineIndex}-prefix`}
                style={{ fontSize: 14, lineHeight: 22 }}>
                {prefix}
            </Text>,
        );

        parts.forEach((part, idx) => {
            if (part === "[bold]") isBold = true;
            else if (part === "[/bold]") isBold = false;
            else if (part === "[italic]") isItalic = true;
            else if (part === "[/italic]") isItalic = false;
            else if (part) {
                result.push(
                    <Text
                        key={`line-${lineIndex}-part-${idx}`}
                        style={{
                            fontSize: 14,
                            lineHeight: 22,
                            fontWeight: isBold ? "bold" : "normal",
                            fontStyle: isItalic ? "italic" : "normal",
                            color: isBold ? boldColor : "#000", // kalau bold, pakai warna custom
                        }}>
                        {part}
                    </Text>,
                );
            }
        });

        result.push(<Text key={`br-${lineIndex}`}>{"\n"}</Text>);
    });

    return result;
};

export default function StyledDescription({ description, style, boldColor }) {
    if (!description) return null;

    return (
        <View style={style}>
            <Text>{parseStyledText(description, boldColor)}</Text>
        </View>
    );
}
