function ListGroup() {
  const items = ["New York", "London", "Tokyo", "Hong Kong", "Toronto"];

  return (
    <>
      <h2>Wilson's List</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li
            className="list-group-item"
            key={item}
            onClick={(e) => console.log(e)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
