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
    let records = await pb
        .collection("maison")
        .getFullList({ filter: `surface >= ${surface}` });
    records = records.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.image);
        return maison;
    });
    return records;
}

export async function byPrice(prix) {
    let records = await pb
        .collection("maison")
        .getFullList({ filter: `prix <= ${prix}` });
    records = records.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.image);
        return maison;
    });
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


export async function getOffre(id) {
    try {
        let data = await pb.collection('maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}