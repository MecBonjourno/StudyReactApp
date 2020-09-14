import styled from 'styled-components';

export const Header = styled.header`
    background: #ff5221;
    display: flex;
    flex:1;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    opacity: 0.9;
    padding: 14px 4px 14px 6px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);

    a{ 
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #a8a8b3;
        transition: color 0.3s;

        &:hover{
            color: #666;
        }
    }
`;

export const Text = styled.p`
    justify-content: center;
    overflow: hidden;
    color: #000;
    padding: 18px 16px 6px 16px;
`;

export const Strong = styled.strong`
        display: flex;
        justify-content: center;
        font-size: 36px;
        color: #FFF;
        padding-top: 4px;
`;

export const Image = styled.img`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
    z-index: 1;

`;

export const Block = styled.div`
    padding: 300px 14px 0px 14px;

`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    text-align: center;
    
    
    strong {
        text-align: center;
        max-width: 30px;
        font-size: 22px;
        color: #3d3d4d;
        padding: 0 14px 0px 14px;
    }

    p {
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: #3d3d4d;
        padding: 0 14px 0px 14px;
        }
`;

export const BackgroundImage = styled.img`
    position: absolute;
    width: 100%;
    z-index: -1;
    filter: blur(2px);
    -webkit-filter: blur(2px);
`;


export const Issues = styled.div`
    margin: 0 auto;
    padding: 0px 8px;
    margin-top: 12px;
    max-width: 700px;
    img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
    }
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
    }

`;