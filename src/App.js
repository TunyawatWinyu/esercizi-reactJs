import { useMemo, useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sortBy, setSortBy] = useState("");

  function handlerSubmit(e) {
    e.preventDefault();
    console.log(e);

    if (!description) {
      return;
    }

    const newItem = { id: Date.now(), description, quantity, packed: false };

    handlerAddItems(newItem);

    console.log(items);

    setDescription("");
    setQuantity(1);
  }

  function handlerAddItems(items) {
    setItems((item) => [...item, items]);
  }

  function handlerChecked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handlerDeleteItems(id) {
    setItems((item) => item.filter((item) => item.id !== id));
  }

  const sortedItems = useMemo(() => {
    if (sortBy === "input") return items; // ordine originale
    if (sortBy === "mostRecent") return [...items].sort((a, b) => b.id - a.id); // dal più recente
    if (sortBy === "leastRecent") return [...items].sort((a, b) => a.id - b.id); // dal meno recente
    if (sortBy === "packed")
      return [...items].sort((a, b) => a.packed - b.packed); // items gia packed
    return items;
  }, [items, sortBy]);

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
          onSubmit={handlerSubmit}
        />
        <PackingList
          items={sortedItems}
          setItems={setItems}
          onChecked={handlerChecked}
          onDeleteItems={handlerDeleteItems}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <Stats items={items} />
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
  onSubmit,
}) {
  return (
    <>
      <form className="add-form" onSubmit={onSubmit}>
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

function PackingList({
  items,
  setItems,
  onDeleteItems,
  onChecked,
  sortBy,
  setSortBy,
}) {
  function handlerClearList() {
    const confirmed = window.confirm(
      "Aree you surre you want to delete all items ?"
    );
    if (confirmed) setItems([]);
  }
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
                setItems={setItems}
                onDeleteItems={onDeleteItems}
                onChecked={onChecked}
              />
            );
          })}
        </ul>
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value={"input"}>SORT BY INPUT ORDER</option>
            <option value={"mostRecent"}>SORT BY FROM THE MOST RECENT</option>
            <option value={"leastRecent"}>
              SORT BY FROM THE LEAST RECENT{" "}
            </option>
            <option value={"packed"}>SORT BY FROM PACKED ITEMS </option>
          </select>
          <button onClick={() => handlerClearList()}>Clear List</button>
        </div>
      </div>
    </>
  );
}

function Item({ item, onChecked, onDeleteItems }) {
  return (
    <>
      <li>
        <input type="checkbox" onClick={() => onChecked(item.id)} />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItems(item.id)}>❌</button>
      </li>
    </>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items in your packing list🚀🚀</em>
      </footer>
    );
  }
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / items.length) * 100);
  return (
    <>
      <footer className="stats">
        <em>
          {percentage === 100
            ? `You got everything!!🚀 You're ready to go ✈️`
            : `you have ${items.length} items on your list , and you already packed ${numPacked} 
          (${percentage}%)`}
        </em>
      </footer>
    </>
  );
}

export default App;
