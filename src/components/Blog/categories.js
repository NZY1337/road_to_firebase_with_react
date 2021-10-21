import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export function Categories() {
  const [categories, setCategories] = useState([
    {
      categ: 'design de produs',
      slug: 'Design De Produs',
      id: 1,
    },
    {
      categ: 'design interior',
      slug: 'Design Interior',
      id: 2,
    },
    {
      categ: 'pictura',
      slug: 'Pictura',
      id: 3,
    },
  ])

  const renderCategories = () => {
    return (
      <ul className={`menu-categories`} style={{ listStyle: 'none' }}>
        {categories.map((c) => {
          return (
            <li
              className={`a-c${c.id}`}
              key={c.id}
              style={{ marginBottom: '.3rem' }}
            >
              <Link
                to={{
                  pathname: '/portofoliu',
                  categ: c.categ,
                }}
              >
                {c.slug}
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }
  return <>{renderCategories()}</>
}

export default Categories
