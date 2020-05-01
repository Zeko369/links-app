import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/core"
import { Link as NextLink } from "blitz"

interface LinkProps extends Omit<ChakraLinkProps, "as"> {
  as?: string
}

const Link: React.FC<LinkProps> = ({ as, href, children, ...props }) => {
  return (
    <NextLink href={href} as={as}>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  )
}

export default Link
