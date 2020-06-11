import { Link, Category } from "@prisma/client"

export type LinkWithCategories = Link & {
  categories: Category[]
}

export type Refetch<T> = ({ force, throwOnError }?: { force?: boolean; throwOnError?: boolean }) => Promise<T>
