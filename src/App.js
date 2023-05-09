import { FormWrapper } from './compoments/form-wrapper/formWrapper';
import { mockApi } from './mock-api/mock-api';
import { useEffect, useState } from 'react';
import './styles/styles.css'

function App() {

  const [data, setData] = useState({
    towers: [],
    floors: []
  });

  useEffect(() => {
    Promise.all([mockApi.getTowers(),  mockApi.getFloors()])
      .then(([towers, floors]) => setData({ towers, floors }))
  }, [])
  
  return (
    <FormWrapper towers={data.towers} floors={data.floors} ></FormWrapper>
  );
}

export default App;
