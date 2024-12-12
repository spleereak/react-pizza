import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string,
    title: string,
    price: number
  }>();
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://d7d46da63dd6c2bd.mokky.dev/items/${id}`);
        setPizza(data);
      } catch (err) {
        alert(err);
        navigate('/');
      }
    }

    fetchPizza();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container'>
      {!pizza ? (
        <h1>Загрузка...</h1>
      ) : (
        <>
          <img src={pizza.imageUrl} alt='PizzaImage' />
          <h2>{pizza.title}</h2>
          <h4>{pizza.price}</h4>
        </>
      )}
    </div>
  )
}

export default FullPizza