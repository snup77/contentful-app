const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const contentfulAccessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

export async function callContentful(query, variables = {}) {
  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`

  const fetchOptions = {
    endpoint: fetchUrl,
    method: "POST",
    headers: {
      Authorization: `Bearer ${contentfulAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  }

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json()
    )
    return data
  } catch (error) {
    throw new Error("Could not fetch products!")
  }
}

const gql = String.raw

export const getPostList = gql`
  query getPostList($limit: Int!) {
    blogPostCollection(limit: $limit, order: date_DESC) {
      items {
        sys {
          id
        }
        date
        title
        slug
        heroImage {
          url
          description
        }
        excerpt
        tags
      }
    }
  }
`
export const getSlugs = gql`
  query getSlugs($limit: Int!) {
    blogPostCollection(limit: $limit) {
      items {
        slug
      }
    }
  }
`

export const getArticle = gql`
  query getArticle($slug: String!) {
    blogPostCollection(limit: 1, where: { slug: $slug }) {
      total
      items {
        sys {
          id
        }
        date
        title
        slug
        heroImage {
          url
          description
        }
        excerpt
        tags
        externalUrl
        author {
          name
          description
          twitchUsername
          twitterUsername
          gitHubUsername
          websiteUrl
          image {
            url
            title
            width
            height
            description
          }
        }
        body {
          json
          links {
            entries {
              inline {
                sys {
                  id
                }
                __typename
                ... on BlogPost {
                  title
                  slug
                }
              }
              block {
                sys {
                  id
                }
                __typename
                ... on VideoEmbed {
                  title
                  embedUrl
                }
                ... on CodeBlock {
                  description
                  language
                  code
                }
              }
            }
            assets {
              block {
                sys {
                  id
                }
                url
                title
                width
                height
                description
              }
            }
          }
        }
      }
    }
  }
`