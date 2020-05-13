import React, {useState,useEffect} from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';

function App() {

    const [pokemons, setPokemons] = useState([]);
    const [perPage, setPerpage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [idShownImage, setIdShownImage] = useState(0);

    useEffect(() => {
      fetchPokemons();
    }, []);

    const fetchPokemons = e => {
        var offset = (currentPage-1)*perPage;
        console.log(`offset: ${offset}`);
        console.log(`currentPage: ${currentPage}`);

        console.log(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perPage}`);
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perPage}`)
        .then(response => {
          return response.json();
        })
        .then(response => setPokemons(response.results))
    };
 
    const changePage = (change) => {
      // console.log(change);
      if(currentPage+change>0){
        let currentPageChange = currentPage + change;
        console.log(`change: ${currentPage}+${change}`);
        setCurrentPage(currentPageChange);
        console.log(`=${currentPage}`);
        console.log(`=${currentPageChange}`);
        fetchPokemons();
      }
    };

    const showImage = (id=0) => {
      setIdShownImage(id);
    };

    return (
      <div className="container ">
        <div className="notification">

        <div className="columns">

          <div className="column">
            <label>Per Page</label>
            <div className="field">
            <div className="control">
              <input className="input is-primary" type="number" onChange={e=>setPerpage(e.target.value)} value={perPage} placeholder="Per Page"/>
            </div>
          </div>
          </div>

          <div className="column">
            <label>Current Page</label>
            <div className="field">
            <div className="control">
              <input className="input is-primary" type="number" onChange={e=>setCurrentPage(e.target.value)} value={currentPage} placeholder="Current Page"/>
            </div>
          </div>
          </div>

          <div className="column">
            <button onClick={fetchPokemons} className="button is-primary">Fetch Pokemon</button>
          </div>

        </div>

        </div>


        <article className="panel is-primary">
          <p className="panel-heading">
            Pokemons
          </p>
          {
              pokemons.map((pkmn,i) => 
                <a key={i} className="panel-block is-active" onClick={e=>showImage((currentPage-1)*perPage+i+1)} >
                  <img src={`https://pokeres.bastionbot.org/images/pokemon/${(currentPage-1)*perPage+i+1}.png`} alt="" style={{ width:"50px"}}/>
                <span style={{marginLeft:"20px"}}>{ pkmn.name }</span>
              </a>
              )
          }
          <div className="notification">
            <div className="columns">
              <div className="column">
              <button disabled={currentPage===1?'disabled':''} onClick={e=>changePage(-1)} className="button is-info">Prevois</button>
              </div>
              <div className="column " style={{textAlign:"right"}}>
              <button disabled={pokemons.length<perPage?'disabled':''} onClick={e=>changePage(1)} className="button is-info">Next</button>
              </div>
            </div>
          </div>
          

        </article>


        const [idShownImage, setIdShownImage] = useState(0);


        <div className={idShownImage===0?'modal':'modal is-active'}>
          <div className="modal-background" onClick={e=>showImage(0)}></div>
          <div className="modal-content">
            <p className="image is-4by3">
              {
                (idShownImage>0)?
                  <img src={`https://pokeres.bastionbot.org/images/pokemon/${(idShownImage)}.png`} alt=""/>
                  : ''
              }
              
            </p>
          </div>
          <button onClick={e=>showImage(0)} className="modal-close is-large" aria-label="close"></button>
        </div>

          somehow, paging is working not correctly. but it works


            {/* {people.length > 0 && people.map((person, index)=>{
                return (<div key={index}>{person.name}</div>)
            })} */}



      </div>

      );
}

export default App;
