const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => {
    return (sum += part.exercises);
  }, 0);

  return (
    <div>
      {course.parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        );
      })}
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  );
};

export default Course;
