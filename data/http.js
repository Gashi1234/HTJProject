import axios from "axios";


const BACKEND_URL = "https://htj-project-default-rtdb.firebaseio.com";

export async function fetchData() {
    const response = await axios.get(BACKEND_URL + "/historite.json");
    console.log("Data we get from FireBase:", response.data);

    const historite = [];

    for (const key in response.data) {
        // console.log("The KEY: ", key);
        const historiteObj = {
            id: key,
            category: response.data[key].category,
            date: response.data[key].date,
            fullContent: response.data[key].fullContent,
            imageUrl: response.data[key].imageUrl,
            shortContent: response.data[key].shortContent,
            title: response.data[key].title
        };

        historite.push(historiteObj);

    }

    // console.log("Historite si Array: ", historite);

    const transformedArray = historite.map(item => ({
        ...item,
        id: parseInt(item.id.replace('id', ''))
    }));


    console.log("Transformet Array: ", transformedArray);
    
    return transformedArray;
}