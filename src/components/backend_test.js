import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BackendTest(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    axios({
      method: 'POST',
      url: "http://127.0.0.1:4000/login",
      data:{
        'passwd': 'usr123',
        'email': 'foo1@bars.com'
      }
    })
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setItems(result.items);
        },
      //.then((res) => res.json())
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items}
        {/* {items.map((item) => (
          <li key={item.name}>
            {item.name} {item.price}
          </li>
        ))} */}
      </ul>
    );
  }
}
