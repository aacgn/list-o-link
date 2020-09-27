import React, { useContext, useEffect } from 'react';
import { LinkContext } from "../contexts/LinkContext";

import LinkCard from "./LinkCard";

const LinkList = () => {
  const [state, setState] = useContext(LinkContext);

  const loadLinks = async () => {
    try {
      const res = await fetch('/.netlify/functions/getLinks');
  
      const links = await res.json();
      setState({ ...state, links });
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="my-4">Links</h2>
      {state && state.links && state.links.filter(link => !link.archived).map((link) => <LinkCard key={link._id} link={link} />)}
      <h2 className="my-4">Archived</h2>
      {state && state.links && state.links.filter(link => link.archived).map((link) => <LinkCard key={link._id} link={link} />)}
    </div>
  )
};

export default LinkList;
