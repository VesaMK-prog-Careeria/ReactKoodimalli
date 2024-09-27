import './App.css'
import React, {useState, useEffect} from 'react' //useEffect luo kerran komponentin renderöinnin jälkeen pyynnön ja hakee datan

// Posts komponentti joka hakee dataa ja renderöi sen
const Posts = () => {
// Komponentin tilan määritys
  const [posts, setPosts] = useState(null) // tässä käytetään useStatea ja asetetaan posts tilaan null
  const [visibleBodys, setVisibleBodys] = useState({}) // tässä käytetään useStatea ja asetetaan visibleTitles tilaan tyhjä objekti
  const [lastClickedId, setLastClickedId] = useState(null); // tila viimeksi klikattua id:tä varten
  
  const toggleBodyVisibility =(id) => { // toggleTitleVisibility funktio joka ottaa id:n parametrina
    setVisibleBodys(prevState => ({ // asetetaan visibleTitles tilaan id:n tila
      ...prevState, // kopioi edellisen tilan
      [id]: !prevState[id] // asetetaan id:n tila
    }))

        // Resetoidaan viimeksi klikattu postaus
        if (lastClickedId && lastClickedId !== id) {
          const lastPostElement = document.getElementById(`postElement-${lastClickedId}`);
          if (lastPostElement) {
            lastPostElement.style.borderBottomRightRadius = '';
            lastPostElement.style.borderBottomLeftRadius = '';
            lastPostElement.style.backgroundColor = '';
            lastPostElement.style.color = ''
            // posts piiloon
            setVisibleBodys(prevState => ({ // asetetaan visibleTitles tilaan id:n tila
              ...prevState, // kopioi edellisen tilan
              [lastClickedId]: false // asetetaan id:n tila
            }));
          }
        }

    // Muutetaan border-bottom-right-radius arvoa
    const postElement = document.getElementById(`postElement-${id}`);
    if (postElement) {
      postElement.style.borderBottomRightRadius = '20px'
      postElement.style.borderBottomLeftRadius = '20px'
      postElement.style.backgroundColor = 'lightblue'
      postElement.style.color = 'black';
    }

    // Päivitetään viimeksi klikattu id
    setLastClickedId(id);
  }

useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // haetaan dataa
    .then(res => res.json()) // muutetaan json data javaScript muotoon
    .then(oliot => setPosts(oliot)) // asetetaan data posts tilaan
},[]
)

  return (
    <>
        <h1>Posts from typicode</h1>

        {
            posts && posts.map(p => // jos posts on olemassa niin mapataan se ja tulostetaan jokainen post
              <div className='posts' id={`postElement-${p.id}`} key={p.id}> {/* jokaiselle postille annetaan key */}
                <h3 className="clicked" onClick={() => toggleBodyVisibility(p.id)}>{p.title}</h3> {/* kun klikataan postia niin se toggleaa näkyvyyden */}
                {visibleBodys[p.id] && <p>{p.body}</p>} {/* jos visibleTitles on olemassa niin renderöidään body */}
              </div>
            )
        }
    </>
  )
}

export default Posts
