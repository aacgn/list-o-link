import React, {useContext} from 'react';
import { LinkContext } from "../contexts/LinkContext";

const LinkCard = ({link}) => {

    const [state, setState] = useContext(LinkContext);

    const updateLink = async (archived) => {
        link.archived = archived;

        try {
            const res = await fetch('/.netlify/functions/updateLink', {
                method: 'PUT',
                body: JSON.stringify(link)
            });

            const updatedLink = await res.json();
            setState({...state, links: state.links.map(item => item._id === updatedLink._id ? {...item, archived: updatedLink.archived} : item)});
        }
        catch (err) {
            console.error(err);
        }
    }

    const deleteLink = async () => {
        const _id = link._id;

        try {
            const res = await fetch('/.netlify/functions/deleteLink', {
                method: 'DELETE',
                body: JSON.stringify({ _id })
            });

            const deletedLink = await res.json();
            setState({...state, links: state.links.filter(item => item._id !== deletedLink._id)});
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card mt-2">
            <div className="card-header">
                {link.name}
            </div>
            <div className="card-body">
                <a href={link.url}>{link.url}</a>
                <p>{link.description}</p>
            </div>
            <div className="card-footer">
                {
                    !link.archived ?
                    <button className="btn btn-warning mr-2" onClick={() => updateLink(true)}>Archive</button>
                    :
                    <button className="btn btn-success mr-2" onClick={() => updateLink(false)}>Unarchive</button>
                }
                <button className="btn btn-danger" onClick={deleteLink}>Delete</button>
            </div>
        </div>
    );
}

export default LinkCard;
