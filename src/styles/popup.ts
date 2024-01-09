import styled from 'styled-components';

export const Style = styled.div`
    width: 400px;
    height: 500px;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    position: relative;
    background: linear-gradient(to bottom right,  rgba(255, 0, 255, 0.1), rgba(0, 255, 0, 0.1));
    padding: 10px;
}
`

export const Input = styled.input`
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    margin-bottom: 10px;
    font-size: 16px;
    box-sizing: border-box;
`

export const ContainerCenterText = styled.div`
    text-align: center;
    width: 100%;
`
export const ContainerImgLogo = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`

export const ContainerInput = styled.div`
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
`

export const ContainerChatHistory = styled.div`
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    height: 330px;
    margin-bottom: 30px;
    overflow: auto;

`

export const ContainerChat = styled.div`
    width: 100%;
    box-sizing: border-box;

`

export const BoxChatRequest = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    text-align: right;
    background-color: rgba(0, 255, 0, 0.05)
`

export const BoxChatResponse = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    background-color: rgba(255, 0, 255, 0.05) 
`

export const ContainerFooter = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-around;
    font-size: 12px;
`

export const ButtonFooter = styled.button`
    border: none;
    background: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`