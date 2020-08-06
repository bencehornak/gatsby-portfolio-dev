import React from 'react';
import { Container } from 'components/common';
import { Header } from 'components/theme';
import { Wrapper, ProjectHeader, Screenshot } from './styles';

export const ProjectDetails = ({ post, screenshot }) => (
  <>
    <Header />
    <Wrapper as={Container}>
      <ProjectHeader>
        <h1>{post.frontmatter.title}</h1>
        <Screenshot src={screenshot.publicURL} />
      </ProjectHeader>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: post.html }} className="blog-post-content" />
    </Wrapper>
  </>
);
