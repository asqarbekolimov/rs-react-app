import React, { Component } from 'react';
import { ProductProps } from '../App';

interface CardProps {
  product: ProductProps;
}

export default class Card extends Component<CardProps> {
  render() {
    const { product } = this.props;
    return (
      <div className="card">
        <h3 className="card_title">{product.title}</h3>
        <p className="card_descrption">{product.description}</p>
      </div>
    );
  }
}
