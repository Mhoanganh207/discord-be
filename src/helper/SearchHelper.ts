import { meiliSearchClient } from "../app"

export const updateIndex = async (user : any) => {
     meiliSearchClient.index('discord').addDocuments([user]);
}

export const deleteIndex = async (id : string) => {
    meiliSearchClient.index('discord').deleteDocument(id);
}

export const searchIndex = async (query : string) => {
    const users = await meiliSearchClient.index('discord').search(query);
    return users.hits;
}

export const updateDocument = async (id : string, user : any) => {
    meiliSearchClient.index('discord').updateDocuments([{id, ...user}]);
}
