import React, {useState} from 'react';

const LinkContext = React.createContext([{}, () => {}]);

const LinkProvider = (props) => {
    const [state, setState] = useState({});

    return (
        <LinkContext.Provider value={[state, setState]}>
            {props.children}
        </LinkContext.Provider>
    );
}

export { LinkContext, LinkProvider };