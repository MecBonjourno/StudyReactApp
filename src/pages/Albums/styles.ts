import styled, {css} from 'styled-components';
import { shade } from 'polished';

interface FormProps {
    hasError: boolean;
}

export const Title = styled.h1`
    font-size: 48;
    color: #3A3A3A;
    max-width: 450px;
    line-height: 48px;
    margin-top: 80px;
`;

export const Logo = styled.img`
    width: 20px;
    height: 20px;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    opacity: 0.9;
    background: #ff5221;
    padding: 4px 6px 0px 6px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);


    a{ 
        display: flex;
        align-items: center;
        text-decoration: none;
        padding-top: 6px;
        color: #a8a8b3;
        transition: color 0.3s;

        &:hover{
            color: #666;
        }
    }

    
`;


export const Form = styled.form<FormProps>`
    margin-top: 18px;
    max-width: 700px;
    margin-bottom: 12px;
    /* margin-left: 12px; */
    display: flex;
    justify-content: space-between;
    align-items: space-between;

    input { 
        /* flex:1;  */

        width: 100px;
        height: 30px;
        padding: 0px 0px 0px 4px;
        border: 0;
        border-radius: 5px 0 0 5px;
        color: #3A3A3A;
        border:  solid #FFF;
        border-right: 0;

        ${(props)=> props.hasError && css`
        border-color: #c53030;
        `}

        &::placeholder {
            color: #a8a8b3;
        }

    }

    button {
        width: 30px;
        height: 30px;
        background: #FFF;
        border: 0;
        border-radius: 0px 5px 5px 0px;
        color: #FFF;
        font-weight: bold;
        transition: background-color 0.4s;

        &:hover {
            background: ${shade(0.4, '#FFF')}
        }
    }
`;

export const Error = styled.span`
    display: block;
    color: #c53030;
    margin-top: 10px;
    margin-left: 8px;
`;

export const Repositories = styled.div`
    margin: 0 auto;
    padding: 0px 8px;
    margin-top: 80px;
    max-width: 700px;

    a { 
        background: #FFF;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none;

        display: flex;
        align-items: center;

        transition: transform 0.3s;

     & + a {
         margin-top: 16px;
     }
    
     &:hover {
         transform: translate(10px)
     }

    img {
        width: 64px;
        height: 64px;
        border-radius: 50%;

    }

    div {
        margin: 0 16px;
        flex: 1;

        strong {
            font-size: 20px;
            color: #3A3A3A;
        }

        p {
            font-size: 18px;
            color: #A8A8B3;
            margin-top: 4px;
         }
        }
        svg {
            margin-left: auto;
            color: #CBCBD6;
        }
    }

`;