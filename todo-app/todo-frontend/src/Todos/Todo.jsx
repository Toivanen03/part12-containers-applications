import PropTypes from 'prop-types';

const Todo = ({ todo }) => {
    return <li>{todo.text}</li>
}

Todo.propTypes = {
    todo: PropTypes.shape({
        text: PropTypes.string.isRequired
    }).isRequired
};

export default Todo;
  