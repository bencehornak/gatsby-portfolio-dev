import React from 'react';
import { Container, Card } from 'components/common';
import starIcon from 'assets/icons/star.svg';
import forkIcon from 'assets/icons/fork.svg';
import { useStaticQuery, graphql } from 'gatsby';
import { Wrapper, Grid, Item, Content, Stats } from './styles';

function useProjects() {
  const {
    github: {
      viewer: {
        repositories: { edges: githubEdges },
      },
    },
    gitlab: {
      namespace: {
        projects: { edges: gitlabEdges },
      },
    },
    markdown: { edges: markdownEdges },
  } = useStaticQuery(
    graphql`
      {
        github {
          viewer {
            repositories(first: 8, orderBy: { field: STARGAZERS, direction: DESC }) {
              edges {
                node {
                  id
                  name
                  url
                  description
                  stargazers {
                    totalCount
                  }
                  forkCount
                }
              }
            }
          }
        }
        gitlab {
          namespace(fullPath: "bencehornak") {
            projects {
              edges {
                node {
                  id
                  name
                  visibility
                  description
                  descriptionHtml
                  webUrl
                  forksCount
                  starCount
                }
              }
            }
          }
        }
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
    ...githubEdges.map(({ node }) => node),
    ...gitlabEdges
      .filter(({ node }) => node.visibility === 'public')
      .map(({ node }) => ({
        id: node.id,
        name: node.name,
        url: node.webUrl,
        description: node.descriptionHtml,
        stargazers: { totalCount: node.starCount },
        forkCount: node.forksCount,
      })),
    ...markdownEdges.map(({ node: { frontmatter } }) => ({
      id: frontmatter.path,
      name: frontmatter.title,
      url: `/project/${frontmatter.path}`,
      description: frontmatter.description,
      stargazers: { totalCount: 0 },
      forkCount: 0,
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
              <Stats>
                <div>
                  <img src={starIcon} alt="stars" />
                  <span>{node.stargazers.totalCount}</span>
                </div>
                <div>
                  <img src={forkIcon} alt="forks" />
                  <span>{node.forkCount}</span>
                </div>
              </Stats>
            </Card>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};
