import React from 'react'
import styled from 'styled-components'

const UserText = () => {
    return (
        <Jumbotron className="mt-4 mx-4 p-5 text-dark rounded">
            <h1>Welcome User!!!</h1>
            <p>Coming soon!!!</p>
        </Jumbotron>
    )
}

export default UserText

const Jumbotron = styled.div`
background-color: white;
box-shadow: 0px 0px 7px 2px rgba(0,0,0,0.35) inset;
-webkit-box-shadow: 0px 0px 7px 2px rgba(0,0,0,0.35) inset;
-moz-box-shadow: 0px 0px 7px 2px rgba(0,0,0,0.35) inset;
`;