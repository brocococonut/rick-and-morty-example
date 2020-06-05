import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from '@apollo/react-components';
import { withRouter } from 'react-router-dom';

const GET_CHARACTER = gql`
  query Character($id: ID){
    character(id:$id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        type
        dimension
      }
      location {
        name
        type
        dimension
      }
      image
      episode {
        name
        episode
      }
    }
  }
`;

/**
 * Characters route
 */
class CharacterProfile extends React.Component {
  /**
   * Add the ID from the route parameter to the component
   */
  componentWillMount() {
    this.id = parseInt(this.props.match.params.id);
  }

  /**
   * Render main view
   */
  render() {
    return (
      // Query wrapper
      <Query
        query={GET_CHARACTER}
        variables={{ id: this.id }}
        errorPolicy={'all'}
      >{({ loading, error, data }) => {
        // Initial setup of DOM segments
        let loadingEl,
          errorEl,
          characterEl;

        // Loading element
        if (loading) loadingEl = <div className="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
          <div className="card fluid" style={{ textAlign: 'center' }}>
            <h3>Loading...</h3>
          </div>
        </div>

        // Error element display
        if (error) errorEl = <pre>{error.message}</pre>

        // Everything's fine, so set the charactersEl and selectEl to their proper values
        if (!loading && !error) {
          // Destructure the character information out
          const {character: {
            name,
            status,
            species,
            type,
            gender,
            origin: {
              name: originName,
              type: originType,
              dimension: originDimension
            },
            location: {
              name: locName,
              type: locType,
              dimension: locDimension
            },
            image,
            episode: episodes
          }} = data;

          // Structure the element to resemble its final form
          characterEl = <div className="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
            <div className="card fluid" style={{ textAlign: 'center' }}>
              <img src={image} class="section media" alt={name} style={{ height: 'unset', maxHeight: '70vh' }} />
              <div className="section dark">
                <h2>{name}</h2>
              </div>
              <div className="section">
                <h4>Status</h4><h6>{status}</h6>
              </div>
              <div className="section">
                <h4>Species</h4><h6>{species}</h6>
              </div>
              {type ?
                <div className="section">
                  <h4>Type</h4><h6>{type}</h6>
                </div> :
                null}

              <div className="section">
                <h4>Gender</h4><h6>{gender}</h6>
              </div>
              <div className="section">
                <h4>Originated</h4><h6>{originDimension ? `${originDimension}: ` : ''}{originName}{originType ? ` (${originType})` : ''}</h6>
              </div>
              <div className="section">
                <h4>Current Location</h4><h6>{locDimension ? `${locDimension}: ` : ''}{locName}{locType ? ` (${locType})` : ''}</h6>
              </div>
              <div className="section">
                <h4>Appearances:</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Episode</th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map out the episodes into table rows */}
                    {episodes.map(episode => <tr><td>{episode.episode}</td><td>{episode.name}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

        // Return structured route
        return (
          <main>
            <div className="row">
              {errorEl}
              {loadingEl}
              {characterEl}
            </div>
          </main>
        );
      }}
      </Query>
    )
  }
}

export default withRouter(CharacterProfile);