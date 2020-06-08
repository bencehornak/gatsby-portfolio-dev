const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
  );

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create pages for each markdown file.
  const blogPostTemplate = path.resolve(`src/templates/project.jsx`);
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { path: projectPath } = node.frontmatter;
    createPage({
      path: `/project/${projectPath}`,
      component: blogPostTemplate,
      context: {
        projectPath,
      },
    });
  });
};
