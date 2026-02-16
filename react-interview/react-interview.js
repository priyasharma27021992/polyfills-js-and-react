/*

We are working on a back-office application that displays products available for purchase on our company's website. Currently, the code fails when attempting to fetch the data. Please identify why and fix it.

Additionally, modify the given React application so that the ViewProduct component displays the following:

* The following information once the data is loaded:
    * Title, in bold
    * Category
    * Price retrieved from the API formatted as dollars and cents with the dollar symbol, e.g. $425.96
    * Discount percentage formatted with two decimals and %, e.g. 12.25%
    * Description
    * The thumbnail image

Treat this like a production application, using appropriate best practices.

The API data returned has the following shape:

{
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile which is nothing like apple",
  "price": 549.99,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
  "images": [
    "https://dummyjson.com/image/i/products/1/1.jpg", ...
  ]
  .
  .
  .
}

*/

// import React, {useEffect, useState, useCallback} from 'react';
// import ReactDOM from 'react-dom';

const useFetch = (url, method) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: ''
  });
  
  React.useEffect(() => {
    (async() => {
      let response = await fetch(url, {method});
      if(!response.ok){
        setState({
          data: null,
          loading: false,
          error: 'An error occured'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      })
    })();
  }, [url, method])

  return state;
}

const ViewProduct = ({id}) => {
  const {data, error, loading} = useFetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail,discountPercentage`);

  if(loading)
    return <div>Loading</div>;

  if(error)
    return <div>{error}</div>

  if(!data)
    return null;

  return (
    <section aria-labelledby="product-title">
      <h1 id="product-label">{data.title}</h1>
      <p>{data.category}</p>
      <p>
        <span className="sr-only">Price:</span>
        <strong>${data.price.toFixed(2)}</strong>
      </p>
      <p>{data.discountPercentage.toFixed(2)}%</p>
      <p>{data.description}</p>
      <figure>
        <img className='' src={data.thumbnail} alt={`Image of ${data.title}`}/>
      </figure>
    </section>
  );
}

const ListProducts = ({changeLocation}) => {
  const {loading, error, data} = useFetch("https://dummyjson.com/products")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (<li onClick={() => changeLocation('view', {id: product.id})} key={product.id}>{product.title}</li>))}
      </ul>
    </div>
  );
}

const App = () => {
  const [location, setLocation] = React.useState({ page: "view", params: { id: 2 } });
 
  const changeLocation = React.useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className="App">
      {location.page === "list" && <ListProducts changeLocation={changeLocation}/>}
      {location.page === "view" && <ViewProduct id={location.params.id}/>}
      { location.page !== "list" && (
        <div>
          <a className="link" onClick={() => changeLocation("list")}>Return to list</a>
        </div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
