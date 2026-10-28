import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../Components/RecipeCard";
import { useNavigate } from "react-router";
import useLoading from "../hooks/useLoading";



function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const {Loading, startLoading , stopLoading} = useLoading();
  const [errorMsg, seterrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  async function fetchRecipes(skipCount, query) {
    startLoading()
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`
      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`
      }
      const { data } = await axios.get(url)
      setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes],
      );
      setTotal(data.total);
    } catch (error) {
      seterrorMsg("Could not load recipes. Please try again later...")
    }
    stopLoading()
  }
  useEffect(() => { fetchRecipes(0) }, [])

  function searchHandler(e) {
    e.preventDefault()

    const form = new FormData(e.target)
    let query = form.get("query").trim()
    setSearchQuery(query)
    fetchRecipes(0, query)

  }
  if (errorMsg) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-5xl font-bold text-accent mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-3">{errorMsg}</h2>
        <p className="text-muted mb-6">The recipes you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <form className="flex gap-2 max-w-md mx-auto mb-8 " onSubmit={searchHandler}>
        <input
          type="text"
          name="query"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button type="submit" className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
          Search
        </button>
      </form>

      {Loading && <p className='text-center py-6 text-muted'>Loading...</p>}
      {!Loading && recipes.length === 0 && (<div>
        <p className="text-center py-6 text-muted">{`No recipes found for '${searchQuery}'`}</p>
      </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>


      {recipes.length < total && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => fetchRecipes(recipes.length, searchQuery)}
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