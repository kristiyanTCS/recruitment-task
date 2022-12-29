import React from 'react'

function SortingControls({ order, sortBy, setOrder, setSortBy }) {
  return (
    <div className="sorting-controls">
      <div className="sorting-controls__sort-by__container">
        <button
          className={`sorting-controls__sort-by__value ${
            sortBy === 'id' ? 'sorting-controls__sort-by__value--current' : ''
          }`}
          onClick={() => setSortBy('id')}
        >
          ID
        </button>
        <button
          className={`sorting-controls__sort-by__value ${
            sortBy === 'name' ? 'sorting-controls__sort-by__value--current' : ''
          }`}
          onClick={() => setSortBy('name')}
        >
          Name
        </button>
        <button
          className={`sorting-controls__sort-by__value ${
            sortBy === 'type' ? 'sorting-controls__sort-by__value--current' : ''
          }`}
          onClick={() => setSortBy('type')}
        >
          Type
        </button>
        <button
          className={`sorting-controls__sort-by__value ${
            sortBy === 'createdAt'
              ? 'sorting-controls__sort-by__value--current'
              : ''
          }`}
          onClick={() => setSortBy('createdAt')}
        >
          Creation Date
        </button>
      </div>
      <div className="sorting-controls__order__container">
        <button
          className={`sorting-controls__order__value ${
            order === 'asc' ? 'sorting-controls__order__value--current' : ''
          }`}
          onClick={() => setOrder('asc')}
        >
          Ascending
        </button>
        <button
          className={`sorting-controls__order__value ${
            order === 'desc' ? 'sorting-controls__order__value--current' : ''
          }`}
          onClick={() => setOrder('desc')}
        >
          Descending
        </button>
      </div>
    </div>
  )
}

export default SortingControls
