import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { ContactForm } from "../components/contactForm/index";

const IndexPage = ({ data }) => (
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
    <section>
      <h2>Our Projects</h2>

      <article>
        <h3>Tsavo East Community Development Initiative (TECDI)</h3>
        <p>
          We are now working in partnership with Simon Musila and the Tsavo East
          Community Development Initiative. TECDI are a community organisation
          in Kenya that like us are hoping to educate children as a long-term
          solution to fight poverty. Simon runs the initiative in his spare time
          to try and help his community. They have started a community library
          and museum as well as coming together to support children with their
          school fees. They do this around the Tsavo East National Park in the
          Kasaala disctrict.
        </p>
        <p>
          If you would like to find out more or get involved with the charity,
          please{" "}
          <a href="#contact-us" title={"Contact us"}>
            contact us
          </a>
        </p>
      </article>
    </section>
    <section>
      <Img fluid={data.smileLogo.childImageSharp.fluid} />
    </section>
    <section className="fundraising">
      <div className="fundraising-overview">
        <h2>Help us achieve even more</h2>
        <p>
          We use Virgin Money Giving as our preferred donation method, it's
          quick, secure and it means that we can easily claim the Gift Aid on
          any money that is given to the charity.
        </p>
      </div>
      <div className="fundraising-option">
        <h3>Make a One Off Donation</h3>
        <p>
          We split our funds between building new facilities, supplying
          equipment for students and covering any fees required for a child to
          go to school. Any single donation is vital to ensuring we can continue
          to provide for our schools and children so please don't hesitate to
          make a donation of any amount.
        </p>
      </div>
      <div className="fundraising-option">
        <h3>Make a Regular Donation</h3>
        <p>
          A regular donation of £10 a month will cover the costs of sending one
          child to secondary school for a year. £50 a month would help us fund a
          student through a year at university. No matter what you can afford, a
          regular donation is the best way to support BASIK.
        </p>
      </div>
      <div className="fundraising-option">
        <h3>Fundraise For BASIK</h3>
        <p>
          Have you had a hair brained idea for a charity event or are you taking
          part in an activity where you want to raise money for BASIK? Create a
          fundraising page on Virgin Money Giving and select BASIK as your
          charity to make sure your sponsorship helps us build more schools in
          Kenya.
        </p>
      </div>
    </section>
    <ContactForm />
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query {
    smileLogo: file(relativePath: { eq: "MAINLOGO_UK_AmazonSmile.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
