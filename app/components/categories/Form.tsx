import React from "react"
import { useForm } from "react-hook-form"
import { FormLabel, FormControl, Input, Button } from "@chakra-ui/core"

interface CategoryFormProps {
  onSubmit: ({ name: string }) => void | Promise<void>
  initValues?: {
    name: string
  }
  text?: string
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, initValues = {}, text = "Submit" }) => {
  const { handleSubmit, register, formState } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="name">Category name</FormLabel>
        <Input name="name" placeholder="name" ref={register} defaultValue={initValues.name} />
      </FormControl>
      <Button mt={4} variantColor="teal" isLoading={formState.isSubmitting} type="submit">
        {text}
      </Button>
    </form>
  )
}

export default CategoryForm
