import React from 'react';
import { LinkProvider } from "./contexts/LinkContext";

import LinkList from "./components/LinkList";
import LinkForm from './components/LinkForm';

const App = () => {
  return (
    <LinkProvider>
      <div className="container py-5">
        <h1 className="text-center mb-5">
          List O' Link
        </h1>
        <LinkForm />
        <LinkList />
      </div>
    </LinkProvider>
  );
}

export default App;
