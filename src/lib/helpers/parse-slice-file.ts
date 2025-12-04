export const parseSliceFile = (content: string) =>
  (content.match(/(?<=^subsets \{$\n)[^}]+(?=^\}$)/gm) ?? []).map((m) =>
    (m.match(/(?<=^  codepoints: )\d+/gm) ?? []).map(Number),
  )
