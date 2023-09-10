import React, { useEffect, useState } from 'react';
import StoryletViewer from './StoryletViewer';
import StoryletCard from './StoryletCard';
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
      <p>
        Previous:
      </p>
      <ul>
            {(storyletData.previous || []).map(storylet => 
                <li key={storylet.id}>
                    <StoryletCard storylet={storylet} />
                </li>
            )}
        </ul>
      <StoryletViewer storylet={storyletData}/>
      <p>
        Next:
      </p>
      <ul>
            {(storyletData.next || []).map(storylet => 
                <li key={storylet.id}>
                    <StoryletCard storylet={storylet} />
                </li>
            )}
        </ul>
      <button onClick={clickHandler}>Load Data</button>
    </>
  );
}

export default App;
