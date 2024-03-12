### MERN blog
---

#### Collections 

Users

  - _id
  - name
  - email
  - password

Categories

  - _id
  - name
  - createdAt
  - updatedAt

Blogs

  - _id
  - title
  - slug
  - image
  - body
  - views
  - likes
  - comments
  - status
  - author -> ref(Users)
  - category -> ref(Categories)
  - publishAt
  - createdAt
  - updatedAt