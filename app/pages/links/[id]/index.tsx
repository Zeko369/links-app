import Layout from "app/layouts"
import Form from "app/components/Form"
import { Link } from "@prisma/client"
import { ssrQuery } from "blitz"
import getLink from "app/queries/getLink"

interface ServerProps {
  link: Link
}

export const getServerSideProps = async ({ params, req, res }): Promise<{ props: ServerProps }> => {
  const link = await ssrQuery(getLink, { where: { id: parseInt(params.id) } }, { req, res })
  return { props: { link } }
}

const Edit: React.FC<ServerProps> = ({ link }) => {
  return (
    <Layout>
      <Form link={link} />
    </Layout>
  )
}

export default Edit
