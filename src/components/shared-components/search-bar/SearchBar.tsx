import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SearchBarProps } from '@interfaces/search-bar/Search-Bar.interface';
import './SearchBar.scss';

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, placeholder = 'Buscar productos' }) => {
    return (
        <div className="search-bar">
            <div className="search-bar-container">
                <MagnifyingGlassIcon className="search-bar-icon" />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    className="search-bar-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
