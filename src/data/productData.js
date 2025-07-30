const productDataApi = (setProductData) => {
  fetch("https://dummyjson.com/recipes")
    .then((res) => res.json())
    .then((data) => {
      if (data.recipes) {
        setProductData(data.recipes);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export default productDataApi;
