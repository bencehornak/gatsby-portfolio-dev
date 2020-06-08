import React from 'react';
import { Container } from 'components/common';
import { Wrapper, Header, Screenshot } from './styles';

export const ProjectDetails = ({ post, screenshot }) => (
  <Wrapper as={Container}>
    <Header>
      <h1>{post.frontmatter.title}</h1>
      <Screenshot src={screenshot.publicURL} />
    </Header>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: post.html }} className="blog-post-content" />
  </Wrapper>
);
