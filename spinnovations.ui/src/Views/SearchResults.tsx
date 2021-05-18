import { Component } from 'react';
import productData from '../Helpers/Data/ProductData';
import { ProductCard } from '../Components/Cards/ProductCard';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import { SearchProps } from '../Helpers/Interfaces/SearchInterfaces';

type SearchState = {
    results? : Product[];
    searchTerm: string;
    filteredResults?: Product[];
}
  
export default class SearchResults extends Component<SearchProps, SearchState> {
  state : SearchState = {
    results: [],
    searchTerm: '',
    filteredResults: [],
  };


  componentDidMount(): void {
    this.setState({ searchTerm: this.props.match.params.term })
  }

  getProductsFromSearch = (): void => {
    productData.search(this.state.searchTerm).then((response) => {
      this.setState({
        results: response,
      })
    })
  }

  componentDidUpdate(prevState: SearchState): void {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.getProductsFromSearch();
    }
  }

  render(): JSX.Element {
    const { results } = this.state;
    
    const showResults = () => {
      if (results?.length){
      return results?.map((result) => (
          <ProductCard product = {result} key = {result.id} />
      ))}
      else {
          return (
              <div>
                  <h1>No Matching Products</h1>
              </div>
          )
      }
    };
        
    return (
      <div>
        <h2>Search Results</h2>
        <div className="d-flex flex wrap container">{showResults()}</div>
      </div>
    )
  }
}
