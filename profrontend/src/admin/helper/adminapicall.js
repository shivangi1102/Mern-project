import { API } from "../../backend";

//category calls
export const createCategory = async (userId, token, category) => {
    try {
        const response = await fetch(`${API}/category/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
}

//get all category

export const getAllCategory = async () => {
    try {
        const response = await fetch(`${API}/categories`, {
            method: "GET",
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }

}

//product calls

export const createProduct = async (userId,token, product) => {
    try {
        const response = await fetch(`${API}/product/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }

}

//get all product
export const getAllProduct = async () => {
    try {
        const response = await fetch(`${API}/products`, {
            method: "GET",
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }

}

//delete a product

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  

//get a product
export const getProduct = async productId => {
    try {
        const response = await fetch(`${API}/product/${productId}`, {
            method: "GET",
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
}


//update prouct

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: product
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  