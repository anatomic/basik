import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"
import Img from "gatsby-image"

import "./header.css"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "og-image.png" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <header class="header">
      <div class="logo">
        <Link to="/">
          <Img fluid={data.placeholderImage.childImageSharp.fluid} />
        </Link>
      </div>
    </header>
  )
}

export default Header
