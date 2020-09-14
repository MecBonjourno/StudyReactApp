import React, {useState, useEffect, FormEvent} from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Link, } from 'react-router-dom'

import api from '../../services/api'

import logo from '../../assets/logo.png'
import searchButton from '../../assets/search.png'
import order from '../../assets/order_by.png'
import noresults from '../../assets/no_results.png'

import {  Form, Repositories, Error,  Header, DropDownLi, Dropbtn, DropDownContent , SubA} from './styles';
import Repository from '../Repository';

interface Repository {
     name: string;
     biography: string;
     image: string;
     id: string;
     numPlays: number;

}

const Dashboard: React.FC = () => {
    const [ newRepo, setNewRepo ] = useState('')
    const [ newSearch, setNewSearch ] = useState('')
    const [ inputError, setInputError ] = useState('')
    const [repositories,setRepositories] = useState<Repository[]>([])

    useEffect(() => {
        async function loadBands(): Promise<void> {
          const response = await api.get('/bands' )

          setRepositories(
            response.data.map((item: Repository)=> ({
              ...item,
            })),
          );
        }
    
        loadBands();
      }, [newRepo]);

       async function orderByZtoA(): Promise<void> {
        const response = await api.get('/bands' )
        setRepositories(response.data.reverse());
              }
        async function revertToNormal(): Promise<void> {
            const response = await api.get('/bands' )
            setRepositories(response.data);
                }
        async function orderByPopularity(): Promise<void> {
            const response = await api.get('/bands')
            const list = response.data;

            var arr = [];
            for(let key in list){
            list[key]["key"] = key;
            arr.push(list[key]);
            }
            const listaComDados = arr.map((item: Repository)=> ({
                ...item,
                }
              ))

            listaComDados.sort((a,b) => (a.numPlays > b.numPlays) ? 1 : ((b.numPlays > a.numPlays) ? -1 : 0))

            setRepositories(listaComDados.reverse())
        }
   
        async function orderByPopularityReverse(): Promise<void> {
            const response = await api.get('/bands')
            const list = response.data;
    
                var arr = [];
                for(let key in list){
                list[key]["key"] = key;
                arr.push(list[key]);
                }
    

                const listaComDados = arr.map((item: Repository)=> ({
                    ...item,
                    }
                  ))
    
                listaComDados.sort((a,b) => (a.numPlays > b.numPlays) ? 1 : ((b.numPlays > a.numPlays) ? -1 : 0))
    
                setRepositories(listaComDados)
            }

        async function findOne(event: FormEvent<HTMLFormElement>): Promise<void> {
            event.preventDefault();

            
            if(!newSearch){
              setInputError('Digite o Artista')
              return;
          }
            try{

            const response = await api.get('/bands')
            const list = response.data;
    
                var arr = [];
                for(let key in list){
                list[key]["key"] = key;
                arr.push(list[key]);
                }

                const listaComDados = arr.map((item: Repository)=> ({
                    ...item,
                    }
                  ))
                  
                    const testenovo = listaComDados.find(e => e.name === newSearch)!;

                    if(!testenovo.name){

                     setInputError('Não encontrado')

                    }

                  setRepositories([testenovo])
                  setInputError('')
                  } catch(err) {

                  setInputError('Não encontrado')

                  }
            }

    return (
      <>
        <Header >
        {  inputError && <Error>{inputError}</Error>}
              <Form hasError={!!inputError} onSubmit={findOne} >
              <input value={newSearch} onChange={(e): void => setNewSearch(e.target.value)} placeholder="Search" ></input>
              <button type="submit"> <img src={searchButton} style={{maxHeight: 20 , maxWidth: 20, paddingTop: 4}} /> </button>
              </Form>
              <Link to="/">   <img src={logo} alt="Logo" style={{ maxHeight: 29 , maxWidth: 127, paddingLeft: 8 }} /> </Link> 
              </Header>

          {  inputError && (
            <>
            <img src={noresults} style={{maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 10px 10px 10px'}}/>
            <h1 style={{ opacity: 0.8, color: '#666', justifyContent: 'center', display: 'flex'}}>Sem Resultados...</h1>
          </>
          )}

        <DropDownLi> 
          <Dropbtn>
            <img src={order} style={{maxHeight: 50 , maxWidth: 50, paddingLeft: 10}}/>
          </Dropbtn>
          <DropDownContent>
            {" "}
            <SubA onClick={revertToNormal}>Voltar ao Normal</SubA>
            <SubA onClick={orderByZtoA}>Ordem Alfabética Z - A</SubA>
            <SubA onClick={orderByPopularity}>Mais Populares</SubA>
            <SubA onClick={orderByPopularityReverse}>Menos Populares</SubA>
            <Link to="/albums">View Albums</Link>
          </DropDownContent>
        </DropDownLi>

     <Repositories>
         {repositories.map(repository => (
         <Link key={repository.name} to={`/bands/${repository.id}`}> 
           <img src={repository.image} />
            <div>
                <strong>{repository.name}</strong>
            <p> {repository.numPlays} Plays</p>
            </div>
         <FiChevronRight size={24}/> 
         </Link>
         ))}
     </Repositories>
    </>
    );
}

export default Dashboard;