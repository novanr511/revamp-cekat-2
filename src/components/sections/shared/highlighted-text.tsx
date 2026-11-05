/** Emphasize existing closing words without rewriting or splitting their text. */
export function HighlightedText({ text }: { text: string }) {
  const words = [...text.matchAll(/\S+/g)];
  const hasCjk = /[\u3040-\u30ff\u3400-\u9fff]/u.test(text);
  const hasHangul = /[\uac00-\ud7a3]/u.test(text);
  let splitAt: number;

  if (hasCjk) {
    // Japanese and Chinese titles do not use spaces between words. Highlight a
    // short closing phrase instead of making the entire sentence unbreakable.
    splitAt = Array.from(text).slice(0, -5).join("").length;
  } else {
    // Korean spaces separate phrases, but a multi-word Hangul highlight is too
    // wide to keep on one line at narrow viewport sizes.
    const count = hasHangul ? 1 : words.length > 7 ? 3 : 2;
    const first = words[Math.max(0, words.length - count)];
    splitAt = first?.index ?? 0;

    // Keep longer Latin-script headings from creating a highlight wider than
    // the title column; remove whole leading words, preserving the copy.
    while (
      words.length > 1 &&
      text.slice(splitAt).trim().length > 20
    ) {
      const next = words.find((word) => word.index > splitAt);
      if (!next) break;
      splitAt = next.index;
    }
  }

  return <>{text.slice(0, splitAt)}<span className="headline-highlight whitespace-nowrap">{text.slice(splitAt)}</span></>;
}
