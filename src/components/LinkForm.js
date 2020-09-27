import React, {useState, useContext} from 'react';
import { LinkContext } from "../contexts/LinkContext";

const LinkForm = () => {

    const [state, setState] = useContext(LinkContext);
    const [newLink, setNewLink] = useState({name: '', url: '', description: ''});

    const resetForm = () => {
        setNewLink({name: '', url: '', description: ''});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/.netlify/functions/createLink', {
                method: 'POST',
                body: JSON.stringify(newLink)
            });

            const newestLink = await res.json();
            setState({...state, link: state.links.push(newestLink)});

            resetForm();
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card">
            <div className="card-header">Add Link</div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={newLink.name}
                                onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">URL</label>
                        <input
                                type="text"
                                name="url"
                                className="form-control"
                                value={newLink.url}
                                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                                type="text"
                                name="description"
                                className="form-control"
                                value={newLink.description}
                                onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LinkForm;