import { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { TaskItem } from '@/types/Task';

interface Props {
  tasks: TaskItem[];
}

export default function SearchBar(props: Props) {
  const { tasks } = props;
  const [search, setSearch] = useState('');

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  console.log(search);

  return (
    <Autocomplete
      disablePortal
      options={tasks.map((task) => task.description)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} name="search" onChange={handleSearchInput} />}
    />
  );
}
