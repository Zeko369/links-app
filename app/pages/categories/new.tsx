import React from "react"
import { useForm } from "react-hook-form"
import { FormLabel, FormControl, Input, Button } from "@chakra-ui/core"
import { useRouter } from "blitz"
import createCategory from "app/mutations/createCategory"

export interface CreateCategoryProps {
  name: string
}

const NewCategory: React.FC = () => {
  const { handleSubmit, register, formState } = useForm()
  const router = useRouter()

  const onSubmit = async (values: CreateCategoryProps) => {
    await createCategory(values)
    router.push("/categories")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="name">Category name</FormLabel>
        <Input name="name" placeholder="name" ref={register} />
      </FormControl>
      <Button mt={4} variantColor="teal" isLoading={formState.isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  )
}

export default NewCategory
