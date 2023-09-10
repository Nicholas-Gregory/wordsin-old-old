import React from 'react';
import StoryletCard from './StoryletCard';

export default function StoryletCardList({ storyletList, select, showViewButtons }) {

    return (
        <ul>
            {(storyletList || []).map(storylet => 
                <li key={storylet.id}>
                    <StoryletCard storylet={storylet} />                    
                    {showViewButtons &&
                        <button onClick={() => select(storylet.title)}>View</button>
                    }
                </li>                
            )}
        </ul>
    );
}