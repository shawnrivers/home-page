export function convertRichTextToPlainText(
  richText: { plain_text: string }[],
): string {
  return richText.reduce((prev, curr) => `${prev}${curr.plain_text}`, '');
}
