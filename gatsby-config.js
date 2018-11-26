module.exports = {
  // pathPrefix: '/wet-my-leaf',
  siteMetadata: {
    name: `Wet My Leaf`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-import`),
          require(`postcss-custom-selectors`),
          require(`postcss-custom-media`),
          require(`postcss-css-variables`),
          require(`postcss-color-function`),
          require(`postcss-hexrgba`),
          require(`postcss-calc`),
          require(`autoprefixer`)
        ]
      }
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: 'Roboto Mono'
        }
      }
    },
    `gatsby-plugin-react-helmet`
  ]
};
