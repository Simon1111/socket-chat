import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { items: state.items };
};

const ConnectedList = ({ items }) => (
  <ul className="list-group list-group-flush">
    
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;
