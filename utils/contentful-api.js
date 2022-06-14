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

export const getRecentPostList = gql`
  query getRecentPostList {
    blogPostCollection(limit: 3) {
      items {
        sys {
          id
        }
        date
        title
        slug
        excerpt
        tags
      }
    }
  }
`