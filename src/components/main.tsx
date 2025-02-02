import { Component } from 'react';
import Card from './card';
import Loading from './loading';
import { ProductProps } from '../App';

interface MainProps {
  results: ProductProps[];
  loading: boolean;
  error: string | null;
}

export default class Main extends Component<MainProps> {
  render() {
    const { error, loading, results } = this.props;
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    if (!results.length) {
      return <h1 className="no_result">No results</h1>;
    }

    return (
      <>
        <div className="container main">
          <div className="main_container">
            {results.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
