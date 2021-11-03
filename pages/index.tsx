import type { NextPage } from 'next'
import Head from 'next/head'
import Image from "next/image";
import styles from '../styles/Home.module.css'

import { Cocktail } from '../types/cocktail'

interface HomeProps {
  cocktails: Cocktail[],
  letter: string
}

function cocktailView(cocktail: Cocktail): JSX.Element {
  return (
    <li key={cocktail.idDrink}>
      {
        cocktail.strDrink && <h2>{cocktail.strDrink}</h2>
      }
      {
        cocktail.strDrinkThumb &&
        <Image
          src={cocktail.strDrinkThumb}
          alt="{cocktailPicture of the author"
          width={500}
          height={500}
        />
      }
    </li>
  )
}

function cocktailsList(cocktails: Cocktail[]): JSX.Element {
  if (!cocktails || !cocktails.length) {
    return (<p>Aucun cocktails de disponible 😔</p>)
  } 
  return (
    <ul>
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
  const randomCocktails = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)).json();
  return {
    props: {
      cocktails: randomCocktails.drinks,
      letter
    }
  }

}



export default Home
