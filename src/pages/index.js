import React from "react"
import { API } from "aws-amplify"

import Layout from "../components/layout"
import SEO from "../components/seo"

const contact = ({ name, email, message }) => {
  const response = API.post("contactForm", "/contact", {
    body: {
      name,
      email,
      message,
    },
  })
  console.log("do a contact")
  return response
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Bringing lasting change to children's lives through education</h1>
    <p>
      We are working to <strong>end poverty through education</strong> and give
      children the opportunity to have a brighter future. BASIK provides schools
      with running water, desks, toilets and a building that will last. We also
      ensure that children who cannot afford to go to school can go and give{" "}
      <strong>all pupils a malaria net</strong> to take home.
    </p>
    <p>
      With your help we can bring lasting change to children's lives by giving
      them an education.
    </p>
    <button
      onClick={() =>
        contact({ name: "Ian", email: "ian@ian-thomas.net", message: "test" })
      }
    >
      Send a test contact
    </button>
  </Layout>
)

export default IndexPage
