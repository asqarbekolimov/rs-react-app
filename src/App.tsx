import { Component } from 'react';
import { ErrorBoundary } from './components/error-boundary';
import Search from './components/search';
import CardList from './components/card-list';

export interface ProductProps {
  id: string;
  title: string;
  description: string;
}

interface AppState {
  search: string;
  searchTerms: string[];
  results: ProductProps[];
  loading: boolean;
  error: string | null;
  causeError: boolean;
}

export default class App extends Component<object, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      search: '',
      searchTerms: JSON.parse(localStorage.getItem('searchTerms') || '[]'),
      results: [],
      loading: false,
      error: null,
      causeError: false,
    };
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  searchData = async (url: string) => {
    this.setState({ loading: true, error: null });
    const trimmedQuery = url.trim();
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${trimmedQuery}`
      );
      if (!response.ok) {
        throw new Error(
          `Something went wrong: ${response.status} - ${response.statusText}`
        );
      }
      const data = await response.json();
      this.setState({ results: data.products, loading: false });
    } catch (error) {
      this.setState({ error: (error as Error).message, loading: false });
    }
  };

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error(`Could not fetch, status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ results: data.products, loading: false });
    } catch (error) {
      this.setState({
        error: (error as Error).message,
        causeError: true,
        loading: false,
      });
    }
  };

  handleSearch = () => {
    const { search, searchTerms } = this.state;
    if (search && !searchTerms.includes(search)) {
      const updatedSearchTerms = [...searchTerms, search];
      localStorage.setItem('searchTerms', JSON.stringify(updatedSearchTerms));
      this.setState({ searchTerms: updatedSearchTerms, search }, () => {
        this.searchData(search);
      });
    } else if (search) {
      this.setState({ search }, () => {
        this.searchData(search);
      });
    } else {
      this.fetchData();
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="app">
        <Search
          search={this.state.search}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
        />
        <ErrorBoundary fallback={<h2 className="error">{this.state.error}</h2>}>
          <CardList
            results={this.state.results}
            loading={this.state.loading}
            error={this.state.error}
            setError={(error: string) => this.setState({ error })}
            causeError={this.state.causeError}
            setCauseError={() => this.setState({ causeError: true })}
          />
        </ErrorBoundary>
      </div>
    );
  }
}
