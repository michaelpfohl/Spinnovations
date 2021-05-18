import { Component } from 'react';
import productData from '../Helpers/Data/ProductData';
import { ProductCard } from '../Components/Cards/ProductCard';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import { SearchProps } from '../Helpers/Interfaces/SearchInterfaces';

type SearchState = {
    results? : Product[];
    searchTerm: string;
    filteredResults?: Product[];
    greetingColor: number;
}
  
export default class SearchResults extends Component<SearchProps, SearchState> {
  state : SearchState = {
    results: [],
    searchTerm: '',
    filteredResults: [],
    greetingColor: 0
  };


  componentDidMount(): void {
    this.setState({ 
      searchTerm: this.props.match.params.term,
      greetingColor: Math.floor(Math.random() * 7) + 1
     })
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
    const { results, greetingColor } = this.state;
    const productCard = (product: Product, color: number): JSX.Element => {
      return (<ProductCard key={product.id} product={product} color={color}/>)
    }
    const assignColors = (products: Product[]) => {
      const cards: Product[] = [];
      let counter = 0;
      products?.forEach((product) => {
          counter++;
          if (counter >= 8) counter = 1;
          cards.push(productCard(product, counter));
      })
      return cards;
    }
    let cards: Product[] = []
    if (results?.length){
      cards = assignColors(results);
    } else {
      cards = [<div className={`col-10 mt-4 color-border-${greetingColor} orders-dashboard`}>
                <h1 className="mt-4 mb-4">No matching products</h1>
              </div>]
    }
   
    return (
      <div className="mt-4">
        <div className="container-fluid d-flex flex-wrap justify-content-around">
          {cards}
        </div>
      </div>
    )
  }
}
