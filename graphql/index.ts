import { gql, request } from "graphql-request";

const graphAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;


export const getReels = async () => {
    const query = gql`
        query Reels {
            reelsConnection {
                edges {
                    cursor
                    node {
                        id
                        featuredImage {
                            url
                        }
                    }
                }
            }
        }
    `
    const result: any = await request(graphAPI, query);
    return result.reelsConnection.edges;
}