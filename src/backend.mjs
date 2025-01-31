import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

export async function allMaisons() {
    let records = await pb.collection("maison").getFullList();
    records = records.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.image);
        return maison;
    });
    return records;
}

//Exercice 11

export async function oneID() {
    const record = await pb
        .collection("maison")
        .getOne("69dj9w2m56i4le7");
    return record;
}

//Exercice 12

export async function allMaisonsFavori() {
    const records = await pb
        .collection("maison")
        .getFullList({ filter: "favori = true" });
    return records;
}

//Exercice 13
export async function allMaisonsSorted() {
    const records = await pb
        .collection("maison")
        .getFullList({ sort: "prix" });
    return records;
}

//Exercice 14
export async function bySurface(surface) {
    const records = await pb
        .collection("maison")
        .getFullList({ filter: `surface >= ${surface}` });
    return records;
}

//Exercice 15
export async function surfaceORprice(surface, p) {
    const records = await pb
        .collection("maison")
        .getFullList({ filter: `surface >= ${surface} OR prix <= ${p}` });
    return records;
}

// Exercice 19
export async function getAgentById(id) {
    const record = await pb.collection("agent").getOne(id);
    return record;
}   


