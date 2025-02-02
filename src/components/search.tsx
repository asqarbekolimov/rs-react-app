import React, { Component } from 'react';

type SearchProps = {
  search: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

type SearchState = {
  oldSearchData: string[];
  isOldData: boolean;
};

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      oldSearchData: JSON.parse(localStorage.getItem('searchTerms') || '[]'),
      isOldData: false,
    };
  }

  onOldSearchResults = () => {
    this.setState({ isOldData: !this.state.isOldData });
  };

  onSubmit = () => {
    this.props.onSearch();
    this.setState({ isOldData: false });
  };

  handleOldSearchClick = (result: string) => {
    this.props.onChange({
      target: { value: result },
    } as React.ChangeEvent<HTMLInputElement>);
    this.setState({ isOldData: false });
  };

  render() {
    const { search, onChange } = this.props;
    const { oldSearchData, isOldData } = this.state;

    return (
      <div className="search_relative">
        <div className="search">
          <div className="container search_container">
            <input
              type="text"
              className="search_input"
              placeholder="Search"
              value={search}
              onChange={onChange}
              onClick={this.onOldSearchResults}
            />
            <button className="search_btn" onClick={this.onSubmit}>
              Search
            </button>
            <div className="old_search">
              {oldSearchData.length > 0 && isOldData && (
                <div className="old_search_results">
                  <h3>Old search results</h3>
                  <ul>
                    {oldSearchData.map((result: string) => (
                      <li
                        key={result}
                        onClick={() => this.handleOldSearchClick(result)}
                      >
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
