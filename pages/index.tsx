import type { NextPage } from 'next'
import Head from 'next/head'
import Image from "next/image";
import styles from '../styles/Home.module.css'

import CocktailInitial from '../types/cocktail/initial'
import CocktailReformat from '../types/cocktail/reformat'

import formatCocktail from "../helpers/formatCocktail";

interface HomeProps {
  cocktails: CocktailReformat[],
  letter: string
}

function cocktailView(cocktail: CocktailReformat): JSX.Element {
  return (
    <li key={cocktail.id}>
      {
        cocktail.title && <h2>{cocktail.title}</h2>
      }
      {
        cocktail.thumbnail &&
        <Image
          src={cocktail.thumbnail}
          alt="{cocktailPicture of the author"
          width={500}
          height={500}
        />
      }
    </li>
  )
}

function cocktailsList(cocktails: CocktailReformat[]): JSX.Element {
  if (!cocktails || !cocktails.length) {
    return (<p>Aucun cocktails de disponible 😔</p>)
  } 
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {
        cocktails.map(cocktail => cocktailView(cocktail))
      }
    </ul>
  )
}



const Home: NextPage<HomeProps> = ({cocktails, letter}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktail lover</title>
        <meta name="description" content="Quickly find your next favorites cocktails receipts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome buddy, let&lsquo;s find some cocktails starting with the letter {letter}
        </h1>

        {cocktailsList(cocktails)}

      </main>

    </div>
  )
}

function randomLetter(): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  return letters[Math.floor(Math.random() * letters.length)]
}

export async function getStaticProps(): Promise<any> {
  const letter = randomLetter();
  const cocktailsFromAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const randomCocktails = await cocktailsFromAPI.json();

  const reformattedRandomCocktails = formatCocktail(randomCocktails.drinks);
  
  return {
    props: {
      cocktails: reformattedRandomCocktails,
      letter
    }
  }

}



export default Home
