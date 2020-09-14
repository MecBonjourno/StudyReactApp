
import React, {useState, useEffect, FormEvent} from 'react';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi' 

import { Link } from 'react-router-dom'

import api from '../../services/api'
import searchButton from '../../assets/search.png'
import logo from '../../assets/logo.png'



import { Title, Form, Repositories, Error, Header } from './styles';
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

    const [repositories,setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@githubExplorer:repositories');

        if(storagedRepositories) {
            return (
                JSON.parse(storagedRepositories)
                );
        } else {
            return [];
        }
    })

    // useEffect(()=>{
    //     localStorage.setItem('@githubExplorer:repositories', JSON.stringify(repositories))
    // }, [repositories])

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

    useEffect(()=>{
        api.get(`albums`).then(response => {
            setRepositories(response.data)

        })
    },[])

    return (
        <>

    <Header >
          <Link to='/'> <FiChevronLeft size={16}/> Voltar </Link>
         <Form hasError={!!inputError} onSubmit={handleAddRepo} >

                <input value={newRepo} onChange={(e): void => setNewRepo(e.target.value)} placeholder="Search" ></input>
                <button type="submit"> <img src={searchButton} style={{maxHeight: 20 , maxWidth: 20, paddingTop: 4}} /> </button>
            </Form>

            <Link to="/">   <img src={logo} alt="Logo" style={{ maxHeight: 29 , maxWidth: 127}} /> </Link> 

            </Header>




      {  inputError && <Error>{inputError}</Error>}

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