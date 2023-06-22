const getImage = async (id = 1) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    const data = await response.json();
    return data;
    }

export default getImage;