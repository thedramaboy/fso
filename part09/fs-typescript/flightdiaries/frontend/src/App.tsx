import { useEffect, useState } from "react";
import { Weather, Visibility, type DiaryEntry, type NewDiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState('');
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: ''
  });

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService.create(newDiary).then((returnedDiary) => {
      setDiaries(diaries.concat(returnedDiary));
      setNewDiary({ date:'', weather: Weather.Sunny, visibility: Visibility.Great, comment:''});
    }).catch((error: unknown) => {
      if(axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (typeof data === "object" && data !== null && 'error' in data && Array.isArray(data.error)) {
         showError(
          data.error.map((issue: unknown) => {
            if(typeof issue === 'object' && issue !== null && 'message' in issue && typeof issue.message === 'string') {
              return issue.message;
            }
            return 'Unknown error';
          }).join(', ')
         );
        } else {
          showError('Unknown error');
        }
      } else {
        showError('Unknown error');
      }
    })
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={diaryCreation}>
        <div>
          <label>date</label>
          <input
            value={newDiary.date}
            type="date"
            placeholder="date"
            onChange={(event) => setNewDiary({ ...newDiary, date: event.target.value})}
          />
        </div>
        <div>
          <label>visibility</label>
          {Object.values(Visibility).map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="visibility"
                checked={newDiary.visibility === value}
                onChange={() => setNewDiary({ ...newDiary, visibility: value })}
              />
              {value}
            </label>
          ))}
        </div>
        <div>
          <label>weather</label>
          {Object.values(Weather).map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="weather"
                checked={newDiary.weather === value}
                onChange={() => setNewDiary({ ...newDiary, weather: value })}
              />
              {value}
            </label>
          ))}
        </div>
        <div>
          <label>comment</label>
          <input
            value={newDiary.comment}
            placeholder="comment"
            onChange={(event) => setNewDiary({ ...newDiary, comment: event.target.value})}
          />
        </div>
        <button type="submit">add</button>
      </form>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
          <p>{diary.comment}</p>
        </div>
      ))}
    </div>
  )
};

export default App;