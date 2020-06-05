import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Character card/link
 * @param {{character: CharacterType}} props Props to pass in
 */
export default function Character (props) {
  /**
   * Not destructured out for the sake of proper typing
   * @type {CharacterType}
   */
  const character = props.character;

  return (
    <Link to={`/character/${character.id}`} className="col-sm-12 col-md-4 col-lg-3">
      <div className="card fluid">
        <img src={character.image} alt={character.name} className="section media"/>
        <div className="section">{character.name}</div>
        <div className="section"><span>Appeared in {character.episode.length} episodes</span></div>
      </div>
    </Link>
  )
}
