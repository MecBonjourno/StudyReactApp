
import React, {useState, useEffect, FormEvent} from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Link, } from 'react-router-dom'
// import {Dropdown} from 'react-bootstrap'

import api from '../../services/api'

import logo from '../../assets/logo.png'
import searchButton from '../../assets/search.png'



import { Title, Form, Repositories, Error, Logo, Header, Button } from './styles';
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
            setInputError('Erro na busca de Artista')
        }
    }

    // useEffect(()=>{
    //     api.get(`bands`).then(response => {
    //         setRepositories(response.data)
    //     })
    // },[setRepositories])

    useEffect(() => {
        async function loadBands(): Promise<void> {
          // Load Foods from API
          const response = await api.get('/bands' )

    // console.log(response.data)
          setRepositories(
            response.data.map((food: Repository)=> ({
              ...food,
            //   formattedPrice: formatValue(food.price),
            })),
          );
        }
    
        loadBands();
      }, [newRepo]);



    //   useEffect(() => {
    //     async function loadBands(): Promise<void> {
    //       // Load Foods from API
    //       const response = await api.get('/bands' )
    //       setRepositories(response.data);
    //     }
    //     loadBands();
    //   }, [newRepo]);

    //   useEffect(() => {

       async function orderByZtoA(): Promise<void> {
        const response = await api.get('/bands' )
               
        setRepositories(response.data.reverse());
              }
            //   orderByPopularity();
    //   }, [newRepo]);
    //  
        async function revertToNormal(): Promise<void> {
            const response = await api.get('/bands' )
                
            setRepositories(response.data);
                }

        async function orderByPopularity(): Promise<void> {
        const response = await api.get('/bands')
        const list = response.data;

        const { params } = list;
            
        console.log(params)

        setRepositories(list)
        //     list.map((repository: Repository)=> ({
        //     ...repository
        // })).sort((a: repository,b: repository)=> a.numPlays > b.numPlays));

                }
      



    return (
        <>
        <Header >
         <Form hasError={!!inputError} onSubmit={handleAddRepo} >

                <input value={newRepo} onChange={(e): void => setNewRepo(e.target.value)} placeholder="Search" ></input>
                <button type="submit"> <img src={searchButton} style={{maxHeight: 20 , maxWidth: 20, paddingTop: 4}} /> </button>
            </Form>

              <img src={logo} alt="Logo" style={{ maxHeight: 29 , maxWidth: 127, paddingLeft: 8}} />
            </Header>

            <Link to="/albums">View Albums</Link>

            <Button onClick={orderByZtoA}>Click Me</Button>
            <Button onClick={revertToNormal}>Reverse</Button>
            <Button onClick={orderByPopularity}>Reverse</Button>

     

        {/* <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">  </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown> */}




      {  inputError && <Error>{inputError}</Error>}

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