import React from 'react';
import PropTypes from 'prop-types';

class ListFiles extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        files: []
      };
      this.onDrop = this.onDrop.bind(this);
    }
}