import { useEffect, useState } from "react";

// import { useFetch } from "../../hooks/useFetch";
import { projectFirestore } from "../../firebase/config";
import RecipeList from "../../components/recipeList/RecipeList";

import "./Home.css";

export default function Home() {
  // const { data, isPending, error } = useFetch("http://localhost:3000/recipes");

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection("recipes") //collection(collectionName) connects to a collection in the database
      .get() // get all the data from the above collection. This fetches a snapshot of the collection above. This is asyncronous
      .then((snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load!");
          setIsPending(false);
        } else {
          let results = [];
          // docs contain all the documents inside the collection
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() }); // data() contains title, time, ingredients and method
            // console.log(doc);
          });
          setData(results);
          setIsPending(false);
        }
        // console.log(snapshot);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {/* {data && data.map((recipe) => <h2 key={recipe.id}>{recipe.title}</h2>)} */}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
