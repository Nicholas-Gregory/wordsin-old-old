import React from 'react';
import StoryletCard from './StoryletCard';

export default function StoryletCardList({ storyletList }) {

    return (
        <ul>
            {(storyletList || []).map(storylet => 
                <li key={storylet.id}>
                    <StoryletCard storylet={storylet} />                    
                </li>
            )}
        </ul>
    );
}