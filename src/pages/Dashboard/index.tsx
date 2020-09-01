import React from 'react';
import { FiChevronRight } from 'react-icons/fi'

import Logo from '../../assets/logo.svg'

import { Title, Form, Repositories } from './styles'

const Dashboard: React.FC = () => {
    return (
    <>
     <img src={Logo} alt="Logo" />
     <Title>Explore Repos in GitHub </Title>
     <Form>
         <input placeholder="Digite o nome do Repo" />
         <button type="submit"> Pesquisar </button>
     </Form>

     <Repositories>
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
         </a>

         <a href="#"> 
            <img src="https://avatars1.githubusercontent.com/u/34528662?s=460&u=78756aba83d8ac11e925b0a1c86b16ccaf5250c9&v=4" alt="eu"></img>
         <div>
             <strong>MecBonjourno/precav</strong>
             <p> Repositório do site da Precav</p>
         </div>
         <FiChevronRight /> 
         </a>
     </Repositories>
    </>
    );
}

export default Dashboard;