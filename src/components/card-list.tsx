import { Component } from 'react';
import Main from './main';
import { ProductProps } from '../App';
import { ErrorBoundary } from './error-boundary';

interface CardListProps {
  results: ProductProps[];
  loading: boolean;
  error: string | null;
  setError: (error: string) => void;
  causeError: boolean;
  setCauseError: () => void;
}

interface CardListState {
  results: ProductProps[];
}

export default class CardList extends Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);
    this.state = {
      results: props.results,
    };
  }

  throwError = () => {
    this.props.setCauseError();
    this.props.setError('Test error');
  };

  render() {
    if (this.props.causeError) {
      throw new Error('Test error');
    }
    const { results, loading, error } = this.props;
    return (
      <ErrorBoundary fallback={<div>Error caught by ErrorBoundary</div>}>
        <div className="app container">
          <Main results={results} loading={loading} error={error} />
          <button onClick={this.throwError} className="error_btn">
            Throw Error
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}
