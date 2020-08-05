import React from 'react';
import { Container, Card } from 'components/common';
import { useStaticQuery, graphql } from 'gatsby';
import { Wrapper, Grid, Item, Content } from './styles';

function useProjects() {
  const {
    markdown: { edges: markdownEdges },
  } = useStaticQuery(
    graphql`
      {
        markdown: allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
                description
                path
              }
            }
          }
        }
      }
    `
  );
  return [
    ...markdownEdges.map(({ node: { frontmatter } }) => ({
      id: frontmatter.path,
      name: frontmatter.title,
      url: `/project/${frontmatter.path}`,
      description: frontmatter.description,
    })),
  ];
}

export const Projects = () => {
  const projects = useProjects();
  return (
    <Wrapper as={Container} id="projects">
      <h2>Projects</h2>
      <Grid>
        {projects.map(node => (
          <Item key={node.id} as="a" href={node.url} target="_blank" rel="noopener noreferrer">
            <Card>
              <Content>
                <h4>{node.name}</h4>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={{ __html: node.description }} />
              </Content>
            </Card>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};
