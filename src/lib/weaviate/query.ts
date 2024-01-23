import { weaviateClient } from ".";

export async function findMixes({
    searchType,
    nearText,
    moveAwayFromText,
    fields,
    limit,
    offset,
}) {
    if (searchType === "vector") {
        return await findMixesNearText({
            nearText,
            moveAwayFromText,
            fields,
            limit,
            offset,
        });
    } else if (searchType === "hybrid") {
        return await findMixesByHybrid({
            query: nearText,
            fields,
            limit,
            offset,
        });
    }
}

export async function findMixesNearText({
    nearText,
    moveAwayFromText,
    fields,
    limit,
    offset,
}) {

    const positiveConcepts = nearText.split(" AND ");
    const negativeConcepts = moveAwayFromText?.split(" AND ") || [];

    let queryResponse = await weaviateClient.graphql
        .get()
        .withClassName("Mix")
        .withFields(fields)
        .withLimit(limit)
        .withOffset(offset)
        .withNearText({
            concepts: positiveConcepts,
            moveAwayFrom: {
                concepts: negativeConcepts,
                force: 1,
            },
        })
        .do();

    const searchResults = queryResponse?.data?.Get?.Mix || [];

    return searchResults;
}

export async function findMixesByHybrid({
    query,
    fields,
    limit,
    offset,
}) {

    let queryResponse = await weaviateClient.graphql
        .get()
        .withClassName("Mix")
        .withFields(fields)
        .withLimit(limit)
        .withOffset(offset)
        .withHybrid({
            query
        })
        .do();

    const searchResults = queryResponse?.data?.Get?.Mix || [];

    return searchResults;
}

export async function getMixesNearId({
    weaviateObjectId,
    fields,
    limit,
    offset,
}) {

    const queryResponse = await weaviateClient.graphql
        .get()
        .withClassName("Mix")
        .withFields(fields)
        .withNearObject({
            id: weaviateObjectId,
        })
        .withLimit(limit)
        .withOffset(offset)
        .do();

    const similarMixes = queryResponse.data.Get.Mix;

    return similarMixes;
}

export async function getMixById({
    weaviateObjectId,
}) {

    const queryResponse = await weaviateClient.data.getterById()
        .withClassName("Mix")
        .withId(weaviateObjectId)
        .do();

    console.log(queryResponse)

    const mix = {
        ...queryResponse.properties,
        _additional: {
            id: queryResponse.id
        }
    };

    return mix;
}

export async function getLatestMixes() {

    const searchFields =
        "mixId date title textForEmbedding blurb imageUrl iframe hyperlinkUrl _additional { id }";

    const mixesData = await weaviateClient.graphql
        .get()
        .withClassName("Mix")
        .withLimit(20)
        .withFields(searchFields)
        .withSort([{ path: ["date"], order: "desc" }])
        .do();

    const mixes = mixesData.data.Get.Mix;

    return mixes;
}