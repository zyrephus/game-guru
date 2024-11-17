import { Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from '@chakra-ui/react'
import { useRef } from 'react';
import { BsSearch, BsX } from 'react-icons/bs'
import useGameQueryStore from '../store';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useGameQueryStore(s => (s.setSearchText));
  const navigate = useNavigate();

  const handleClear = () => {
    if (ref.current) {
      ref.current.value = '';
      setSearchText('');
    }
  };

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      if (ref.current) {
        setSearchText(ref.current.value);
        navigate('/explore');
      } 
    }}>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input ref={ref} borderRadius={20} placeholder='Search games...' variant='filled' />
        <InputRightElement>
          <IconButton
            aria-label="Clear search"
            icon={<BsX/>}
            size="lg"
            variant="ghost"
            onClick={handleClear}
            borderRadius="full"
            h="32px"
            minW="32px"
          />
        </InputRightElement>
      </InputGroup>
    </form>
  )
}

export default SearchInput