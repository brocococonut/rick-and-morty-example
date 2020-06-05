import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from '@apollo/react-components';
import Character from '../components/Character.jsx';
import ReactPaginate from 'react-paginate';

const GET_CHARACTERS = gql`
  query Characters($page: Int, $filter:FilterCharacter){
    characters(page:$page, filter:$filter) {
      info {
        pages
      }
      results {
        id
        name
        image
        episode {
          id
        }
      }
    }
  }
`;

/**
 * Characters route
 */
class Characters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      filter: null
    };

    this.handleInput = this.handleInput.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * Handle search input value changes
   * @param {InputEvent} event Input event
   * @param {function} refetch Function to refetch gql data
   */
  handleInput(event, refetch) {
    // Set the current state for the refetch
    const { target: { value } } = event;
    this.setState(
      {
        name: value,
        filter: this.state.name ? { name: value } : null,
        page: 1
      },
      // Run refetch
      () => refetch(this.state)
    );
  }

  /**
   * Handle pagination changes
   * @param {{selected: number}} page Page number (starting from 0)
   * @param {function} refetch Function to refetch gql data
   */
  handlePageChange(page, refetch) {
    const { selected } = page;

    // Add the incremented selected page to the state
    this.setState(
      {
        page: selected + 1
      },
      // Run refetch
      () => refetch(this.state)
    );
  }

  /**
   * Render main view
   */
  render() {
    return (
      // Query wrapper
      <Query
        query={GET_CHARACTERS}
        variables={{ page: this.state.page }}
        errorPolicy={'all'}
      >{({ loading, error, data, refetch }) => {

        // Search element variable
        const searchEl = <div className="row">
          <div className="col-sm-12">
            <div className="card fluid">
              <input type="text" placeholder="Character Name" style={{
                border: 'none',
                padding: 0,
              }} value={this.state.name} onChange={(event) => this.handleInput(event, refetch)} />
            </div>
          </div>
        </div>

        // Initial setup of DOM segments
        let loadingEl,
          errorEl,
          pagination,
          charactersEl;

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
          // Destructure the characters and page count out of the data
          const { characters: { results: chars, info: { pages } } } = data;

          // Setup pagination
          pagination = <div className="row" style={{ textAlign: 'center' }}>
            <div className="col-sm-12">
              <div className="paginate">
                <ReactPaginate
                  pageCount={pages}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  initialPage={this.state.page - 1}
                  disableInitialCallback={true}
                  onPageChange={(ev) => this.handlePageChange(ev, refetch)} />
              </div>
            </div>
          </div>

          // Map the characters to <Character /> elements
          charactersEl = chars.map((char, i) => <Character character={char} key={`char-${char.id}-${i}`} />);
        }

        // Return structured route
        return (
          <main>
            {searchEl}
            {pagination}
            <div className="row">
              {errorEl}
              {loadingEl}
              {charactersEl}
            </div>
            {pagination}
          </main>
        )
      }}
      </Query>
    )
  }
}

export default Characters;