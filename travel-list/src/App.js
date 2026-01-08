import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <div className="app">
        <Logo />
        <Form
          description={description}
          setDescription={setDescription}
          quantity={quantity}
          setQuantity={setQuantity}
          items={items}
          setItems={setItems}
        />
        <PackingList items={items} setItems={setItems} />
        <Stats />
      </div>
    </>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 👜</h1>;
}

function Form({
  description,
  setDescription,
  quantity,
  setQuantity,
  items,
  setItems,
}) {
  function handlerSubmit(e) {
    e.preventDefault();
    console.log(e);

    if (!description) {
      return;
    }

    const newItem = { id: Date.now(), description, quantity, packed: false };

    setItems((items) => [...items, newItem]);

    console.log(items);

    setDescription("");
    setQuantity(1);
  }
  return (
    <>
      <form className="add-form" onSubmit={handlerSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select
          value={quantity}
          onChange={(e) => {
            console.log(e.target.value);
            setQuantity(e.target.value);
          }}
        >
          {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => {
            return (
              <option value={num} key={num}>
                {num}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>ADD</button>
      </form>
    </>
  );
}

function PackingList({ items, setItems }) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => {
            return <Item item={item} key={item.id} setItems={setItems} />;
          })}
        </ul>
        <select>
          <option>SORT BY INPUT ORDER</option>
          <option>SORT BY FROM THE MOST RECENT</option>
          <option>SORT BY FROM THE LEAST RECENT </option>
        </select>
        <button>Clear List</button>
      </div>
    </>
  );
}

function Item({ item, setItems }) {
  function handlerClick(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <>
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => handlerClick(item.id)}>❌</button>
      </li>
    </>
  );
}

function Stats() {
  return (
    <>
      <footer className="stats">
        <em>you have x items on your list , and you already pachked (x%)</em>
      </footer>
    </>
  );
}

export default App;
