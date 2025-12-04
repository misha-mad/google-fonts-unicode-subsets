import {resolve} from 'path'

export const NAM_FILES_ROOT = resolve(process.cwd(), 'nam-files/Lib/gfsubsets/data')

export const SLICE_MAP: Record<string, string> = {
  'chinese-hongkong_unique-glyphs': 'hongkong-chinese_default.txt',
  'chinese-simplified_unique-glyphs': 'simplified-chinese_default.txt',
  'chinese-traditional_unique-glyphs': 'traditional-chinese_default.txt',
  'japanese_unique-glyphs': 'japanese_default.txt',
  'korean_unique-glyphs': 'korean_default.txt',
}
