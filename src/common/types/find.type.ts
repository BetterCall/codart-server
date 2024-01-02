export type FindOrderType<Entity> = {
    [P in keyof Entity]?: "ASC" | "DESC" | 1 | -1
}