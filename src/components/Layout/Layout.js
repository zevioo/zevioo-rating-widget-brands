import React from 'react'
import Aux from '../../hoc/Aux'
import '../../index.css'

const layout = (props) => {
    return (
        <Aux>
            {props.children}
        </Aux>
    )

}

export default layout;