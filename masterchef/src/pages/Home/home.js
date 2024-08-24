import './home.css';

import Header from "../../components/Header/header";
import Welcome from "../../components/Welcome/welcome";
import Recipes from "../../components/Recipes/recipes";


export default function Home() {
  return (
    <>
      <Header />
      <Welcome />
      <Recipes />
    </>
  );
}
