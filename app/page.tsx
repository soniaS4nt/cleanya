import HeroSection from '@/components/heroSection'
import clientPromise from './lib/mongodb'
/* // `app` directory
 
async function getPosts() {
  const res = await fetch(`https://.../posts`, { next: { revalidate: 60 } })
  const data = await res.json()
 
  return data.posts
}
 
export default async function PostList() {
  const posts = await getPosts()
 
  return posts.map((post) => <div>{post.name}</div>)
} */
export const getProps = async () => {
  try {
    const isConnected = await clientPromise
    // `await clientPromise` utilizará la base de datos predeterminada pasada en MONGODB_URI
    // Sin embargo, puedes utilizar otra base de datos (por ejemplo, myDatabase) reemplazando `await clientPromise` con el siguiente código:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Luego puedes ejecutar consultas contra tu base de datos de la siguiente manera:
    // db.find({}) o cualquiera de los comandos del controlador de MongoDB
    console.log(isConnected)

    return isConnected
  } catch (e) {
    console.error(e)
    return {
      propdatas: { isConnected: false },
    }
  }
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center mx-auto px-6 lg:px-24 ">
      <HeroSection />
    </main>
  )
}
