const Persons = ({ filterName, persons, handleDelete }) => {
  const personsToShow = filterName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase()),
      )
    : persons;

  console.log(persons);

  return personsToShow.map((person) => {
    return (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id, person.name)}>
          delete
        </button>
      </p>
    );
  });
};

export default Persons;
