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
    productData.getProducts().then((response) => {
        this.setState({
            results: response,
        })
      });
  }

  performSearch = (): void => {
    const searchTerm = this.props.match.params.term;
    const filteredResults = this.state.results?.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    this.setState({
      filteredResults,
      searchTerm,
    });
  };

  componentDidUpdate(): void {
    if (this.state.searchTerm !== this.props.match.params.term) {
      this.performSearch();
    }
  }

  render(): JSX.Element {
    const { filteredResults } = this.state;
    
    const showResults = () => {
      if (filteredResults?.length){
      return filteredResults?.map((result) => (
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
