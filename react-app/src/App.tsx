import { useState } from "react";
import { BsFillCalendarFill } from "react-icons/bs";
import Button from "./components/Button/Button";
import Like from "./components/Like";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ExandableText from "./components/ExpandableText";

function App() {
  const [cartItems, setCartItems] = useState(["Product1", "Product2"]);

  return (
    <div>
      <NavBar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])} />
      <BsFillCalendarFill color="red" size="40" />
      <Button
        onClick={() => {
          console.log("Button clicked!");
        }}
      >
        My Button
      </Button>
      <Like onClick={() => console.log("Like clicked!")}></Like>
      <ExandableText>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit
        asperiores iure corrupti dolores repellat fuga maxime, iusto est dolore,
        quod, eum architecto autem illo mollitia doloremque beatae ab molestiae
        esse facere ad unde! Illum cumque ut tempora totam fugiat nihil adipisci
        voluptatibus consectetur pariatur minima, dolorum vitae quidem voluptate
        libero reiciendis nesciunt obcaecati. Pariatur ducimus fugiat quae
        doloremque ex voluptas quod nesciunt natus possimus dolore at ratione
        repellendus, expedita dolores quisquam placeat earum eveniet blanditiis
        harum reprehenderit assumenda? Neque, adipisci rem fugiat magni
        assumenda facilis, debitis expedita officia aut placeat autem aperiam
        itaque iste optio eum ipsum praesentium in! Ea.
      </ExandableText>
    </div>
  );
}

export default App;
