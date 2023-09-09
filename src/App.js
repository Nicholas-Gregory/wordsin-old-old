import React, { useEffect, useState } from 'react';
import StoryletViewer from './StoryletViewer';
import { graphQLQuery } from './utils';

function App() {
  const [storyletData, setStoryletData] = useState({});

  async function clickHandler() {
      const response = await graphQLQuery(`{
        storyletByTitle(title: "title 2") {
          title, body,
          next {
            id, title
          },
          previous {
            id, title
          }
        }
      }`);

      setStoryletData(response.data.storyletByTitle);
  }

  return (
    <>
      <StoryletViewer storylet={storyletData}/>
      <button onClick={clickHandler}>Load Data</button>
    </>
  );
}

export default App;
