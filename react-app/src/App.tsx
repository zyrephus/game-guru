import { useState } from "react";
import { BsFillCalendarFill } from 'react-icons/bs';
import Button from './components/Button/Button';
import Like from './components/Like';
import NavBar from './components/NavBar';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState(['Product1', 'Product2']);

  return (
    <div>
      <NavBar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={()=> setCartItems([])} />
      <BsFillCalendarFill color="red" size="40"/>
      <Button onClick={() => {console.log("Button clicked!")}}>My Button</Button>
      <Like onClick={() => console.log("Like clicked!")}></Like>
    </div>
  );
}

export default App;
