import React, {useEffect, useState} from 'react';
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

import { Header, Issues, Image, Text, Strong, BackgroundImage } from './styles'

import Logo from '../../assets/logo.png'

interface RepositoryParams { 
    repository: string;
    id: string;

}

interface RepositoryInter { 
    name: string;
    biography: string;
    // stargazers_count: number;
    // forks_count: number;
    // open_issues_count: number;
    
        image: string;
    
}

interface Issue {
    // title: string;
    albums: [number];
    id: number;
    html_url: string;
    name: string;
    band: string;
    image: string;
    releasedDate: string;
    // tracks: [number];
    // user: {
    //     login: string;
    // }
}

const Repository: React.FC = () => {
    const [ repository, setRepository ] = useState<RepositoryInter | null>(null);
    const [ issues, setIssues ] = useState<Issue[]>([])
    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(()=>{
        api.get(`bands/${params.id}`).then(response => {
            setRepository(response.data)
        })
        api.get(`albums`).then(response => {
            console.log(response.data)

            setIssues(response.data)
        })
    },[params.id])


        //Outra Forma de Fazer o carregamento: 
        // useEffect(()=>{
        //     async function loadData(): Promise<void> {
        //         const [ repository, issues ] = await Promise.all([
        //     api.get(`repos/${params.repository}`),
        //     api.get(`repos/${params.repository}/issues`)
        //     ])
            
        //     console.log(repository);
        //     console.log(issues);
        // }

        // loadData();
        // },[params.repository])
    return (
    <>
        { repository &&  (<>

        <Header> 
            <Link to='/'> <FiChevronLeft size={16}/> Voltar </Link>
            <img src={Logo} style={{ maxHeight: 29 , maxWidth: 127}} />
        </Header>

            <Image src={repository.image} />
                
            <Strong>{repository.name}</Strong>
         <Text>{repository.biography}</Text>
         


        <Issues> 
        {issues.map(issue => (
        <a key={issue.id} href={issue.html_url}> 
             <img src={issue.image} />
             <div>
              <strong>{issue.name}</strong>
             {/* <p> {issue.tracks} </p> */}
             </div>
             <FiChevronRight size={20}/> 
         </a>
        ))}
        </Issues>
     </>)}
    </>
    )
}

export default Repository;