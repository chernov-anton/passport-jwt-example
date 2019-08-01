import {useReducer} from 'react';

function useInputsState(initialValues) {
  const [values, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    initialValues
  );

  const handleChange = evt => {
    const {name, value} = evt.target;

    setUserInput({[name]: value});
  };

  return [values, handleChange];
}

export {
  useInputsState
}