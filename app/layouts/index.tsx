import { Box, Flex, Text, useColorMode, Button } from "@chakra-ui/core"
import Link from "app/components/Link"

const NavLink = ({ children, ...props }) => (
  <Link px={2} color="white" {...props}>
    {children}
  </Link>
)

const Layout: React.FC = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Flex bg="Gray" w="100%" px={5} py={4} justifyContent="space-between" alignItems="center">
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Link href="/">
            <Text pl={3} color="white">
              Links thingy
            </Text>
          </Link>
        </Flex>
        <Box>
          <NavLink href="/">Links</NavLink>
          <NavLink href="/categories">Categories</NavLink>
        </Box>
        <Box>
          <NavLink href="/links/add">Add</NavLink>
          <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
        </Box>
      </Flex>
      <Box w="90%" maxW="1080px" margin="0 auto">
        {children}
      </Box>
    </>
  )
}

export default Layout
