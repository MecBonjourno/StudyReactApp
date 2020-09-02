
import React, {useState, useEffect, FormEvent} from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import Logo from '../../assets/logo.svg'

import { Title, Form, Repositories, Error } from './styles';
import Repository from '../Repository';

interface Repository {
     full_name: string;
     description: string;
     owner:{
         login: string;
         avatar_url: string;
     }
}

const Dashboard: React.FC = () => {
    const [ newRepo, setNewRepo ] = useState('')
    const [ inputError, setInputError ] = useState('')
    const [repositories,setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@githubExplorer:repositories');

        if(storagedRepositories) {
            return JSON.parse(storagedRepositories);
        } else {
            return [];
        }
    })

    // useEffect

    useEffect(()=>{
        localStorage.setItem('@githubExplorer:repositories', JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepo(event: FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault();

        if(!newRepo){
            setInputError('Digite o Autor/Nome do repositório')
            return;
        }

        try {

        const response = await api.get<Repository>(`repos/${newRepo}`);

        const repository = response.data;

        setRepositories([...repositories, repository])
        setNewRepo(''); 
        setInputError('')
        }catch(err){
            setInputError('Erro na busca de Repositório')
        }
    }

    return (
    <>
     <img src={Logo} alt="Logo" />
     <Title>Explore Repos in GitHub</Title>

     <Form hasError={!!inputError} onSubmit={handleAddRepo}>

         <input value={newRepo} onChange={(e): void => setNewRepo(e.target.value)} placeholder="Digite o nome do Repo" />
         <button type="submit"> Pesquisar </button>

     </Form>

      {  inputError && <Error>{inputError}</Error>}

     <Repositories>
         {/* <a href="#"> 
            <img src="https://avatars1.githubusercontent.com/u/34528662?s=460&u=78756aba83d8ac11e925b0a1c86b16ccaf5250c9&v=4" alt="eu"></img>
         <div>
             <strong>MecBonjourno/precav</strong>
             <p> Repositório do site da Precav</p>
         </div>
         <FiChevronRight /> 
         </a>

         <a href="#"> 
            <img src="https://avatars1.githubusercontent.com/u/34528662?s=460&u=78756aba83d8ac11e925b0a1c86b16ccaf5250c9&v=4" alt="eu"></img>
         <div>
             <strong>MecBonjourno/precav</strong>
             <p> Repositório do site da Precav</p>
         </div>
         <FiChevronRight /> 
         </a>

         <a href="#"> 
            <img src="https://avatars1.githubusercontent.com/u/34528662?s=460&u=78756aba83d8ac11e925b0a1c86b16ccaf5250c9&v=4" alt="eu"></img>
         <div>
             <strong>MecBonjourno/precav</strong>
             <p> Repositório do site da Precav</p>
         </div>
         <FiChevronRight /> 
         </a> */}

         {repositories.map(repository => (
         <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}> 
            <img src={repository.owner.avatar_url} />
         <div>
         <strong>{repository.full_name}</strong>
             <p> {repository.description} </p>
         </div>
         <FiChevronRight size={20}/> 
         </Link>
         ))}
     </Repositories>
    </>
    );
}

export default Dashboard;