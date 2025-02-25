import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
interface SortableColumnHeaderProps {
    columnKey: string;
    currentSortColumn: string;
    currentSortDirection: string;
    handleSort: (columnKey: string) => void;
    children: React.ReactNode;
}
const SortableColumnHeader: React.FC<SortableColumnHeaderProps> = ({ columnKey, currentSortColumn, currentSortDirection, handleSort, children }) => {
    const isColumnSorted = currentSortColumn === columnKey;
    const isAsc = isColumnSorted && currentSortDirection === 'asc';
    const isDesc = isColumnSorted && currentSortDirection === 'desc';

    return (
        <th scope="col" onClick={() => handleSort(columnKey)}>
            <div className='d-flex justify-content-between align-items-center gap-3 '>
                <div>{children}</div>
                <div className='d-flex flex-column  me-2'>
                    <FontAwesomeIcon
                        icon={faSortUp}
                        style={{ color: isAsc ? 'currentColor' : '#ccc', margin: '-8px' }}
                    />
                    <FontAwesomeIcon
                        icon={faSortDown}
                        style={{ color: isDesc ? 'currentColor' : '#ccc', margin: '-8px' }}
                    />
                </div>
            </div>
        </th>
    );
};

export default SortableColumnHeader;

