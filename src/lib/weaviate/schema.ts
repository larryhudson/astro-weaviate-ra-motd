const MIX_CLASS = {
  class: "Mix",
  description: "Mixes",
  properties: [
    {
      name: "mixId",
      dataType: ["text"],
      description: "Mix ID",
      moduleConfig: {
        "text2vec-openai": {
          skip: true,
        },
      },
    },
    {
      name: "imageUrl",
      dataType: ["text"],
      description: "Mix image URL",
      moduleConfig: {
        "text2vec-openai": {
          skip: true,
        },
      },
    },
    {
      name: "date",
      dataType: ["text"],
      description: "Mix date",
      moduleConfig: {
        "text2vec-openai": {
          skip: true,
        },
      },
    },
    {
      name: "title",
      dataType: ["text"],
      description: "Mix title",
      moduleConfig: {
        "text2vec-openai": {
          skip: true,
        },
      },
    },
    {
      name: "blurb",
      dataType: ["text"],
      description: "Mix blurb",
      moduleConfig: {
        "text2vec-openai": {
          skip: true,
        },
      },
    },
    {
      name: "contentUrl",
      dataType: ["text"],
      description: "Mix content URL",
      moduleConfig: {
        "text2vec-openai": {
          skip: true,
        },
      },
    },
    {
      name: "content",
      dataType: ["text"],
      description: "Mix content",
      moduleConfig: {
        "text2vec-openai": {
          skip: true,
        },
      },
    },
    {
      name: "textForEmbedding",
      dataType: ["text"],
      description: "Mix text for embedding",
    },
    {
      name: "iframe",
      dataType: ["text"],
      description: "Mix iframe HTML",
      moduleConfig: {
        "text2vec-openai": {
          skip: true,
        },
      },
    },
    {
      name: "hyperlinkUrl",
      dataType: ["text"],
      description: "Mix hyperlink URL",
      moduleConfig: {
        "text2vec-openai": {
          skip: true,
        },
      },
    },
  ]
}

export async function initialiseSchema(client) {
  // initialise documents schema
  const mixSchemaExists = await client.schema.exists("Mix");

  if (!mixSchemaExists) {
    console.log("Creating mix class");
    await client.schema.classCreator().withClass(MIX_CLASS).do();
  }
}
