import React, { useEffect, useState } from 'react';
import { graphQLQuery } from './utils';
import StoryletEditor from './StoryletEditor';

function App() {
  const [storyletData, setStoryletData] = useState(null);

  async function clickHandler() {
      const response = await graphQLQuery(`{
        storyletByTitle(title: "title 2") {
          title, body, id
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
      {storyletData && <StoryletEditor storyletData={storyletData} />}
      <button onClick={clickHandler}>Load Data</button>
    </>
  );
}

export default App;
