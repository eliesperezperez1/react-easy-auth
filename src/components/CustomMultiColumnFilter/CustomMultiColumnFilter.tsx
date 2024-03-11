import React, { useState } from 'react';

interface Column {
    field: string;
    headerName: string;
    width: number;
}

interface FilterItem {
    field: string;
    operator: string;
    value: string;
}

interface CustomMultiColumnFilterProps {
    columns: Column[];
    onApplyFilters: (filterItems: FilterItem[]) => void;
}

const CustomMultiColumnFilter: React.FC<CustomMultiColumnFilterProps> = ({ columns, onApplyFilters }) => {
    const [filterItems, setFilterItems] = useState<FilterItem[]>([]);

    const handleFilterChange = (index: number, field: string, operator: string, value: string) => {
        const updatedFilterItems = [...filterItems];
        updatedFilterItems[index] = { field, operator, value };
        setFilterItems(updatedFilterItems);
    };

    const applyFilters = () => {
        // Implement your logic to apply filters to the DataGrid
        onApplyFilters(filterItems);
    };

    return (
        <div>
            {filterItems.map((filter, index) => (
                <div key={index}>
                    <select
                        value={filter.field}
                        onChange={(e) => handleFilterChange(index, e.target.value, filter.operator, filter.value)}
                    >
                        {columns.map((col) => (
                            <option key={col.field} value={col.field}>
                                {col.headerName}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filter.operator}
                        onChange={(e) => handleFilterChange(index, filter.field, e.target.value, filter.value)}
                    >
                        {/* Add operator options (e.g., "=", "contains", etc.) */}
                        <option value="=">Equals</option>
                        <option value="contains">Contains</option>
                        {/* Add other operators */}
                    </select>
                    <input
                        type="text"
                        value={filter.value}
                        onChange={(e) => handleFilterChange(index, filter.field, filter.operator, e.target.value)}
                    />
                </div>
            ))}
            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default CustomMultiColumnFilter;