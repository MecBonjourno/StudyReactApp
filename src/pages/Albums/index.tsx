
import React, {useState, useEffect, FormEvent} from 'react';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi' 

import { Link } from 'react-router-dom'

import api from '../../services/api'
import searchButton from '../../assets/search.png'
import logo from '../../assets/logo.png'
import noresults from '../../assets/no_results.png'




import {  Form, Repositories, Error, Header } from './styles';
import Repository from '../Repository';

interface Repository {
     name: string;
     biography: string;
     image: string;
     id: string;
     
}

const Dashboard: React.FC = () => {
    const [ newRepo, setNewRepo ] = useState('')
    const [ inputError, setInputError ] = useState('')
    const [ newSearch, setNewSearch ] = useState('')
    const [repositories,setRepositories] = useState<Repository[]>([]) 

    async function handleAddRepo(event: FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault();

        if(!newRepo){
            setInputError('Digite o Autor/Nome do repositório')
            return;
        }

        try {

        const response = await api.get<Repository>(`bands/${newRepo}`);

        const repository = response.data;

        setRepositories([...repositories, repository])
        setNewRepo(''); 
        setInputError('')
        }catch(err){
            setInputError('Erro na busca de Album')
        }
    }

    useEffect(() => {
        async function loadBands(): Promise<void> {
          const response = await api.get('/albums' )

          setRepositories(
            response.data.map((item: Repository)=> ({
              ...item,
            })),
          );
        }
    
        loadBands();
      }, [newRepo]);


    async function findOne(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        
        if(!newSearch){
          setInputError('Digite o Artista')
          return;
      }
        try{

        const response = await api.get('/albums')
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
        <Link to='/'> <FiChevronLeft size={16}/> Voltar </Link>

          <Form hasError={!!inputError} onSubmit={findOne} >
            <input value={newSearch} onChange={(e): void => setNewSearch(e.target.value)} placeholder="Search" ></input>
            <button type="submit"> <img src={searchButton} style={{maxHeight: 20 , maxWidth: 20, paddingTop: 4}} /> </button>
            </Form>
         <Link to="/">   <img src={logo} alt="Logo" style={{ maxHeight: 29 , maxWidth: 127}} /> </Link> 
        </Header>

      {  inputError && (
          <>
            <img src={noresults} style={{maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 10px 10px 10px'}}/>
            <h1 style={{ opacity: 0.8, color: '#666', justifyContent: 'center', display: 'flex'}}>Sem Resultados...</h1>
          <Error>{inputError}</Error>
          </>
          )}

        <Repositories>
            {repositories.map(repository => (
            <Link key={repository.name} to={`/albums`}> 
                <img src={repository.image} />
            <div>
            <strong>{repository.name}</strong>
                <p> {repository.biography} </p>
            </div>
            <FiChevronRight size={20}/> 
            </Link>
            ))}
        </Repositories>
     </>
    );
}

export default Dashboard;