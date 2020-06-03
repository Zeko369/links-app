import React from "react"
import { Flex, Heading, Stack } from "@chakra-ui/core"

interface TopRowProps {
  title: string
  right: React.ReactNode
}

const TopRow: React.FC<TopRowProps> = (props) => {
  const { title, right } = props

  return (
    <Flex justify="space-between" py={4}>
      <Heading>{title}</Heading>
      <Stack isInline>{right}</Stack>
    </Flex>
  )
}

export default TopRow
