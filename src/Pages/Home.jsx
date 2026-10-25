import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../Components/RecipeCard";
import { Link } from "react-router";



function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [errorMsg, seterrorMsg] = useState("");
  async function fetchRecipes(skipCount) {
    try {
      const { data } = await axios.get(`https://dummyjson.com/recipes?limit=6&skip=${skipCount}`)
       setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes],
      );
      setTotal(data.total);
    } catch (error) {
      seterrorMsg("Could not load recipe details. Please try again.")
    }
    setLoading(false)
  }
  useEffect(() => { fetchRecipes(0) }, [])

  if (Loading) { return <p className='text-center py-6 text-muted'>Loading...</p> }
  if (errorMsg) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="text-accent hover:underline inline-flex items-center gap-1 mb-4"
        >
          <svg
            className="w-4 h-4 stroke-current fill-none"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>
        <p className="text-accent">{errorMsg || "Recipe not found."}</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <form className="flex gap-2 max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button type="button" className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>


      {recipes.length < total && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => fetchRecipes(recipes.length)}
            className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;