import { record } from "astro:schema";
import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");


//Authentification

export async function superUserauth() {
    const authData = await pb.collection("_superusers").authWithPassword("admin@gmail.com", "PxJYAjp2tqfI5aS");
    return authData;
}



//fonction addOffre dans backend.mjs
export async function addOffre(house) {
    superUserauth();
    try {
        await pb.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

//TP1
export async function allMaisons() {
    await superUserauth();
    let records = await pb.collection("maison").getFullList();
    records = records.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.image);
        return maison;
    });
    pb.authStore.clear();
    return records;
}


//Exercice 11

export async function oneID() {
    await superUserauth();

    const record = await pb
        .collection("maison")
        .getOne("69dj9w2m56i4le7");
    return record;
}

//Exercice 12

export async function allMaisonsFavori() {
    await superUserauth();

    const records = await pb
        .collection("maison")
        .getFullList({ filter: "favori = true" });
    return records;
}

//Exercice 13
export async function allMaisonsSorted() {
    await superUserauth();

    const records = await pb
        .collection("maison")
        .getFullList({ sort: "prix" });
    return records;
}

//Exercice 14
export async function bySurface(surface) {
    await superUserauth();
    let records = await pb
        .collection("maison")
        .getFullList({ filter: `surface >= ${surface}` });
    records = records.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.image);
        return maison;
    });
    return records;
}

//Exercice 15
export async function surfaceORprice(surface, p) {
    await superUserauth();
    const records = await pb
        .collection("maison")
        .getFullList({ filter: `surface >= ${surface} OR prix <= ${p}` });
    return records;
}

// Exercice 19
export async function getAgentById(id) {
    await superUserauth();
    const record = await pb.collection("agent").getOne(id);
    return record;
}

// TP4

//Exercice 7

export async function allMaisonsAgents() {
    await superUserauth();
    const allRecords = await pb.collection("maison").getFullList({
        expand: "agent",
    });
    return allRecords;
}

//Exercice 8

export async function allMaisonsByAgentId(agentId) {
    await superUserauth();
    let records = await pb.collection("maison").getFullList({
        filter: `agent.id = '${agentId}'`,
    });
    records = records.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.image);
        return maison;
    });
    return records;
}


//Exercice 9

export async function allMaisonsByAgentNom(agentNom) {
    await superUserauth();
    const records = await pb.collection("maison").getFullList({
        filter: `agent.nom = '${agentNom}'`,
    });
    return records;
}

//Exercice 10

export async function allMaisonsSortedAgent() {
    await superUserauth();
    const records = await pb.collection("maison").getFullList({
        sort: "agent.id",
        expand: "agent",
    });
    return records;
}

//Exercice 11

export async function bySurfaceAgent(surface, agentId) {
    await superUserauth();
    const records = await pb.collection("maison").getFullList({
        filter: `surface > ${surface} && agent.id = '${agentId}'`,
        expand: "agent",
    });
    return records;
}

export async function byPrice(prix) {
    await superUserauth();
    let records = await pb.collection("maison").getFullList({
        filter: `prix < ${prix}`,
    });
    records = records.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.image);
        return maison;
    });
    return records;
}


//Exercice 12

export async function maisonFavoriAgent(agentId) {
    await superUserauth();
    const records = await pb.collection("maison").getFullList({
        filter: `favori = true && agent.id = '${agentId}'`,
        expand: "agent",
    });
    return records;
}

//TP5

export async function addNewMaison(newmaison) {
    await superUserauth();
    await pb.collection("maison").create(newmaison);
}


// Etape 3 

export async function addNewAgent(newAgent) {
    await superUserauth();
    await pb.collection("agent").create(newAgent);
}

// Etape 4

export async function deleteMaisonById(id) {
    await superUserauth();
    await pb.collection("maison").delete(id);
}

// Etape 5

export async function deleteAgentById(id) {
    await superUserauth();
    await pb.collection("agent").delete(id);
}


// Etape 6

export async function updateMaisonById(id, data) {
    await superUserauth();
    await pb.collection("maison").update(id, data);

}

//Etape 7

export async function updateAgentById(id, data) {
    await superUserauth();
    await pb.collection("agent").update(id, data);

}

export async function getOffre(id) {
    await superUserauth();
    try {
        let records = await pb.collection('maison').getOne(id);
        records.imageUrl = pb.files.getURL(records, records.image);
        return records;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;

    }
}

//Fonction filterByPrix:

export async function filterByPrix(prixMin, prixMax) {
    await superUserauth();
    try {
        let data = await pb.collection('maison').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.imgUrl = pb.files.getURL(maison, maison.image);
            return maison;
        });
        pb.authStore.clear();
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}

//
export async function getAllAgents() {
    superUserauth();
    const records = await pb.collection("agent").getFullList();
    return records;
}
// try {
//     await pb.collection('maison').create(house);
//     return {
//         success: true,
//         message: 'Offre ajoutée avec succès'
//     };
// } catch (error) {
//     console.log('Une erreur est survenue en ajoutant la maison', error);
//     return {
//         success: false,
//         message: 'Une erreur est survenue en ajoutant la maison'
//     };
// }



//Fonction setFavori
export async function setFavori(house) {
    await superUserauth();
    await pb.collection('maison').update(house.id, { favori: !house.favori });
}






