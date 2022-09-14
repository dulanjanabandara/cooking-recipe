import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  // const url = "http://localhost:3000/recipes/" + id;
  // const { data: recipe, isPending, error } = useFetch(url);
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsubscribe = projectFirestore
      .collection("recipes")
      .doc(id)
      // .get()
      // .then((doc) => {
      //   if (doc.exists) {
      //     setIsPending(false);
      //     setRecipe(doc.data());
      //   } else {
      //     setIsPending(false);
      //     setError("Could not find that recipe!");
      //   }
      // });
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setIsPending(false);
            setRecipe(doc.data());
          } else {
            setIsPending(false);
            setError("Could not find that recipe!");
          }
        },
        // 2nd argument for when error is occurred
        (err) => {
          setError(err.message);
          setIsPending(false);
        }
      );

    return () => unsubscribe();
  }, [id]);

  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "Something completely different!",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update Me</button>
        </>
      )}
    </div>
  );
}
