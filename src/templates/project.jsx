import React from 'react';
import { graphql } from 'gatsby';
import { SEO, Layout } from 'components/common';
import { ProjectDetails } from 'components/project-details';
import config from '../data/config';

export default function Template({ data }) {
  const { post, screenshot } = data;
  return (
    <Layout>
      <SEO title={`${post.frontmatter.title} - ${config.defaultTitle}`} />
      <ProjectDetails post={post} screenshot={screenshot} />
    </Layout>
  );
}
export const pageQuery = graphql`
  query ProjectByPath($projectPath: String!) {
    post: markdownRemark(frontmatter: { path: { eq: $projectPath } }) {
      html
      frontmatter {
        path
        title
      }
    }
    screenshot: file(name: { eq: $projectPath }, extension: { eq: "svg" }) {
      publicURL
    }
  }
`;
