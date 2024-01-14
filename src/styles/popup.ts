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
    // background: linear-gradient(to bottom right, rgb(249, 239, 219, 0.2), rgb(99, 136, 137, 0.2));
    padding: 10px;
}
`

export const Input = styled.input`
    width: 100%;
    height: 40px;
    border: 1px solid #63888950;
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
    top: 0px;
    left: 8px;
`

export const ContainerImgSpeak = styled.div`
    position: absolute;
    top: 18px;
    right: 8px;
`

export const ContainerInput = styled.div`
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`

export const ContainerChatHistory = styled.div`
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    height: 370px;
    overflow: auto;

`

export const ContainerChat = styled.div`
    width: 100%;
    box-sizing: border-box;    
`

export const BoxChatRequest = styled.div`
    width: max-content;
    height: 100%;
    padding: 0px 10px;
    box-sizing: border-box;
    border: 1px solid #638889;
    border-radius: 10px;
    margin: 10px 0;
    text-align: right;
    // background-color: rgba(0, 255, 0, 0.05)
    color: #fff;
    margin-left: auto; 
    background-color: rgb(99, 136, 137)
`

export const BoxChatResponse = styled.div`
    width: max-content;
    max-width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #63888950;
    border-radius: 10px;
    margin: 10px 0;
    overflow-x: auto;
    background-color: rgb(249, 239, 219, 0.2)
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

export const ContainerListIcon = styled.div`
    display: flex;
    justify-content: left;
    padding: 5px 10px;
    width: 100%;
    box-sizing: border-box;
`