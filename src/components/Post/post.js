import React, { Component } from 'react';

class PostTable extends Component {
    render() {
        return (
            <tr>
            <td>
              {this.props.obj.id}
            </td>
            <td>
              {this.props.obj.title}
            </td>
            <td>
              {this.props.obj.description}
            </td>
            </tr>
        );
    }
}

export default PostTable;