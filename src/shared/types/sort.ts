export const SORT_PARAM = 'sort'

export type ISortOrder = 'asc' | 'desc'

export const SORT_ORDER = {
  asc: 'asc',
  desc: 'desc',
} as const satisfies Record<string, ISortOrder>
